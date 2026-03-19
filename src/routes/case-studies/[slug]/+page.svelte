<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { counterUp } from '$lib/animations/actions/counterUp';
	import { tiltCard } from '$lib/animations/actions/tiltCard';

	let { data } = $props();

	const cs = $derived(data.caseStudy);

	type Metric = { value: string; label: string; icon?: string };

	function parseMetrics(raw: string | null): Metric[] {
		try {
			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	}

	function parseTechnologies(raw: string | null): string[] {
		try {
			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	}

	const metrics = $derived(parseMetrics(cs.metrics));
	const technologies = $derived(parseTechnologies(cs.technologies));

	function getRelatedMetrics(relatedCs: typeof data.related[number]): Metric[] {
		try {
			return relatedCs.metrics ? JSON.parse(relatedCs.metrics) : [];
		} catch {
			return [];
		}
	}

	// Returns true if the value contains at least one digit
	function isNumeric(value: string): boolean {
		return /\d/.test(value);
	}

	function extractSuffix(value: string): string {
		const match = value.match(/[\d,]+([^\d]*)$/);
		return match ? match[1] : '';
	}

	function extractPrefix(value: string): string {
		const match = value.match(/^([^\d]+)/);
		return match ? match[1] : '';
	}

	const gradientFallbacks = [
		'from-cyan-500/20 via-blue-600/10 to-transparent',
		'from-purple-500/20 via-blue-600/10 to-transparent',
		'from-emerald-500/20 via-cyan-600/10 to-transparent',
	];

	const heroBg = $derived(cs.coverGradient || gradientFallbacks[cs.id % gradientFallbacks.length]);
</script>

<svelte:head>
	<title>{cs.title} - Case Studies - Asiateknologi</title>
	<meta name="description" content="How Asiateknologi helped {cs.client} in the {cs.industry} sector: {cs.challenge.slice(0, 150)}..." />
	<meta property="og:title" content="{cs.title} - Asiateknologi" />
	<meta property="og:description" content="How Asiateknologi helped {cs.client}: {cs.challenge.slice(0, 150)}..." />
	<meta property="og:type" content="article" />
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden pt-32 pb-24">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<!-- Cover gradient overlay -->
	<div class="absolute inset-0 bg-gradient-to-br {heroBg} opacity-60"></div>
	<!-- Dot grid -->
	<div
		class="absolute inset-0 opacity-[0.04]"
		style="background-image: radial-gradient(circle at 1px 1px, rgba(0,229,255,0.8) 1px, transparent 0); background-size: 32px 32px;"
	></div>
	<!-- Glow -->
	<div class="absolute top-20 left-1/3 h-96 w-96 rounded-full bg-accent-cyan/8 blur-[140px] pointer-events-none"></div>

	<div class="relative mx-auto max-w-7xl px-6">
		<!-- Breadcrumb -->
		<nav class="mb-10 flex items-center gap-2 text-sm text-dark-400" aria-label="Breadcrumb">
			<a href="/" class="hover:text-accent-cyan transition-colors">Home</a>
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
			<a href="/case-studies" class="hover:text-accent-cyan transition-colors">Case Studies</a>
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
			<span class="text-dark-300 line-clamp-1 max-w-xs">{cs.title}</span>
		</nav>

		<!-- Badges -->
		<div class="mb-6 flex flex-wrap items-center gap-3" use:scrollReveal>
			<span class="rounded-full border border-dark-600/80 bg-dark-800/70 backdrop-blur-sm px-3 py-1 text-xs font-medium text-dark-300">
				{cs.industry}
			</span>
			{#if cs.serviceSlug}
				<span class="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-xs font-medium text-accent-cyan">
					{cs.serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
				</span>
			{/if}
		</div>

		<!-- Client + Title -->
		<p class="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan/80" use:scrollReveal>
			{cs.client}
		</p>
		<h1 class="max-w-4xl text-4xl font-bold text-dark-100 leading-tight md:text-5xl lg:text-6xl" use:textScramble>
			{cs.title}
		</h1>

		<!-- Metrics grid -->
		{#if metrics.length > 0}
			<div
				class="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
				use:scrollReveal={{ delay: 0.3 }}
			>
				{#each metrics as metric}
					<div class="rounded-2xl border border-dark-600/60 bg-dark-800/80 backdrop-blur-sm p-5 text-center">
						{#if metric.icon}
							<div class="mb-2 flex justify-center text-2xl">{metric.icon}</div>
						{/if}
						{#if isNumeric(metric.value)}
							<p
								class="text-3xl font-bold text-accent-cyan"
								use:counterUp={{ duration: 1800, suffix: extractSuffix(metric.value), prefix: extractPrefix(metric.value) }}
							>
								{metric.value}
							</p>
						{:else}
							<p class="text-2xl font-bold text-accent-cyan">
								{metric.value}
							</p>
						{/if}
						<p class="mt-1 text-xs text-dark-400 leading-snug">{metric.label}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- Technologies -->
{#if technologies.length > 0}
	<section class="py-12 bg-dark-900 border-y border-dark-700/40">
		<div class="mx-auto max-w-7xl px-6">
			<div class="flex flex-wrap items-center gap-4" use:scrollReveal>
				<span class="text-sm font-semibold text-dark-400 shrink-0">Technologies Used:</span>
				<div class="flex flex-wrap gap-2">
					{#each technologies as tech}
						<span class="rounded-full border border-dark-600/60 bg-dark-800 px-4 py-1.5 text-sm font-medium text-dark-200 hover:border-accent-cyan/40 hover:text-accent-cyan transition-colors">
							{tech}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</section>
{/if}

<!-- Challenge -->
<section class="py-20 bg-dark-950">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid gap-12 lg:grid-cols-12">
			<div class="lg:col-span-4" use:scrollReveal>
				<div class="sticky top-24">
					<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
						01 / Challenge
					</span>
					<h2 class="mt-3 text-2xl font-bold text-dark-100">
						The Problem
					</h2>
					<div class="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue"></div>
				</div>
			</div>
			<div class="lg:col-span-8" use:scrollReveal={{ delay: 0.15 }}>
				<div class="prose prose-invert max-w-none">
					<p class="text-lg text-dark-300 leading-relaxed whitespace-pre-line">
						{cs.challenge}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Solution -->
<section class="py-20 bg-dark-900">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid gap-12 lg:grid-cols-12">
			<div class="lg:col-span-4" use:scrollReveal>
				<div class="sticky top-24">
					<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
						02 / Solution
					</span>
					<h2 class="mt-3 text-2xl font-bold text-dark-100">
						What We Built
					</h2>
					<div class="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"></div>
				</div>
			</div>
			<div class="lg:col-span-8" use:scrollReveal={{ delay: 0.15 }}>
				<div class="prose prose-invert max-w-none">
					<p class="text-lg text-dark-300 leading-relaxed whitespace-pre-line">
						{cs.solution}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Results -->
<section class="py-20 bg-dark-950">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid gap-12 lg:grid-cols-12">
			<div class="lg:col-span-4" use:scrollReveal>
				<div class="sticky top-24">
					<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
						03 / Results
					</span>
					<h2 class="mt-3 text-2xl font-bold text-dark-100">
						The Outcomes
					</h2>
					<div class="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan"></div>
				</div>
			</div>
			<div class="lg:col-span-8" use:scrollReveal={{ delay: 0.15 }}>
				<div class="prose prose-invert max-w-none">
					<p class="text-lg text-dark-300 leading-relaxed whitespace-pre-line">
						{cs.results}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Testimonial -->
{#if cs.testimonialQuote}
	<section class="py-20 bg-dark-900">
		<div class="mx-auto max-w-4xl px-6" use:scrollReveal>
			<div class="relative rounded-2xl border border-dark-600/60 bg-dark-800 p-10 md:p-14">
				<!-- Quote icon -->
				<div class="absolute -top-5 left-10">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue shadow-lg shadow-accent-cyan/20">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-dark-950">
							<path d="M11.3 6C7 6.5 4 9.6 4 14c0 2.8 1.6 4 3.3 4 1.6 0 2.8-1.2 2.8-2.8 0-1.5-1-2.7-2.5-2.8-.3 0-.5 0-.7.1.3-2 1.7-3.5 4-4L11.3 6zm7.4 0c-4.3.5-7.3 3.6-7.3 8 0 2.8 1.6 4 3.3 4 1.7 0 2.8-1.2 2.8-2.8 0-1.5-1-2.7-2.5-2.8-.3 0-.5 0-.7.1.3-2 1.7-3.5 4-4L18.7 6z"/>
						</svg>
					</div>
				</div>

				<!-- Glow -->
				<div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/5 to-transparent pointer-events-none"></div>

				<blockquote class="relative mt-4">
					<p class="text-xl text-dark-100 leading-relaxed italic md:text-2xl">
						"{cs.testimonialQuote}"
					</p>
					{#if cs.testimonialAuthor}
						<footer class="mt-8 flex items-center gap-4">
							<div class="h-px flex-1 bg-dark-700/60"></div>
							<div class="text-right">
								<p class="font-semibold text-dark-100">{cs.testimonialAuthor}</p>
								{#if cs.testimonialTitle}
									<p class="mt-0.5 text-sm text-dark-400">{cs.testimonialTitle}</p>
								{/if}
								<p class="mt-0.5 text-xs font-medium text-accent-cyan">{cs.client}</p>
							</div>
						</footer>
					{/if}
				</blockquote>
			</div>
		</div>
	</section>
{/if}

<!-- Related Case Studies -->
{#if data.related.length > 0}
	<section class="py-24 bg-dark-950">
		<div class="mx-auto max-w-7xl px-6">
			<SectionHeading
				label="More Work"
				title="Related Case Studies"
				subtitle="Explore similar projects and outcomes we've delivered."
				center={false}
			/>

			<div class="mt-12 grid gap-6 md:grid-cols-2">
				{#each data.related as related, i}
					{@const relatedMetrics = getRelatedMetrics(related)}
					<a
						href="/case-studies/{related.slug}"
						class="group relative rounded-2xl border border-dark-600/60 bg-dark-800 overflow-hidden transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-lg hover:shadow-accent-cyan/10"
						use:tiltCard={{ maxTilt: 5 }}
						use:scrollReveal={{ delay: i * 0.1 }}
					>
						<!-- Gradient header strip -->
						<div
							class="h-32 bg-gradient-to-br {related.coverGradient || gradientFallbacks[i % gradientFallbacks.length]} bg-dark-900 relative overflow-hidden"
						>
							<div class="absolute inset-0 opacity-20">
								<div class="absolute -top-6 -right-6 h-32 w-32 rounded-full border border-accent-cyan/30"></div>
							</div>
							<div class="absolute bottom-3 left-4">
								<span class="rounded-full border border-dark-600/80 bg-dark-900/70 backdrop-blur-sm px-3 py-1 text-xs font-medium text-dark-300">
									{related.industry}
								</span>
							</div>
						</div>

						<div class="p-6">
							<p class="text-xs font-semibold uppercase tracking-widest text-accent-cyan/80 mb-2">
								{related.client}
							</p>
							<h3 class="text-lg font-bold text-dark-100 group-hover:text-accent-cyan transition-colors leading-snug">
								{related.title}
							</h3>
							{#if relatedMetrics.length > 0}
								<div class="mt-3 flex flex-wrap gap-2">
									{#each relatedMetrics.slice(0, 2) as metric}
										<div class="rounded-lg border border-dark-600/60 bg-dark-900/60 px-3 py-1 text-center">
											<p class="text-sm font-bold text-accent-cyan">{metric.value}</p>
											<p class="text-xs text-dark-400">{metric.label}</p>
										</div>
									{/each}
								</div>
							{/if}
							<div class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-cyan">
								Read Case Study
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- CTA -->
<section class="py-24 bg-dark-900">
	<div class="mx-auto max-w-3xl px-6 text-center" use:scrollReveal>
		<span class="mb-4 inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
			Work With Us
		</span>
		<h2 class="text-3xl font-bold text-dark-100 md:text-4xl">
			Start a Similar Project
		</h2>
		<p class="mt-4 text-lg text-dark-400 leading-relaxed">
			Ready to transform your operations like {cs.client}? Our specialists are here to
			design a solution tailored to your unique challenges.
		</p>
		<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button href="/contact" variant="primary" size="lg">Contact Our Team</Button>
			<Button href="/case-studies" variant="secondary" size="lg">View All Case Studies</Button>
		</div>
	</div>
</section>
