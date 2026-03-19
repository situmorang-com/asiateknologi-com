<script lang="ts">
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { tiltCard } from '$lib/animations/actions/tiltCard';

	let { data } = $props();

	const departments = [
		'All',
		'IoT Engineering',
		'Cloud Engineering',
		'Cybersecurity',
		'Consulting',
		'Sales',
		'Data & AI',
		'Recruitment'
	];

	let activeFilter = $state('All');
	let expandedSlug = $state<string | null>(null);

	const filteredCareers = $derived(
		activeFilter === 'All'
			? data.careers
			: data.careers.filter((c: { department: string }) => c.department === activeFilter)
	);

	function toggleExpand(slug: string) {
		expandedSlug = expandedSlug === slug ? null : slug;
	}

	function parseJson(val: string | null): string[] {
		if (!val) return [];
		try {
			return JSON.parse(val);
		} catch {
			return [];
		}
	}

	const cultureCards = [
		{
			emoji: '🚀',
			title: 'Innovation',
			description:
				'We embrace emerging technologies and encourage our team to experiment, fail fast, and build solutions that push boundaries.'
		},
		{
			emoji: '📈',
			title: 'Growth',
			description:
				'Every team member has a dedicated learning budget for certifications, conferences, and courses to grow their expertise.'
		},
		{
			emoji: '🤝',
			title: 'Collaboration',
			description:
				'Cross-functional teams work together across IoT, cloud, AI, and security — diversity of thought drives better outcomes.'
		},
		{
			emoji: '🌏',
			title: 'Impact',
			description:
				'Our work powers hospitals, mines, banks, and smart cities. Your code runs in the real world, solving real challenges.'
		}
	];

	const companyBenefits = [
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
			title: 'Competitive Pay',
			description: 'Market-leading salaries benchmarked to Southeast Asian tech standards.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
			title: 'Health Insurance',
			description: 'Comprehensive medical, dental, and vision coverage for you and your family.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
			title: 'Certification Budget',
			description: 'Annual budget for professional certifications from AWS, Cisco, Microsoft, and more.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>`,
			title: 'Remote Flexibility',
			description: 'Hybrid work model with flexible hours built around outcomes, not seat time.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
			title: 'Career Growth',
			description: 'Clear progression paths, mentorship programs, and internal mobility opportunities.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>`,
			title: 'Meaningful Projects',
			description: 'Work on mission-critical infrastructure that impacts millions of lives across SEA.'
		}
	];

	const typeColors: Record<string, string> = {
		'Full-time': 'bg-green-500/15 text-green-400 border border-green-500/20',
		'Part-time': 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
		Contract: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',
		Internship: 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
	};

	function getTypeClass(type: string): string {
		return typeColors[type] ?? 'bg-dark-700/50 text-dark-300 border border-dark-600/50';
	}
</script>

