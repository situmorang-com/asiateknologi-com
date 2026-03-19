<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { tiltCard } from '$lib/animations/actions/tiltCard';

	let { data } = $props();

	let activeIndustry = $state('all');

	type CaseStudy = typeof data.caseStudies[number];

	const filteredCaseStudies = $derived(
		activeIndustry === 'all'
			? data.caseStudies
			: data.caseStudies.filter((cs: CaseStudy) => cs.industrySlug === activeIndustry)
	);

	function getMetrics(cs: CaseStudy): Array<{ value: string; label: string; icon?: string }> {
		try {
			return cs.metrics ? JSON.parse(cs.metrics) : [];
		} catch {
			return [];
		}
	}

	function getTechnologies(cs: CaseStudy): string[] {
		try {
			return cs.technologies ? JSON.parse(cs.technologies) : [];
		} catch {
			return [];
		}
	}

	const gradientFallbacks = [
		'from-cyan-500/20 via-blue-600/10 to-transparent',
		'from-purple-500/20 via-blue-600/10 to-transparent',
		'from-emerald-500/20 via-cyan-600/10 to-transparent',
		'from-orange-500/20 via-red-600/10 to-transparent',
		'from-blue-500/20 via-indigo-600/10 to-transparent',
		'from-pink-500/20 via-purple-600/10 to-transparent'
	];

	function getCoverGradient(cs: CaseStudy, idx: number): string {
		return cs.coverGradient || gradientFallbacks[idx % gradientFallbacks.length];
	}
</script>

<svelte:head>
	<title>Case Studies - Asiateknologi</title>
	<meta
		name="description"
		content="Real-world technology solutions delivering measurable results across mining, financial services, healthcare, and manufacturing industries."
	/>
	<meta property="og:title" content="Case Studies - Asiateknologi" />
	<meta
		property="og:description"
		content="Real-world technology solutions delivering measurable results for enterprise clients across Indonesia."
	/>
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden pt-32 pb-20">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<!-- Dot grid -->
	<div
		class="absolute inset-0 opacity-[0.04]"
		style="background-image: radial-gradient(circle at 1px 1px, rgba(0,229,255,0.8) 1px, transparent 0); background-size: 32px 32px;"
	></div>
	<!-- Glow orbs -->
	<div
		class="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none"
	></div>
	<div
		class="absolute top-40 right-1/4 h-80 w-80 rounded-full bg-accent-purple/5 blur-[100px] pointer-events-none"
	></div>

	<div class="relative mx-auto max-w-7xl px-6 text-center">
		<span
			class="mb-4 inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
			use:scrollReveal
		>
			Proven Results
		</span>
		<h1 class="mt-4 text-4xl font-bold text-dark-100 md:text-6xl lg:text-7xl" use:textScramble>
			Case Studies
		</h1>
		<p
			class="mx-auto mt-6 max-w-2xl text-lg text-dark-400 leading-relaxed"
			use:scrollReveal={{ delay: 0.2 }}
		>
			Real-world solutions delivering measurable impact. Explore how we've transformed operations,
			reduced costs, and accelerated growth for enterprise clients across Indonesia.
		</p>

		<!-- Stats bar -->
		<div
			class="mx-auto mt-12 flex flex-wrap items-center justify-center gap-0 divide-x divide-dark-700/60 rounded-2xl border border-dark-700/60 bg-dark-800/60 backdrop-blur-sm max-w-2xl"
			use:scrollReveal={{ delay: 0.35 }}
		>
			<div class="flex flex-col items-center gap-1 px-8 py-5">
				<span class="text-2xl font-bold text-accent-cyan">6</span>
				<span class="text-xs text-dark-400 whitespace-nowrap">Case Studies</span>
			</div>
			<div class="flex flex-col items-center gap-1 px-8 py-5">
				<span class="text-2xl font-bold text-accent-cyan">5</span>
				<span class="text-xs text-dark-400 whitespace-nowrap">Industries</span>
			</div>
			<div class="flex flex-col items-center gap-1 px-8 py-5">
				<span class="text-2xl font-bold text-accent-cyan">Rp 13B+</span>
				<span class="text-xs text-dark-400 whitespace-nowrap">Client Savings</span>
			</div>
		</div>
	</div>
</section>

