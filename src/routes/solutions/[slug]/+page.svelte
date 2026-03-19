<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { counterUp } from '$lib/animations/actions/counterUp';
	import { tiltCard } from '$lib/animations/actions/tiltCard';

	let { data } = $props();
	const solutions = $derived(data.industry.solutions ? JSON.parse(data.industry.solutions) : []);
	const metrics = $derived(data.industry.metrics ? JSON.parse(data.industry.metrics) : []);

	// Returns true if the value contains a number we can animate
	function isNumeric(value: string): boolean {
		return /\d/.test(value);
	}

	// Extract prefix before first digit (e.g. "$", "<")
	function extractPrefix(value: string): string {
		const match = value.match(/^([^\d]+)/);
		return match ? match[1] : '';
	}

	// Extract suffix after last digit (e.g. "%", "ms", "+")
	function extractSuffix(value: string): string {
		const match = value.match(/[\d,]+([^\d]*)$/);
		return match ? match[1] : '';
	}

	// Industry-specific accent colors
	const industryColors: Record<string, { from: string; to: string; text: string; border: string }> = {
		mining: { from: 'from-amber-500/20', to: 'to-orange-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
		healthcare: { from: 'from-emerald-500/20', to: 'to-teal-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
		'financial-services': { from: 'from-blue-500/20', to: 'to-indigo-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
		manufacturing: { from: 'from-purple-500/20', to: 'to-violet-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
		'smart-city': { from: 'from-cyan-500/20', to: 'to-blue-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
		energy: { from: 'from-yellow-500/20', to: 'to-orange-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
		logistics: { from: 'from-sky-500/20', to: 'to-cyan-500/20', text: 'text-sky-400', border: 'border-sky-500/30' },
		telecommunications: { from: 'from-violet-500/20', to: 'to-purple-500/20', text: 'text-violet-400', border: 'border-violet-500/30' }
	};

	const color = $derived(
		industryColors[data.industry.slug] || {
			from: 'from-accent-cyan/20',
			to: 'to-accent-blue/20',
			text: 'text-accent-cyan',
			border: 'border-accent-cyan/30'
		}
	);

	// Industry icons
	const industryIcons: Record<string, string> = {
		mining: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 22h20"/><path d="M6.87 2h10.26L20 7H4L6.87 2z"/><path d="M4 7v15"/><path d="M20 7v15"/><path d="M12 7v15"/><path d="M8 12h8"/><path d="M8 17h8"/></svg>`,
		healthcare: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/></svg>`,
		'financial-services': `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
		manufacturing: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>`,
		'smart-city': `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
		energy: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
		logistics: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect width="13" height="13" x="9" y="9" rx="2"/><path d="m16 13-3.5 3.5-2-2L9 16"/></svg>`,
		telecommunications: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`
	};

	const industryIcon = $derived(
		industryIcons[data.industry.slug] ||
			`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`
	);
</script>

<svelte:head>
	<title>{data.industry.name} Solutions - Asiateknologi</title>
	<meta name="description" content={data.industry.description} />
	<meta property="og:title" content="{data.industry.name} Solutions - Asiateknologi" />
	<meta property="og:description" content={data.industry.description} />
</svelte:head>

<!-- Hero -->
<section class="relative pt-32 pb-24 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<!-- Dot pattern -->
	<div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle at 1px 1px, rgba(0,229,255,0.5) 1px, transparent 0); background-size: 32px 32px;"></div>
	<!-- Gradient orb -->
	<div class="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br {color.from} {color.to} blur-[120px] opacity-30"></div>

	<div class="relative mx-auto max-w-7xl px-6">
		<a href="/solutions" class="mb-8 inline-flex items-center gap-2 text-sm text-dark-400 hover:text-accent-cyan transition-colors">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
			All Industries
		</a>

		<div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
			<div class="lg:max-w-2xl">
				<div class="mb-6 inline-flex items-center gap-3 rounded-2xl border {color.border} bg-dark-900 px-5 py-3 {color.text}">
					{@html industryIcon}
					<span class="font-mono text-sm font-semibold uppercase tracking-widest">{data.industry.name}</span>
				</div>

				<h1 class="text-4xl font-bold text-dark-100 md:text-6xl leading-tight" use:textScramble>
					{data.industry.name}<br />
					<span class="{color.text}">Solutions</span>
				</h1>
				<p class="mt-6 text-xl text-dark-400 leading-relaxed" use:scrollReveal={{ delay: 0.2 }}>
					{data.industry.longDescription || data.industry.description}
				</p>

				<div class="mt-8 flex flex-wrap gap-4" use:scrollReveal={{ delay: 0.3 }}>
					<Button href="/contact" variant="primary" size="lg">Request a Consultation</Button>
					<Button href="/case-studies" variant="ghost" size="lg">View Case Studies</Button>
				</div>
			</div>

			<!-- Quick stats from metrics -->
			{#if metrics.length > 0}
				<div class="grid grid-cols-2 gap-4 lg:min-w-[340px]" use:scrollReveal={{ delay: 0.4 }}>
					{#each metrics as metric}
						<div class="rounded-2xl border {color.border} bg-dark-900/80 p-5 text-center backdrop-blur">
							{#if isNumeric(metric.value)}
								<div
									class="font-mono text-3xl font-bold {color.text}"
									use:counterUp={{ suffix: extractSuffix(metric.value), prefix: extractPrefix(metric.value) }}
								>
									{metric.value}
								</div>
							{:else}
								<div class="font-mono text-2xl font-bold {color.text}">
									{metric.value}
								</div>
							{/if}
							<div class="mt-1 text-xs text-dark-400">{metric.label}</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Solutions Grid -->
<section class="py-24 bg-dark-900">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mb-12" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] {color.text}">
				What We Deliver
			</span>
			<h2 class="mt-3 text-3xl font-bold text-dark-100 md:text-4xl">
				Our <span class="{color.text}">{data.industry.name}</span> Capabilities
			</h2>
			<p class="mt-4 max-w-2xl text-dark-400">
				Purpose-built technology solutions refined through years of deployment in {data.industry.name.toLowerCase()} environments.
			</p>
		</div>

		<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each solutions as solution, i}
				<div
					class="group relative overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-950 p-6 transition-all hover:border-{color.border.replace('border-', '')} hover:bg-dark-800/50"
					use:tiltCard={{ maxTilt: 5 }}
					use:scrollReveal={{ delay: i * 0.07 }}
				>
					<!-- Background number -->
					<span class="absolute right-4 top-3 font-mono text-5xl font-bold text-dark-800 transition-colors group-hover:text-dark-700">
						{String(i + 1).padStart(2, '0')}
					</span>

					<div class="relative">
						<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br {color.from} {color.to} {color.text}">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
						</div>
						<h3 class="text-lg font-semibold text-dark-100 transition-colors group-hover:{color.text}">
							{solution}
						</h3>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Why Asiateknologi for this Industry -->
<section class="py-24 bg-dark-950">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
			<div use:scrollReveal={{ direction: 'left' }}>
				<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] {color.text}">
					Why Us
				</span>
				<h2 class="mt-3 text-3xl font-bold text-dark-100 md:text-4xl">
					Deep expertise in<br /><span class="{color.text}">{data.industry.name.toLowerCase()}</span> technology
				</h2>
				<p class="mt-4 text-lg text-dark-400 leading-relaxed">
					We don't just understand technology — we understand your industry's regulatory environment,
					operational constraints, and business objectives. This domain depth lets us deploy faster
					and deliver solutions that actually fit.
				</p>

				<ul class="mt-8 space-y-4">
					{#each ['Industry-certified engineers and consultants', 'Pre-built integrations for sector-specific systems', 'Compliance frameworks built into every deployment', 'Dedicated post-deployment support teams'] as point, i}
						<li class="flex items-start gap-3" use:scrollReveal={{ delay: 0.1 + i * 0.1 }}>
							<div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br {color.from} {color.to} {color.text}">
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
							</div>
							<span class="text-dark-300">{point}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Engagement process -->
			<div class="space-y-4" use:scrollReveal={{ direction: 'right' }}>
				{#each [
					{ step: '01', title: 'Discovery & Assessment', desc: 'We audit your current technology landscape and define success criteria for the engagement.' },
					{ step: '02', title: 'Solution Architecture', desc: 'Our architects design a solution tailored to your industry\'s specific protocols and requirements.' },
					{ step: '03', title: 'Phased Implementation', desc: 'Deployment in controlled phases with testing at each milestone to minimize operational disruption.' },
					{ step: '04', title: 'Integration & Go-Live', desc: 'Seamless integration with existing systems, staff training, and supervised go-live.' },
					{ step: '05', title: 'Managed Support', desc: 'Ongoing monitoring, optimization, and dedicated support to keep your systems at peak performance.' }
				] as item, i}
					<div
						class="flex gap-4 rounded-xl border border-dark-700/50 bg-dark-900 p-4 transition-all hover:border-{color.border.replace('border-', '')}"
						use:scrollReveal={{ delay: i * 0.1 }}
					>
						<span class="font-mono text-2xl font-bold {color.text} opacity-60">{item.step}</span>
						<div>
							<h3 class="font-semibold text-dark-100">{item.title}</h3>
							<p class="mt-1 text-sm text-dark-400">{item.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Related Case Studies -->
{#if data.relatedCaseStudies.length > 0}
	<section class="py-24 bg-dark-900">
		<div class="mx-auto max-w-7xl px-6">
			<div class="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" use:scrollReveal>
				<div>
					<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] {color.text}">
						Case Studies
					</span>
					<h2 class="mt-3 text-3xl font-bold text-dark-100">
						Proven Results in {data.industry.name}
					</h2>
				</div>
				<a href="/case-studies" class="text-sm font-medium {color.text} hover:underline">
					View all case studies →
				</a>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each data.relatedCaseStudies as study, i}
					{@const studyMetrics = study.metrics ? JSON.parse(study.metrics) : []}
					<a
						href="/case-studies/{study.slug}"
						class="group overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-950 transition-all hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5"
						use:scrollReveal={{ delay: i * 0.1 }}
					>
						<!-- Gradient header -->
						<div class="relative h-32 bg-gradient-to-br {study.coverGradient || 'from-dark-800 to-dark-700'} p-6">
							<span class="font-mono text-xs font-semibold uppercase tracking-widest text-white/60">
								{study.industry}
							</span>
							<div class="mt-2 text-sm font-bold text-white">{study.client}</div>

							{#if study.featured}
								<span class="absolute right-4 top-4 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur">
									Featured
								</span>
							{/if}
						</div>

						<div class="p-6">
							<h3 class="text-lg font-semibold text-dark-100 group-hover:text-accent-cyan transition-colors line-clamp-2">
								{study.title}
							</h3>
							<p class="mt-2 text-sm text-dark-400 line-clamp-2">{study.challenge}</p>

							{#if studyMetrics.length > 0}
								<div class="mt-4 flex flex-wrap gap-2">
									{#each studyMetrics.slice(0, 2) as metric}
										<span class="rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-3 py-1 text-xs font-semibold text-accent-cyan">
											{metric.value} {metric.label}
										</span>
									{/each}
								</div>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Related Services -->
<section class="py-24 bg-dark-950">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mb-12" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] {color.text}">
				Related Services
			</span>
			<h2 class="mt-3 text-3xl font-bold text-dark-100">Technology Services We Deploy</h2>
		</div>

		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{#each data.services.slice(0, 8) as service, i}
				<a
					href="/services/{service.slug}"
					class="group rounded-xl border border-dark-700/50 bg-dark-900 p-5 transition-all hover:border-accent-cyan/30 hover:shadow-md hover:shadow-accent-cyan/5"
					use:scrollReveal={{ delay: i * 0.07 }}
				>
					<h3 class="font-semibold text-dark-100 group-hover:text-accent-cyan transition-colors">{service.title}</h3>
					<p class="mt-2 text-sm text-dark-400 line-clamp-3">{service.description}</p>
					<div class="mt-4 flex items-center gap-1 text-xs font-medium {color.text} opacity-0 transition-opacity group-hover:opacity-100">
						Learn more
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Insights -->
{#if data.relatedInsights.length > 0}
	<section class="py-24 bg-dark-900">
		<div class="mx-auto max-w-7xl px-6">
			<div class="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" use:scrollReveal>
				<div>
					<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] {color.text}">
						Insights
					</span>
					<h2 class="mt-3 text-3xl font-bold text-dark-100">Latest Thinking</h2>
				</div>
				<a href="/insights" class="text-sm font-medium {color.text} hover:underline">
					View all insights →
				</a>
			</div>

			<div class="grid gap-6 md:grid-cols-3">
				{#each data.relatedInsights as article, i}
					<a
						href="/insights/{article.slug}"
						class="group overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-950 transition-all hover:border-accent-cyan/30"
						use:scrollReveal={{ delay: i * 0.1 }}
					>
						<div class="h-28 bg-gradient-to-br {article.coverGradient || 'from-dark-800 to-dark-700'} p-5">
							<span class="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur">
								{article.category}
							</span>
						</div>
						<div class="p-5">
							<h3 class="font-semibold text-dark-100 transition-colors group-hover:text-accent-cyan line-clamp-2">
								{article.title}
							</h3>
							<p class="mt-2 text-sm text-dark-400 line-clamp-2">{article.excerpt}</p>
							<div class="mt-4 flex items-center gap-3 text-xs text-dark-500">
								<span>{article.author}</span>
								<span>·</span>
								<span>{article.readTime} min read</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- CTA -->
<section class="py-24 bg-dark-950 relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-r {color.from} {color.to} opacity-20"></div>
	<div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle at 1px 1px, rgba(0,229,255,0.5) 1px, transparent 0); background-size: 24px 24px;"></div>

	<div class="relative mx-auto max-w-3xl px-6 text-center" use:scrollReveal>
		<div class="mb-6 inline-flex items-center gap-2 rounded-full border {color.border} bg-dark-900 px-4 py-2 text-sm {color.text}">
			<span class="h-2 w-2 rounded-full bg-current animate-pulse"></span>
			{data.industry.name} Specialists Available
		</div>

		<h2 class="text-3xl font-bold text-dark-100 md:text-5xl">
			Ready to transform your<br />
			<span class="{color.text}">{data.industry.name.toLowerCase()}</span> operations?
		</h2>
		<p class="mt-6 text-lg text-dark-400">
			Our {data.industry.name.toLowerCase()} technology specialists are ready to discuss your specific challenges
			and design a solution that fits your environment and budget.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<Button href="/contact" variant="primary" size="lg">Schedule a Discovery Call</Button>
			<Button href="/resources" variant="ghost" size="lg">Download Industry Guide</Button>
		</div>
	</div>
</section>