<svelte:head>
	<title>Careers - Asiateknologi</title>
	<meta
		name="description"
		content="Join Asiateknologi and help build the future of enterprise technology in Southeast Asia. Explore open roles in IoT, cloud, cybersecurity, and more."
	/>
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden pb-20 pt-32">
	<!-- Animated particle-like background -->
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<div
		class="absolute inset-0 opacity-[0.04]"
		style="background-image: radial-gradient(circle at 1px 1px, rgba(0,229,255,0.9) 1px, transparent 0); background-size: 28px 28px;"
	></div>

	<!-- Animated dots overlay -->
	<div class="absolute inset-0 overflow-hidden">
		{#each Array(8) as _, i}
			<div
				class="absolute rounded-full bg-accent-cyan/20 blur-sm"
				style="
					width: {4 + (i % 3) * 3}px;
					height: {4 + (i % 3) * 3}px;
					left: {10 + i * 11}%;
					top: {15 + (i % 4) * 18}%;
					animation: pulse {2 + i * 0.3}s ease-in-out infinite alternate;
				"
			></div>
		{/each}
	</div>

	<div class="relative mx-auto max-w-7xl px-6 text-center">
		<span
			class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
			use:scrollReveal
		>
			We're Hiring
		</span>
		<h1 class="mt-4 text-5xl font-bold text-dark-100 md:text-7xl" use:textScramble>
			Join Our Team
		</h1>
		<p
			class="mx-auto mt-6 max-w-2xl text-xl text-dark-400"
			use:scrollReveal={{ delay: 0.2 }}
		>
			Help us build the future of enterprise technology in Southeast Asia. We're looking for
			engineers, consultants, and innovators who want to solve real-world challenges at scale.
		</p>
		<div
			class="mt-10 flex flex-wrap items-center justify-center gap-4"
			use:scrollReveal={{ delay: 0.3 }}
		>
			<Button href="#open-positions" variant="primary" size="lg">View Open Positions</Button>
			<Button href="/about" variant="secondary" size="lg">Our Story</Button>
		</div>
	</div>
</section>

<style>
	@keyframes pulse {
		from { opacity: 0.2; transform: scale(1); }
		to { opacity: 0.6; transform: scale(1.4); }
	}
</style>

<!-- Culture Section -->
<section class="bg-dark-900 py-24">
	<div class="mx-auto max-w-7xl px-6">
		<SectionHeading
			label="Life at Asiateknologi"
			title="Our Culture"
			subtitle="More than a job — a mission to transform how technology powers Southeast Asia."
		/>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each cultureCards as card, i}
				<div
					class="group rounded-2xl border border-dark-700/50 bg-dark-950/70 p-7 transition-all duration-300 hover:border-accent-cyan/30 hover:bg-dark-800/50"
					use:tiltCard={{ maxTilt: 6 }}
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<div class="mb-4 text-4xl">{card.emoji}</div>
					<h3
						class="mb-2 text-lg font-bold text-dark-100 transition-colors group-hover:text-accent-cyan"
					>
						{card.title}
					</h3>
					<p class="text-sm leading-relaxed text-dark-400">{card.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Open Positions -->
<section id="open-positions" class="bg-dark-950 py-24">
	<div class="mx-auto max-w-7xl px-6">
		<SectionHeading
			label="Open Positions"
			title="Current Openings"
			subtitle="Find the role where your skills make the biggest impact."
		/>

		<!-- Department Filter Tabs -->
		<div
			class="mb-10 flex flex-wrap justify-center gap-2"
			use:scrollReveal
		>
			{#each departments as dept}
				<button
					onclick={() => { activeFilter = dept; expandedSlug = null; }}
					class="rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 {activeFilter === dept
						? 'bg-accent-cyan text-dark-950 shadow-lg shadow-accent-cyan/25'
						: 'border border-dark-600/50 text-dark-400 hover:border-accent-cyan/40 hover:text-accent-cyan'}"
				>
					{dept}
				</button>
			{/each}
		</div>

		<!-- Job Cards -->
		{#if filteredCareers.length === 0}
			<div class="py-20 text-center" use:scrollReveal>
				<p class="text-lg text-dark-400">No open positions in this category right now.</p>
				<p class="mt-2 text-sm text-dark-500">Check back soon or send us your resume at careers@asiateknologi.com</p>
			</div>
		{:else}
			<div class="space-y-4">
				{#each filteredCareers as job, i}
					{@const requirements = parseJson(job.requirements)}
					{@const niceToHave = parseJson(job.niceToHave)}
					{@const benefits = parseJson(job.benefits)}
					{@const isExpanded = expandedSlug === job.slug}

					<div
						class="group overflow-hidden rounded-2xl border transition-all duration-300 {isExpanded
							? 'border-accent-cyan/40 bg-dark-800/80 shadow-lg shadow-accent-cyan/5'
							: 'border-dark-700/50 bg-dark-900/60 hover:border-dark-600'}"
						use:scrollReveal={{ delay: i * 0.06 }}
					>
						<!-- Card Header (always visible) -->
						<div class="p-6 md:p-8">
							<div class="flex flex-wrap items-start justify-between gap-4">
								<div class="min-w-0 flex-1">
									<!-- Department badge -->
									<div class="mb-3 flex flex-wrap items-center gap-2">
										<span
											class="rounded-full bg-accent-blue/15 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-accent-blue border border-accent-blue/20"
										>
											{job.department}
										</span>
									</div>

									<h3
										class="text-xl font-bold text-dark-100 transition-colors group-hover:text-dark-50 md:text-2xl"
									>
										{job.title}
									</h3>

									<!-- Tags -->
									<div class="mt-3 flex flex-wrap items-center gap-2">
										<span class="flex items-center gap-1.5 text-sm text-dark-400">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
											>
												<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
												<circle cx="12" cy="10" r="3" />
											</svg>
											{job.location}
										</span>
										<span class="text-dark-600">·</span>
										<span
											class="rounded-full px-2.5 py-0.5 text-xs font-medium {getTypeClass(job.type)}"
										>
											{job.type}
										</span>
										{#if job.experience}
											<span class="text-dark-600">·</span>
											<span class="text-sm text-dark-400">{job.experience}</span>
										{/if}
									</div>

									<!-- Description preview -->
									<p class="mt-4 text-sm leading-relaxed text-dark-400 line-clamp-2">
										{job.description}
									</p>
								</div>

								<!-- View Details Button -->
								<div class="shrink-0">
									<button
										onclick={() => toggleExpand(job.slug)}
										class="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 font-semibold text-sm transition-all duration-200 {isExpanded
											? 'border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan'
											: 'border-dark-600/50 text-dark-300 hover:border-accent-cyan/40 hover:text-accent-cyan'}"
									>
										{isExpanded ? 'Close' : 'View Details'}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											class="transition-transform duration-300 {isExpanded ? 'rotate-180' : ''}"
										>
											<polyline points="6 9 12 15 18 9" />
										</svg>
									</button>
								</div>
							</div>
						</div>

						<!-- Expanded Detail -->
						{#if isExpanded}
							<div class="border-t border-dark-700/50 px-6 pb-8 pt-6 md:px-8">
								<div class="grid gap-8 md:grid-cols-3">
									<!-- Requirements -->
									{#if requirements.length > 0}
										<div>
											<h4
												class="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent-cyan"
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
													<polyline points="9 11 12 14 22 4" />
													<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
												</svg>
												Requirements
											</h4>
											<ul class="space-y-2.5">
												{#each requirements as req}
													<li class="flex items-start gap-2.5 text-sm text-dark-300">
														<span
															class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-cyan/10 text-accent-cyan"
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
														{req}
													</li>
												{/each}
											</ul>
										</div>
									{/if}

									<!-- Nice to Have -->
									{#if niceToHave.length > 0}
										<div>
											<h4
												class="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent-purple"
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
													<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
												</svg>
												Nice to Have
											</h4>
											<ul class="space-y-2.5">
												{#each niceToHave as item}
													<li class="flex items-start gap-2.5 text-sm text-dark-300">
														<span
															class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-purple/10 text-accent-purple"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="9"
																height="9"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="2"
															>
																<path d="M12 5v14M5 12h14" />
															</svg>
														</span>
														{item}
													</li>
												{/each}
											</ul>
										</div>
									{/if}

									<!-- Benefits -->
									{#if benefits.length > 0}
										<div>
											<h4
												class="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-yellow-400"
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
													<path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
												</svg>
												Benefits
											</h4>
											<ul class="space-y-2.5">
												{#each benefits as benefit}
													<li class="flex items-start gap-2.5 text-sm text-dark-300">
														<span
															class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-400"
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
														{benefit}
													</li>
												{/each}
											</ul>
										</div>
									{/if}
								</div>

								<!-- Apply CTA -->
								<div class="mt-8 flex flex-wrap items-center gap-4 border-t border-dark-700/50 pt-6">
									<Button href="/careers/{job.slug}" variant="primary" size="md">
										Apply for this Role
									</Button>
									<span class="text-sm text-dark-500">or</span>
									<a
										href="/careers/{job.slug}"
										class="font-mono text-sm text-dark-400 underline underline-offset-4 hover:text-accent-cyan transition-colors"
									>
										View full job details
									</a>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- Benefits Section -->
<section class="bg-dark-900 py-24">
	<div class="mx-auto max-w-7xl px-6">
		<SectionHeading
			label="Perks & Benefits"
			title="What We Offer"
			subtitle="We invest in our people because great people build great technology."
		/>

		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each companyBenefits as benefit, i}
				<div
					class="group flex gap-5 rounded-xl border border-dark-700/50 bg-dark-950/70 p-6 transition-all duration-300 hover:border-accent-cyan/20 hover:bg-dark-800/50"
					use:scrollReveal={{ delay: i * 0.08 }}
				>
					<div
						class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/15 to-accent-blue/10 text-accent-cyan ring-1 ring-accent-cyan/20"
					>
						{@html benefit.icon}
					</div>
					<div>
						<h3 class="font-semibold text-dark-100 transition-colors group-hover:text-accent-cyan">
							{benefit.title}
						</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-dark-400">{benefit.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Don't see your role CTA -->
<section class="bg-dark-950 py-24">
	<div class="mx-auto max-w-3xl px-6 text-center" use:scrollReveal>
		<div
			class="relative overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-900/60 px-10 py-14"
		>
			<div
				class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-blue/8 blur-3xl"
			></div>
			<div
				class="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent-purple/8 blur-3xl"
			></div>

			<div class="relative">
				<div
					class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-cyan/10 text-accent-cyan ring-1 ring-accent-cyan/20"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<circle cx="11" cy="11" r="8" />
						<path d="m21 21-4.3-4.3" />
					</svg>
				</div>
				<h2 class="text-2xl font-bold text-dark-100 md:text-3xl">
					Don't see your role?
				</h2>
				<p class="mx-auto mt-4 max-w-md text-dark-400">
					We're always looking for exceptional talent. Send us your resume and tell us how you'd like
					to contribute — we'll reach out when the right opportunity opens.
				</p>
				<div class="mt-8">
					<Button href="/contact" variant="primary" size="lg">Get in Touch</Button>
				</div>
			</div>
		</div>
	</div>
</section>