<!-- Filter + Grid -->
<section class="py-20 bg-dark-950">
	<div class="mx-auto max-w-7xl px-6">
		<!-- Filter tabs -->
		<div
			class="mb-12 flex flex-wrap items-center gap-2"
			use:scrollReveal
		>
			<button
				onclick={() => (activeIndustry = 'all')}
				class="rounded-full px-5 py-2 text-sm font-medium transition-all {activeIndustry === 'all'
					? 'bg-accent-cyan text-dark-950'
					: 'border border-dark-600 text-dark-400 hover:border-accent-cyan/40 hover:text-dark-100'}"
			>
				All
				<span class="ml-1.5 opacity-60">({data.caseStudies.length})</span>
			</button>
			{#each data.industryCounts as { industry, industrySlug, count }}
				<button
					onclick={() => (activeIndustry = industrySlug || industry.toLowerCase().replace(/\s+/g, '-'))}
					class="rounded-full px-5 py-2 text-sm font-medium transition-all {activeIndustry === (industrySlug || industry.toLowerCase().replace(/\s+/g, '-'))
						? 'bg-accent-cyan text-dark-950'
						: 'border border-dark-600 text-dark-400 hover:border-accent-cyan/40 hover:text-dark-100'}"
				>
					{industry}
					<span class="ml-1.5 opacity-60">({count})</span>
				</button>
			{/each}
		</div>

		<!-- Case study grid -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredCaseStudies as cs, i (cs.id)}
				{@const metrics = getMetrics(cs)}
				{@const technologies = getTechnologies(cs)}
				{@const isFeatured = cs.featured === 1}
				<div
					class="group relative rounded-2xl border border-dark-600/60 bg-dark-800 overflow-hidden transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-lg hover:shadow-accent-cyan/10 {isFeatured ? 'md:col-span-2' : ''}"
					use:tiltCard={{ maxTilt: 5 }}
					use:scrollReveal={{ delay: i * 0.08 }}
					in:fly={{ y: 24, duration: 350, delay: i * 60 }}
				>
					<!-- Cover gradient header -->
					<div
						class="relative h-44 bg-gradient-to-br {getCoverGradient(cs, i)} bg-dark-900 overflow-hidden {isFeatured ? 'md:h-52' : ''}"
					>
						<!-- Abstract geometry -->
						<div class="absolute inset-0 opacity-20">
							<div
								class="absolute -top-8 -right-8 h-40 w-40 rounded-full border border-accent-cyan/30"
							></div>
							<div
								class="absolute -bottom-12 -left-4 h-32 w-32 rounded-full border border-accent-purple/20"
							></div>
							<div
								class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-px bg-gradient-to-b from-transparent via-accent-cyan/40 to-transparent"
							></div>
						</div>

						<!-- Featured badge -->
						{#if isFeatured}
							<div class="absolute top-4 right-4">
								<span
									class="flex items-center gap-1.5 rounded-full bg-accent-cyan/20 border border-accent-cyan/40 px-3 py-1 text-xs font-semibold text-accent-cyan backdrop-blur-sm"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
									Featured
								</span>
							</div>
						{/if}

						<!-- Industry badge -->
						<div class="absolute bottom-4 left-4">
							<span
								class="rounded-full border border-dark-600/80 bg-dark-900/70 backdrop-blur-sm px-3 py-1 text-xs font-medium text-dark-300"
							>
								{cs.industry}
							</span>
						</div>
					</div>

					<!-- Card body -->
					<div class="p-6 {isFeatured ? 'md:p-8' : ''}">
						<!-- Client -->
						<p class="text-xs font-semibold uppercase tracking-widest text-accent-cyan/80 mb-2">
							{cs.client}
						</p>

						<!-- Title -->
						<h3
							class="text-lg font-bold text-dark-100 group-hover:text-accent-cyan transition-colors leading-snug {isFeatured ? 'md:text-xl' : ''}"
						>
							{cs.title}
						</h3>

						<!-- Metrics badges -->
						{#if metrics.length > 0}
							<div class="mt-4 flex flex-wrap gap-2">
								{#each metrics.slice(0, 3) as metric}
									<div
										class="rounded-lg border border-dark-600/60 bg-dark-900/60 px-3 py-1.5 text-center"
									>
										<p class="text-sm font-bold text-accent-cyan">{metric.value}</p>
										<p class="text-xs text-dark-400">{metric.label}</p>
									</div>
								{/each}
							</div>
						{/if}

						<!-- Technologies -->
						{#if technologies.length > 0}
							<div class="mt-4 flex flex-wrap gap-1.5">
								{#each technologies.slice(0, 3) as tech}
									<span
										class="rounded-md border border-dark-700/60 bg-dark-900/40 px-2.5 py-1 text-xs text-dark-300"
									>
										{tech}
									</span>
								{/each}
								{#if technologies.length > 3}
									<span class="px-2.5 py-1 text-xs text-dark-400">
										+{technologies.length - 3} more
									</span>
								{/if}
							</div>
						{/if}

						<!-- Read more link -->
						<div class="mt-6">
							<a
								href="/case-studies/{cs.slug}"
								class="inline-flex items-center gap-2 text-sm font-semibold text-accent-cyan hover:text-accent-blue transition-colors"
							>
								Read Case Study
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									class="transition-transform group-hover:translate-x-1"
								>
									<path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			{:else}
				<div class="col-span-full py-20 text-center text-dark-400" in:fade>
					<p class="text-lg">No case studies found for this industry.</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Bottom CTA -->
<section class="py-24 bg-dark-900">
	<div class="mx-auto max-w-3xl px-6 text-center" use:scrollReveal>
		<span class="mb-4 inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
			Get Started
		</span>
		<h2 class="text-3xl font-bold text-dark-100 md:text-4xl">
			Have a similar challenge?
		</h2>
		<p class="mt-4 text-lg text-dark-400 leading-relaxed">
			Our team has helped enterprises across Indonesia solve complex operational and technology
			challenges. Let's explore what we can build together.
		</p>
		<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button href="/contact" variant="primary" size="lg">Let's Talk</Button>
			<Button href="/services" variant="secondary" size="lg">View Our Services</Button>
		</div>
	</div>
</section>
