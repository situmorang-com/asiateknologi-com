<script lang="ts">
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { tiltCard } from '$lib/animations/actions/tiltCard';

	let { data } = $props();

	const filterOptions = ['All', 'Whitepaper', 'Guide', 'Datasheet'] as const;
	type FilterOption = (typeof filterOptions)[number];

	let activeFilter = $state<FilterOption>('All');

	// Per-resource gated form state: slug -> state object
	type GatedState = {
		open: boolean;
		name: string;
		email: string;
		company: string;
		submitting: boolean;
		submitted: boolean;
	};

	let gatedForms = $state<Record<string, GatedState>>({});

	function getGatedForm(slug: string): GatedState {
		if (!gatedForms[slug]) {
			gatedForms[slug] = {
				open: false,
				name: '',
				email: '',
				company: '',
				submitting: false,
				submitted: false
			};
		}
		return gatedForms[slug];
	}

	function openGatedForm(slug: string) {
		const form = getGatedForm(slug);
		gatedForms[slug] = { ...form, open: true };
	}

	function closeGatedForm(slug: string) {
		const form = getGatedForm(slug);
		gatedForms[slug] = { ...form, open: false };
	}

	async function submitGatedForm(slug: string, e: Event) {
		e.preventDefault();
		const form = gatedForms[slug];
		if (!form) return;
		gatedForms[slug] = { ...form, submitting: true };
		await new Promise((r) => setTimeout(r, 1000));
		gatedForms[slug] = { ...gatedForms[slug], submitting: false, submitted: true };
	}

	const filteredResources = $derived(
		activeFilter === 'All'
			? data.resources
			: data.resources.filter(
					(r: { type: string }) => r.type.toLowerCase() === activeFilter.toLowerCase()
				)
	);

	const typeConfig: Record<string, { label: string; color: string; bg: string }> = {
		whitepaper: {
			label: 'Whitepaper',
			color: 'text-accent-purple',
			bg: 'bg-accent-purple/15 border border-accent-purple/25'
		},
		guide: {
			label: 'Guide',
			color: 'text-accent-cyan',
			bg: 'bg-accent-cyan/15 border border-accent-cyan/25'
		},
		datasheet: {
			label: 'Datasheet',
			color: 'text-accent-blue',
			bg: 'bg-accent-blue/15 border border-accent-blue/25'
		}
	};

	function getTypeConfig(type: string) {
		return (
			typeConfig[type.toLowerCase()] ?? {
				label: type,
				color: 'text-dark-300',
				bg: 'bg-dark-700/50 border border-dark-600/50'
			}
		);
	}

	const defaultGradients = [
		'linear-gradient(135deg, #0f1729 0%, #1a1a35 100%)',
		'linear-gradient(135deg, #0a1f2e 0%, #162035 100%)',
		'linear-gradient(135deg, #1a0f29 0%, #2a1535 100%)'
	];

	function getCoverStyle(resource: { coverGradient: string | null }, index: number): string {
		return resource.coverGradient || defaultGradients[index % defaultGradients.length];
	}

	const stats = [
		{ label: 'Published Resources', value: data.resources.length.toString() },
		{ label: 'Industries Covered', value: [...new Set(data.resources.map((r: { industry: string | null }) => r.industry).filter(Boolean))].length.toString() },
		{ label: 'Free Downloads', value: data.resources.filter((r: { gated: number | null }) => !r.gated).length.toString() }
	];
</script>

