<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { tiltCard } from '$lib/animations/actions/tiltCard';

	let { data } = $props();

	const features = $derived(
		data.service.features ? JSON.parse(data.service.features) : []
	);
	const techStack = $derived(
		data.service.techStack ? JSON.parse(data.service.techStack) : []
	);
	const engagements = $derived(
		data.service.engagementModels ? JSON.parse(data.service.engagementModels) : []
	);

	// Icon map (same as services index)
	const icons: Record<string, string> = {
		consulting: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
		cpu: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/></svg>`,
		users: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
		device: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>`,
		shield: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>`,
		lock: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
		cloud: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
		chart: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
		database: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
		refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
		book: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
		briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
	};

	const getIcon = (name: string | null) => icons[name ?? ''] ?? icons['consulting'];

	// Category-based accent gradient
	const categoryAccent: Record<string, string> = {
		core: 'from-accent-cyan to-accent-blue',
		managed: 'from-accent-blue to-accent-purple',
		security: 'from-accent-purple to-pink-500',
		advisory: 'from-accent-green to-accent-cyan',
		staffing: 'from-accent-blue to-accent-cyan'
	};
	const accent = $derived(categoryAccent[data.service.category ?? ''] ?? 'from-accent-cyan to-accent-blue');

	// Category label
	const categoryLabel: Record<string, string> = {
		core: 'Core Services',
		managed: 'Managed Services',
		security: 'Security',
		advisory: 'Advisory & Consulting',
		staffing: 'Staffing'
	};
</script>

<svelte:head>
	<title>{data.service.title} - Asiateknologi</title>
	<meta name="description" content={data.service.description} />
	<meta property="og:title" content="{data.service.title} - Asiateknologi" />
	<meta property="og:description" content={data.service.description} />
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden pt-32 pb-20">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle at 1px 1px, rgba(0,229,255,0.4) 1px, transparent 0); background-size: 28px 28px;"></div>
	<!-- Glow -->
	<div class="absolute -top-32 left-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-accent-cyan/15 to-accent-blue/10 blur-[100px]"></div>

	<div class="relative mx-auto max-w-7xl px-6">
		<!-- Breadcrumb -->
		<nav class="mb-8 flex items-center gap-2 text-sm text-dark-500" use:scrollReveal>
			<a href="/" class="hover:text-accent-cyan transition-colors">Home</a>
			<span>›</span>
			<a href="/services" class="hover:text-accent-cyan transition-colors">Services</a>
			<span>›</span>
			<span class="text-dark-300">{data.service.title}</span>
		</nav>

		<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
			<!-- Left: Text -->
			<div>
				{#if data.service.category}
					<span class="mb-4 inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
						{categoryLabel[data.service.category] ?? data.service.category}
					</span>
				{/if}

				<h1 class="text-4xl font-bold leading-tight text-dark-100 md:text-5xl" use:textScramble>
					{data.service.title}
				</h1>

				<p class="mt-6 text-lg text-dark-400 leading-relaxed" use:scrollReveal={{ delay: 0.2 }}>
					{data.service.longDescription || data.service.description}
				</p>

				<div class="mt-8 flex flex-wrap gap-4" use:scrollReveal={{ delay: 0.3 }}>
					<Button href="/contact?service={data.service.slug}" variant="primary" size="lg">
						Get a Quote
					</Button>
					<Button href="/contact" variant="ghost" size="lg">
						Book a Consultation
					</Button>
				</div>
			</div>

			<!-- Right: Icon card -->
			<div class="flex justify-center lg:justify-end" use:scrollReveal={{ direction: 'right' }}>
				<div class="relative">
					<!-- Outer glow ring -->
					<div class="absolute inset-0 rounded-3xl bg-gradient-to-br {accent} opacity-20 blur-xl scale-110"></div>
					<div class="relative rounded-3xl border border-dark-700/60 bg-dark-900 p-10 shadow-2xl">
						<!-- Top bar -->
						<div class="mb-6 h-1 w-full rounded-full bg-gradient-to-r {accent}"></div>

						<div class="flex items-center gap-4 text-accent-cyan">
							{@html getIcon(data.service.icon)}
							<div>
								<p class="font-mono text-xs text-dark-500 uppercase tracking-widest">Service</p>
								<p class="mt-0.5 text-sm font-semibold text-dark-200">{data.service.title}</p>
							</div>
						</div>

						{#if engagements.length > 0}
							<div class="mt-6 border-t border-dark-800 pt-5">
								<p class="mb-3 font-mono text-xs text-dark-500 uppercase tracking-widest">Engagement Models</p>
								<div class="flex flex-wrap gap-2">
									{#each engagements as model}
										<span class="rounded-full border border-dark-700 bg-dark-800 px-3 py-1 text-xs text-dark-300">
											{model}
										</span>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features -->
{#if features.length > 0}
	<section class="py-24 bg-dark-900">
		<div class="mx-auto max-w-7xl px-6">
			<div class="mb-12" use:scrollReveal>
				<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
					What's Included
				</span>
				<h2 class="mt-3 text-3xl font-bold text-dark-100">
					Service Capabilities
				</h2>
				<p class="mt-3 max-w-2xl text-dark-400">
					Everything you need to successfully deploy and scale this service within your organization.
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each features as feature, i}
					<div
						class="group flex items-start gap-4 rounded-2xl border border-dark-700 bg-dark-950 p-5 transition-all hover:border-accent-cyan/30 hover:bg-dark-800/50"
						use:scrollReveal={{ delay: i * 0.07 }}
					>
						<div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br {accent} opacity-80 group-hover:opacity-100 transition-opacity">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
						</div>
						<span class="text-sm font-medium text-dark-300 group-hover:text-dark-100 transition-colors leading-relaxed">{feature}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Tech Stack + Process -->
<section class="py-24 bg-dark-950">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid gap-16 lg:grid-cols-2">
			<!-- Tech Stack -->
			{#if techStack.length > 0}
				<div use:scrollReveal={{ direction: 'left' }}>
					<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
						Technology
					</span>
					<h2 class="mt-3 text-2xl font-bold text-dark-100">Tools & Platforms</h2>
					<p class="mt-3 text-dark-400">
						Best-in-class technologies we deploy for this service, selected based on your environment and requirements.
					</p>

					<div class="mt-8 flex flex-wrap gap-3">
						{#each techStack as tech, i}
							<div
								class="group flex items-center gap-2.5 rounded-xl border border-dark-700 bg-dark-900 px-4 py-2.5 transition-all hover:border-accent-cyan/40 hover:bg-dark-800"
								use:scrollReveal={{ delay: i * 0.05 }}
							>
								<div class="h-2 w-2 rounded-full bg-gradient-to-r {accent} group-hover:scale-125 transition-transform"></div>
								<span class="font-mono text-sm text-dark-300 group-hover:text-dark-100 transition-colors">{tech}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Process -->
			<div use:scrollReveal={{ direction: 'right' }}>
				<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
					Our Process
				</span>
				<h2 class="mt-3 text-2xl font-bold text-dark-100">How We Deliver</h2>
				<p class="mt-3 text-dark-400">
					A structured, proven approach that minimizes risk and maximizes value at every stage.
				</p>

				<div class="mt-8 space-y-4">
					{#each [
						{ step: '01', title: 'Discovery & Requirements', desc: 'We map your current environment, define objectives, and document success criteria.' },
						{ step: '02', title: 'Solution Design', desc: 'Architecture blueprints, technology selection, and project planning with defined milestones.' },
						{ step: '03', title: 'Implementation', desc: 'Phased delivery with weekly progress reviews and testing at each checkpoint.' },
						{ step: '04', title: 'Integration & Training', desc: 'System integration, staff onboarding, and knowledge transfer to your team.' },
						{ step: '05', title: 'Support & Optimization', desc: 'Ongoing monitoring, performance tuning, and dedicated support after go-live.' }
					] as item, i}
						<div
							class="flex gap-4 rounded-xl border border-dark-800 bg-dark-900 p-4 hover:border-dark-700 transition-colors"
							use:scrollReveal={{ delay: i * 0.08 }}
						>
							<span class="font-mono text-xl font-bold text-accent-cyan/40 shrink-0 w-8">{item.step}</span>
							<div>
								<h3 class="font-semibold text-dark-100">{item.title}</h3>
								<p class="mt-1 text-sm text-dark-400">{item.desc}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Engagement Models -->
{#if engagements.length > 0}
	<section class="py-20 bg-dark-900">
		<div class="mx-auto max-w-7xl px-6">
			<div class="mb-12 text-center" use:scrollReveal>
				<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
					Flexibility
				</span>
				<h2 class="mt-3 text-3xl font-bold text-dark-100">Engagement Models</h2>
				<p class="mx-auto mt-3 max-w-xl text-dark-400">
					Choose the model that fits your budget, timeline, and team structure.
				</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-{Math.min(engagements.length, 4)}">
				{#each engagements as model, i}
					<div
						class="rounded-2xl border border-dark-700 bg-dark-950 p-6 text-center transition-all hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5"
						use:tiltCard={{ maxTilt: 6 }}
						use:scrollReveal={{ delay: i * 0.1 }}
					>
						<div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br {accent} bg-opacity-10">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
						</div>
						<h3 class="font-semibold text-dark-100">{model}</h3>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Testimonials -->
{#if data.testimonials.length > 0}
	<section class="py-20 bg-dark-950">
		<div class="mx-auto max-w-5xl px-6">
			<div class="mb-12 text-center" use:scrollReveal>
				<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
					Client Stories
				</span>
				<h2 class="mt-3 text-3xl font-bold text-dark-100">What Our Clients Say</h2>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				{#each data.testimonials as testimonial, i}
					<div
						class="rounded-2xl border border-dark-700/50 bg-dark-900 p-6"
						use:scrollReveal={{ delay: i * 0.1 }}
					>
						<!-- Stars -->
						<div class="mb-4 flex gap-1">
							{#each Array(testimonial.rating ?? 5) as _}
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#00e5ff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
							{/each}
						</div>

						<blockquote class="text-dark-300 leading-relaxed italic">
							"{testimonial.quote}"
						</blockquote>

						<div class="mt-5 flex items-center gap-3 border-t border-dark-800 pt-5">
							<div class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br {accent} font-bold text-xs text-dark-950">
								{testimonial.authorName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
							</div>
							<div>
								<p class="text-sm font-semibold text-dark-100">{testimonial.authorName}</p>
								<p class="text-xs text-dark-500">{testimonial.authorTitle}, {testimonial.authorCompany}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Related Case Studies -->
{#if data.relatedCaseStudies.length > 0}
	<section class="py-20 bg-dark-900">
		<div class="mx-auto max-w-7xl px-6">
			<div class="mb-12 flex items-end justify-between" use:scrollReveal>
				<div>
					<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">Case Studies</span>
					<h2 class="mt-3 text-3xl font-bold text-dark-100">Results We've Delivered</h2>
				</div>
				<a href="/case-studies" class="text-sm text-accent-cyan hover:underline hidden sm:block">
					View all →
				</a>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each data.relatedCaseStudies as study, i}
					{@const metrics = study.metrics ? JSON.parse(study.metrics) : []}
					<a
						href="/case-studies/{study.slug}"
						class="group overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-950 transition-all hover:border-accent-cyan/30"
						use:scrollReveal={{ delay: i * 0.1 }}
					>
						<div class="h-28 bg-gradient-to-br {study.coverGradient || 'from-dark-800 to-dark-700'} p-5">
							<p class="text-xs font-semibold text-white/60 uppercase tracking-widest">{study.industry}</p>
							<p class="mt-1 font-bold text-white">{study.client}</p>
						</div>
						<div class="p-5">
							<h3 class="font-semibold text-dark-100 group-hover:text-accent-cyan transition-colors line-clamp-2">{study.title}</h3>
							{#if metrics.length > 0}
								<div class="mt-3 flex flex-wrap gap-2">
									{#each metrics.slice(0, 2) as m}
										<span class="rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-2.5 py-0.5 text-xs font-semibold text-accent-cyan">{m.value} {m.label}</span>
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

<!-- Other Services -->
{#if data.otherServices.length > 0}
	<section class="py-20 bg-dark-950">
		<div class="mx-auto max-w-7xl px-6">
			<div class="mb-10" use:scrollReveal>
				<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">Explore More</span>
				<h2 class="mt-3 text-2xl font-bold text-dark-100">Other Services</h2>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each data.otherServices as svc, i}
					<a
						href="/services/{svc.slug}"
						class="group rounded-xl border border-dark-700 bg-dark-900 p-5 transition-all hover:border-accent-cyan/30 hover:shadow-md hover:shadow-accent-cyan/5"
						use:scrollReveal={{ delay: i * 0.07 }}
					>
						<div class="mb-3 inline-flex items-center justify-center rounded-lg bg-dark-800 p-2.5 text-accent-cyan group-hover:bg-accent-cyan/10 transition-colors">
							{@html getIcon(svc.icon).replace(/width="\d+"/, 'width="20"').replace(/height="\d+"/, 'height="20"')}
						</div>
						<h3 class="font-semibold text-dark-100 group-hover:text-accent-cyan transition-colors text-sm">{svc.title}</h3>
						<p class="mt-1.5 text-xs text-dark-400 line-clamp-2">{svc.description}</p>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- CTA -->
<section class="py-24 bg-dark-900 relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 to-accent-blue/5"></div>
	<div class="relative mx-auto max-w-3xl px-6 text-center" use:scrollReveal>
		<h2 class="text-3xl font-bold text-dark-100 md:text-4xl">
			Ready to get started with<br />
			<span class="text-accent-cyan">{data.service.title}?</span>
		</h2>
		<p class="mt-4 text-lg text-dark-400">
			Speak with one of our specialists to understand how this service fits your specific environment and objectives.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<Button href="/contact?service={data.service.slug}" variant="primary" size="lg">
				Request a Consultation
			</Button>
			<Button href="/resources" variant="ghost" size="lg">
				Download Service Brief
			</Button>
		</div>
	</div>
</section>
