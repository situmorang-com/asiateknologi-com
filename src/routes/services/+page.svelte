<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { textScramble } from '$lib/animations/actions/textScramble';

	let { data } = $props();

	// ── Category filter ──────────────────────────────────────────────────────────
	let activeCategory = $state<string>('all');

	const categoryLabels: Record<string, string> = {
		all: 'All Services',
		core: 'Core Services',
		managed: 'Managed & Security',
		consulting: 'Advisory & Consulting',
		staffing: 'Staffing'
	};

	const filterTabs = ['all', 'core', 'managed', 'consulting', 'staffing'];

	const filteredServices = $derived(
		activeCategory === 'all'
			? data.services
			: data.services.filter((s) => s.category === activeCategory)
	);

	// ── Icon map ─────────────────────────────────────────────────────────────────
	const iconMap: Record<string, string> = {
		network: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><circle cx="5" cy="19" r="3"/><line x1="12" y1="8" x2="19" y2="16"/><line x1="12" y1="8" x2="5" y2="16"/></svg>`,
		cpu: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
		users: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
		monitor: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
		shield: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
		lock: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
		cloud: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
		chart: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
		database: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
		refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
		book: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
		briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
	};

	// ── Helpers ──────────────────────────────────────────────────────────────────
	function parseJsonField(raw: string | null | undefined): string[] {
		if (!raw) return [];
		try {
			const parsed = JSON.parse(raw);
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	}

	function getIcon(key: string | null | undefined): string {
		return iconMap[key ?? ''] ?? iconMap['network'];
	}

	function padNumber(n: number): string {
		return String(n).padStart(2, '0');
	}

	const accentColors = [
		'from-accent-cyan to-accent-blue',
		'from-accent-blue to-accent-purple',
		'from-accent-purple to-accent-cyan',
		'from-accent-cyan to-accent-purple'
	];
</script>

<svelte:head>
	<title>Services - Asiateknologi</title>
	<meta
		name="description"
		content="IT consulting, IoT solutions, managed services, cybersecurity, cloud & DevOps, data & AI, and more — end-to-end technology services from Asiateknologi."
	/>
</svelte:head>

<!-- ── Hero ──────────────────────────────────────────────────────────────────── -->
<section class="relative overflow-hidden pb-16 pt-32">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<!-- Decorative grid -->
	<div
		class="absolute inset-0 opacity-[0.03]"
		style="background-image: linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px); background-size: 60px 60px;"
	></div>
	<div class="relative mx-auto max-w-7xl px-6 text-center">
		<span
			class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
			use:scrollReveal
		>
			Our Services
		</span>
		<h1 class="mt-4 text-4xl font-bold text-dark-100 md:text-6xl" use:textScramble>
			End-to-End Technology Solutions
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg text-dark-400" use:scrollReveal={{ delay: 0.2 }}>
			From strategic planning to hands-on deployment, we deliver comprehensive technology services
			that transform how industries operate.
		</p>

		<!-- Stats row -->
		<div
			class="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-6 rounded-2xl border border-dark-700/50 bg-dark-900/60 p-6 backdrop-blur-sm"
			use:scrollReveal={{ delay: 0.3 }}
		>
			{#each [['12+', 'Service Areas'], ['200+', 'Projects Delivered'], ['98%', 'Client Retention']] as [val, label]}
				<div class="text-center">
					<p class="font-mono text-3xl font-bold text-accent-cyan">{val}</p>
					<p class="mt-1 text-xs text-dark-400 uppercase tracking-wider">{label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ── Category filter tabs ───────────────────────────────────────────────────── -->
<section class="sticky top-[64px] z-30 border-b border-dark-700/50 bg-dark-950/90 backdrop-blur-xl">
	<div class="mx-auto max-w-7xl px-6">
		<div class="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
			{#each filterTabs as tab}
				<button
					class="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all {activeCategory === tab
						? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30'
						: 'text-dark-400 hover:text-dark-200 hover:bg-dark-800'}"
					onclick={() => (activeCategory = tab)}
				>
					{categoryLabels[tab]}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- ── Services grid ──────────────────────────────────────────────────────────── -->
<section class="bg-dark-950 py-20">
	<div class="mx-auto max-w-7xl px-6">
		{#if filteredServices.length === 0}
			<p class="py-24 text-center text-dark-400">No services in this category yet.</p>
		{:else}
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each filteredServices as service, i}
					{@const features = parseJsonField(service.features)}
					{@const techStack = parseJsonField(service.techStack)}
					{@const engagements = parseJsonField(service.engagementModels)}
					{@const accent = accentColors[i % accentColors.length]}
					{@const isFeatured = service.category === 'core' || i < 2}

					<article
						id={service.slug}
						class="group relative flex flex-col overflow-hidden rounded-2xl border bg-dark-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40
							{isFeatured
								? 'border-accent-cyan/20 hover:border-accent-cyan/40'
								: 'border-dark-700/50 hover:border-dark-600/70'}"
						use:scrollReveal={{ delay: (i % 3) * 0.08 }}
					>
						<!-- Top gradient bar -->
						<div class="h-0.5 w-full bg-gradient-to-r {accent}"></div>

						<!-- Card header -->
						<div class="flex items-start gap-4 p-6 pb-4">
							<!-- Number badge -->
							<span class="font-mono text-xs font-bold text-dark-600 tabular-nums shrink-0 mt-1">
								{padNumber(i + 1)}
							</span>
							<!-- Icon -->
							<div
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br {accent} p-0.5"
							>
								<div
									class="flex h-full w-full items-center justify-center rounded-[10px] bg-dark-900 text-accent-cyan"
								>
									{@html getIcon(service.icon).replace(/width="\d+"/, 'width="24"').replace(/height="\d+"/, 'height="24"')}
								</div>
							</div>
							<div class="min-w-0">
								<h2 class="text-base font-bold text-dark-100 leading-snug group-hover:text-accent-cyan transition-colors">
									{service.title}
								</h2>
								{#if service.category}
									<span class="mt-1 inline-block font-mono text-[10px] uppercase tracking-widest text-dark-500">
										{categoryLabels[service.category] ?? service.category}
									</span>
								{/if}
							</div>
						</div>

						<!-- Description -->
						<p class="px-6 pb-4 text-sm leading-relaxed text-dark-400">
							{service.description}
						</p>

						<!-- Features list -->
						{#if features.length > 0}
							<ul class="mx-6 mb-4 space-y-1.5 border-t border-dark-800 pt-4">
								{#each features.slice(0, 4) as feature}
									<li class="flex items-start gap-2 text-sm text-dark-300">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											class="mt-0.5 shrink-0 text-accent-cyan"
										>
											<path d="M20 6 9 17l-5-5" />
										</svg>
										{feature}
									</li>
								{/each}
								{#if features.length > 4}
									<li class="text-xs text-dark-500 pl-5">+{features.length - 4} more</li>
								{/if}
							</ul>
						{/if}

						<!-- Tech stack pills -->
						{#if techStack.length > 0}
							<div class="mx-6 mb-4">
								<p class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-dark-500">
									Technologies
								</p>
								<div class="flex flex-wrap gap-1.5">
									{#each techStack.slice(0, 5) as tech}
										<span
											class="rounded-md border border-dark-700 bg-dark-800 px-2 py-0.5 font-mono text-[10px] text-dark-400"
										>
											{tech}
										</span>
									{/each}
									{#if techStack.length > 5}
										<span class="rounded-md border border-dark-700 bg-dark-800 px-2 py-0.5 font-mono text-[10px] text-dark-500">
											+{techStack.length - 5}
										</span>
									{/if}
								</div>
							</div>
						{/if}

						<!-- Engagement models -->
						{#if engagements.length > 0}
							<div class="mx-6 mb-5 rounded-lg border border-dark-700/60 bg-dark-800/50 px-3 py-2">
								<p class="mb-1 text-[10px] font-semibold uppercase tracking-widest text-dark-500">
									Engagement Models
								</p>
								<p class="text-[11px] text-dark-400">
									{engagements.join(' · ')}
								</p>
							</div>
						{/if}

						<!-- Spacer to push CTA to bottom -->
						<div class="flex-1"></div>

						<!-- CTA row -->
						<div class="flex items-center gap-3 border-t border-dark-800 px-6 py-4">
							<a
								href="/contact?service={service.slug}"
								class="flex-1 rounded-lg bg-gradient-to-r {accent} px-4 py-2 text-center text-xs font-semibold text-dark-950 transition-all hover:shadow-lg hover:brightness-110"
							>
								Get a Quote
							</a>
							<a
								href="/services/{service.slug}"
								class="rounded-lg border border-dark-700 px-4 py-2 text-xs font-medium text-dark-400 transition-all hover:border-dark-500 hover:text-dark-200"
							>
								Learn More
							</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- ── Engagement models section ─────────────────────────────────────────────── -->
<section class="bg-dark-900 py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mb-12 text-center" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
				How We Work
			</span>
			<h2 class="mt-4 text-3xl font-bold text-dark-100 md:text-4xl">
				Ready to Transform Your Operations?
			</h2>
			<p class="mx-auto mt-4 max-w-2xl text-lg text-dark-400">
				Choose the engagement model that fits your project scope, budget, and timeline.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-3" use:scrollReveal={{ delay: 0.1 }}>
			<!-- Fixed-Price -->
			<div class="group rounded-2xl border border-dark-700/50 bg-dark-800 p-8 transition-all hover:border-accent-cyan/30 hover:-translate-y-1">
				<div class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<rect x="2" y="5" width="20" height="14" rx="2"/>
						<line x1="2" y1="10" x2="22" y2="10"/>
					</svg>
				</div>
				<h3 class="text-lg font-bold text-dark-100">Fixed-Price Project</h3>
				<p class="mt-3 text-sm leading-relaxed text-dark-400">
					Defined scope, timeline, and cost. Ideal for well-scoped implementations, migrations, and one-time build-outs where predictability matters.
				</p>
				<ul class="mt-5 space-y-2">
					{#each ['Clear deliverables & milestones', 'No cost overrun risk', 'Structured project management', 'Ideal for discrete projects'] as point}
						<li class="flex items-center gap-2 text-sm text-dark-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent-cyan shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
							{point}
						</li>
					{/each}
				</ul>
				<div class="mt-6">
					<Button href="/contact?engagement=fixed-price" variant="secondary" size="sm">Get Started</Button>
				</div>
			</div>

			<!-- Managed Retainer -->
			<div class="group rounded-2xl border border-accent-cyan/20 bg-dark-800 p-8 transition-all hover:border-accent-cyan/40 hover:-translate-y-1 relative">
				<div class="absolute -top-3 left-1/2 -translate-x-1/2">
					<span class="rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-dark-950">
						Most Popular
					</span>
				</div>
				<div class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
						<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
					</svg>
				</div>
				<h3 class="text-lg font-bold text-dark-100">Managed Retainer</h3>
				<p class="mt-3 text-sm leading-relaxed text-dark-400">
					Ongoing managed services with a monthly commitment. Perfect for IT operations, security monitoring, and continuous support where you need reliable coverage.
				</p>
				<ul class="mt-5 space-y-2">
					{#each ['SLA-backed support', 'Proactive monitoring & patching', 'Dedicated account manager', 'Scalable capacity'] as point}
						<li class="flex items-center gap-2 text-sm text-dark-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent-cyan shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
							{point}
						</li>
					{/each}
				</ul>
				<div class="mt-6">
					<Button href="/contact?engagement=retainer" variant="primary" size="sm">Get Started</Button>
				</div>
			</div>

			<!-- Staff Augmentation -->
			<div class="group rounded-2xl border border-dark-700/50 bg-dark-800 p-8 transition-all hover:border-accent-cyan/30 hover:-translate-y-1">
				<div class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
						<circle cx="9" cy="7" r="4"/>
						<path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
						<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
					</svg>
				</div>
				<h3 class="text-lg font-bold text-dark-100">Staff Augmentation</h3>
				<p class="mt-3 text-sm leading-relaxed text-dark-400">
					Embed vetted Asiateknologi engineers and specialists directly into your team on a time & materials basis. Scale up or down as project demands change.
				</p>
				<ul class="mt-5 space-y-2">
					{#each ['Pre-vetted senior talent', 'Rapid on-boarding (1–2 weeks)', 'Flexible duration & scale', 'Full IP ownership for you'] as point}
						<li class="flex items-center gap-2 text-sm text-dark-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent-cyan shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
							{point}
						</li>
					{/each}
				</ul>
				<div class="mt-6">
					<Button href="/contact?engagement=augmentation" variant="secondary" size="sm">Get Started</Button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ── CTA ────────────────────────────────────────────────────────────────────── -->
<section class="bg-dark-950 py-24">
	<div class="mx-auto max-w-3xl px-6 text-center" use:scrollReveal>
		<h2 class="text-3xl font-bold text-dark-100 md:text-4xl">
			Not sure which service fits?
		</h2>
		<p class="mt-4 text-lg text-dark-400">
			Our consultants will assess your needs and recommend the right combination of services and
			engagement model for your goals.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
			<Button href="/contact" variant="primary" size="lg">Schedule a Free Consultation</Button>
			<Button href="/case-studies" variant="secondary" size="lg">View Case Studies</Button>
		</div>
	</div>
</section>

<style>
	.scrollbar-none {
		scrollbar-width: none;
	}
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
</style>