<svelte:head>
	<title>Knowledge & Resources - Asiateknologi</title>
	<meta
		name="description"
		content="Free whitepapers, guides, and datasheets on IoT, cloud infrastructure, cybersecurity, and enterprise technology from Asiateknologi."
	/>
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden pb-20 pt-32">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<div
		class="absolute inset-0 opacity-[0.03]"
		style="background-image: radial-gradient(circle at 1px 1px, rgba(0,229,255,0.8) 1px, transparent 0); background-size: 36px 36px;"
	></div>
	<div class="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-accent-blue/5 blur-3xl"></div>
	<div
		class="absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-accent-purple/5 blur-3xl"
	></div>

	<div class="relative mx-auto max-w-7xl px-6 text-center">
		<span
			class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
			use:scrollReveal
		>
			Resources
		</span>
		<h1 class="mt-4 text-4xl font-bold text-dark-100 md:text-6xl" use:textScramble>
			Knowledge &amp; Resources
		</h1>
		<p
			class="mx-auto mt-6 max-w-2xl text-lg text-dark-400"
			use:scrollReveal={{ delay: 0.2 }}
		>
			Free guides, whitepapers, and research from our team of engineers and consultants. Practical
			insights to help you navigate complex technology decisions.
		</p>

		<!-- Stats bar -->
		<div
			class="mx-auto mt-12 flex max-w-lg flex-wrap items-center justify-center gap-8"
			use:scrollReveal={{ delay: 0.3 }}
		>
			{#each stats as stat}
				<div class="text-center">
					<div class="text-3xl font-bold text-dark-100">{stat.value}</div>
					<div class="mt-1 font-mono text-xs uppercase tracking-wider text-dark-500">
						{stat.label}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Resources Grid -->
<section class="bg-dark-900 py-24">
	<div class="mx-auto max-w-7xl px-6">
		<SectionHeading
			label="Browse"
			title="All Resources"
			subtitle="Filter by resource type to find exactly what you're looking for."
		/>

		<!-- Filter Tabs -->
		<div class="mb-12 flex flex-wrap justify-center gap-2" use:scrollReveal>
			{#each filterOptions as filter}
				<button
					onclick={() => (activeFilter = filter)}
					class="rounded-full px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 {activeFilter === filter
						? 'bg-accent-cyan text-dark-950 shadow-lg shadow-accent-cyan/25'
						: 'border border-dark-600/50 text-dark-400 hover:border-accent-cyan/40 hover:text-accent-cyan'}"
				>
					{filter}
					{#if filter !== 'All'}
						<span class="ml-1.5 opacity-60">
							({data.resources.filter(
								(r: { type: string }) => r.type.toLowerCase() === filter.toLowerCase()
							).length})
						</span>
					{/if}
				</button>
			{/each}
		</div>

		<!-- Cards Grid -->
		{#if filteredResources.length === 0}
			<div class="py-20 text-center" use:scrollReveal>
				<p class="text-lg text-dark-400">No resources in this category yet.</p>
			</div>
		{:else}
			<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{#each filteredResources as resource, i}
					{@const tc = getTypeConfig(resource.type)}
					{@const gated = resource.gated === 1}
					{@const formState = gatedForms[resource.slug]}

					<div
						class="group flex flex-col overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-950/80 transition-all duration-300 hover:border-dark-600 hover:shadow-xl hover:shadow-black/30"
						use:tiltCard={{ maxTilt: 4 }}
						use:scrollReveal={{ delay: i * 0.07 }}
					>
						<!-- Cover gradient header -->
						<div
							class="relative flex h-36 flex-col justify-between overflow-hidden p-5"
							style="background: {getCoverStyle(resource, i)};"
						>
							<!-- Subtle pattern overlay -->
							<div
								class="absolute inset-0 opacity-[0.06]"
								style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 20px 20px;"
							></div>

							<div class="relative flex items-start justify-between">
								<!-- Type badge -->
								<span
									class="rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider {tc.bg} {tc.color}"
								>
									{tc.label}
								</span>

								<!-- Pages count -->
								{#if resource.pages}
									<span
										class="font-mono text-[10px] text-white/50"
									>
										{resource.pages} pages
									</span>
								{/if}
							</div>

							<!-- Document icon -->
							<div class="relative">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
									stroke="rgba(255,255,255,0.2)"
									stroke-width="1.2"
								>
									<path
										d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
									/>
									<polyline points="14 2 14 8 20 8" />
									<line x1="16" y1="13" x2="8" y2="13" />
									<line x1="16" y1="17" x2="8" y2="17" />
									<line x1="10" y1="9" x2="8" y2="9" />
								</svg>
							</div>
						</div>

						<!-- Card body -->
						<div class="flex flex-1 flex-col p-6">
							<!-- Industry tag -->
							{#if resource.industry}
								<span
									class="mb-3 font-mono text-[10px] uppercase tracking-wider text-dark-500"
								>
									{resource.industry}
								</span>
							{/if}

							<h3
								class="text-lg font-bold leading-snug text-dark-100 transition-colors group-hover:text-dark-50"
							>
								{resource.title}
							</h3>

							<p class="mt-3 flex-1 text-sm leading-relaxed text-dark-400 line-clamp-2">
								{resource.description}
							</p>

							<!-- Download / Gated Form -->
							<div class="mt-5">
								{#if !gated}
									<!-- Free download button -->
									<button
										class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue py-2.5 font-semibold text-sm text-dark-950 transition-all hover:brightness-110 hover:shadow-lg hover:shadow-accent-cyan/20"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="15"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
											/>
											<polyline points="7 10 12 15 17 10" />
											<line x1="12" y1="15" x2="12" y2="3" />
										</svg>
										Download Free
									</button>
								{:else if formState?.submitted}
									<!-- Success state -->
									<div
										class="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3"
									>
										<span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="11"
												height="11"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="3"
											>
												<polyline points="20 6 9 17 4 12" />
											</svg>
										</span>
										<p class="text-sm font-medium text-green-400">
											Check your email for the download link
										</p>
									</div>
								{:else if formState?.open}
									<!-- Inline gated form -->
									<form
										onsubmit={(e) => submitGatedForm(resource.slug, e)}
										class="space-y-3"
										novalidate
									>
										<input
											type="text"
											placeholder="Your name"
											required
											bind:value={gatedForms[resource.slug].name}
											class="w-full rounded-lg border border-dark-600/50 bg-dark-800/70 px-3.5 py-2.5 text-sm text-dark-100 placeholder-dark-600 outline-none transition-all focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/10"
										/>
										<input
											type="email"
											placeholder="Work email"
											required
											bind:value={gatedForms[resource.slug].email}
											class="w-full rounded-lg border border-dark-600/50 bg-dark-800/70 px-3.5 py-2.5 text-sm text-dark-100 placeholder-dark-600 outline-none transition-all focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/10"
										/>
										<input
											type="text"
											placeholder="Company (optional)"
											bind:value={gatedForms[resource.slug].company}
											class="w-full rounded-lg border border-dark-600/50 bg-dark-800/70 px-3.5 py-2.5 text-sm text-dark-100 placeholder-dark-600 outline-none transition-all focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/10"
										/>
										<div class="flex gap-2">
											<button
												type="submit"
												disabled={formState?.submitting}
												class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-blue py-2.5 text-sm font-semibold text-dark-950 transition-all hover:brightness-110 disabled:opacity-60"
											>
												{#if formState?.submitting}
													<svg
														class="animate-spin"
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
													>
														<path d="M21 12a9 9 0 1 1-6.219-8.56" />
													</svg>
													Sending...
												{:else}
													Get Download Link
												{/if}
											</button>
											<button
												type="button"
												onclick={() => closeGatedForm(resource.slug)}
												class="rounded-lg border border-dark-600/50 px-3 text-dark-400 transition-colors hover:text-dark-200"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="14"
													height="14"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
												>
													<path d="M18 6 6 18M6 6l12 12" />
												</svg>
											</button>
										</div>
									</form>
								{:else}
									<!-- Gated CTA button -->
									<button
										onclick={() => openGatedForm(resource.slug)}
										class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-accent-cyan/40 py-2.5 font-semibold text-sm text-accent-cyan transition-all hover:bg-accent-cyan/10 hover:border-accent-cyan/60"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="15"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
											/>
											<polyline points="7 10 12 15 17 10" />
											<line x1="12" y1="15" x2="12" y2="3" />
										</svg>
										Download Free — Email Required
									</button>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- Custom Research CTA -->
<section class="bg-dark-950 py-24">
	<div class="mx-auto max-w-5xl px-6">
		<div
			class="relative overflow-hidden rounded-3xl p-12"
			style="background: linear-gradient(135deg, #0a1220 0%, #0f0f1f 50%, #0a1220 100%);"
			use:scrollReveal
		>
			<div
				class="pointer-events-none absolute inset-0 rounded-3xl border border-accent-blue/20"
			></div>
			<div
				class="absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent-blue/8 blur-3xl"
			></div>
			<div
				class="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent-purple/8 blur-3xl"
			></div>

			<div class="relative grid items-center gap-10 md:grid-cols-2">
				<div>
					<span
						class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue"
					>
						Custom Research
					</span>
					<h2 class="mt-3 text-3xl font-bold text-dark-100 md:text-4xl">
						Need a custom research report?
					</h2>
					<p class="mt-4 text-dark-400 leading-relaxed">
						Our consulting team produces bespoke technology assessments, market analyses, and
						strategic roadmaps tailored to your industry and specific business challenges.
					</p>
					<ul class="mt-6 space-y-2.5">
						{#each ['Technology landscape assessments', 'Vendor selection frameworks', 'Industry-specific security audits', 'ROI and cost-benefit analyses'] as item}
							<li class="flex items-center gap-2.5 text-sm text-dark-300">
								<span
									class="flex h-4 w-4 items-center justify-center rounded-full bg-accent-blue/15 text-accent-blue"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="9"
										height="9"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="3"
									>
										<polyline points="20 6 9 17 4 12" />
									</svg>
								</span>
								{item}
							</li>
						{/each}
					</ul>
				</div>

				<div class="flex flex-col items-start gap-4 md:items-end">
					<div
						class="w-full rounded-2xl border border-dark-700/50 bg-dark-800/50 p-6 md:max-w-xs"
					>
						<p class="text-sm font-medium text-dark-200">Typical engagement</p>
						<p class="mt-1 text-3xl font-bold text-dark-100">2–4 weeks</p>
						<p class="mt-2 text-sm text-dark-400">
							From brief to final deliverable, including review cycles.
						</p>
					</div>
					<Button href="/contact" variant="primary" size="lg">Request a Report</Button>
				</div>
			</div>
		</div>
	</div>
</section>
