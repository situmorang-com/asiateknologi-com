<script lang="ts">
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { tiltCard } from '$lib/animations/actions/tiltCard';
	import { textScramble } from '$lib/animations/actions/textScramble';

	let { data } = $props();

	let activeCategory = $state('All');
	let emailInput = $state('');

	const filteredInsights = $derived(
		activeCategory === 'All'
			? data.insights
			: data.insights.filter((i: any) => i.category === activeCategory)
	);

	const featuredInsight = $derived(filteredInsights[0] ?? null);
	const gridInsights = $derived(filteredInsights.slice(1));

	const categoryColors: Record<string, string> = {
		IoT: 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
		'Healthcare Tech': 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
		'IT Strategy': 'text-accent-blue border-accent-blue/30 bg-accent-blue/10',
		'Industry 4.0': 'text-orange-400 border-orange-400/30 bg-orange-400/10',
		'IT Talent': 'text-accent-purple border-accent-purple/30 bg-accent-purple/10',
		Cybersecurity: 'text-red-400 border-red-400/30 bg-red-400/10'
	};

	function getCategoryColor(category: string): string {
		return categoryColors[category] ?? 'text-dark-400 border-dark-600 bg-dark-700/50';
	}

	function getAuthorInitials(name: string): string {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

	function formatDate(dateStr: string | null): string {
		if (!dateStr) return '';
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function handleSubscribe() {
		emailInput = '';
	}
</script>

<svelte:head>
	<title>Technology Insights - Asiateknologi</title>
	<meta
		name="description"
		content="Expert thought leadership on IoT, healthcare technology, IT strategy, Industry 4.0, cybersecurity and more from the Asiateknologi team."
	/>
	<meta property="og:title" content="Technology Insights - Asiateknologi" />
	<meta
		property="og:description"
		content="Expert thought leadership on IoT, healthcare technology, IT strategy, Industry 4.0, cybersecurity and more."
	/>
</svelte:head>

<!-- ===== HERO ===== -->
<section class="relative pt-32 pb-16 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<div
		class="absolute inset-0 opacity-5"
		style="background-image: radial-gradient(circle at 1px 1px, rgba(0,229,255,0.4) 1px, transparent 0); background-size: 32px 32px;"
	></div>
	<!-- Glow orbs -->
	<div
		class="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
		style="background: radial-gradient(circle, #00e5ff, transparent);"
	></div>
	<div
		class="absolute top-32 right-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl"
		style="background: radial-gradient(circle, #8b5cf6, transparent);"
	></div>

	<div class="relative mx-auto max-w-7xl px-6 text-center">
		<span
			class="mb-4 inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
			use:scrollReveal
		>
			Knowledge Hub
		</span>
		<h1
			class="text-4xl font-bold text-dark-100 md:text-6xl lg:text-7xl"
			use:textScramble
		>
			Technology <span class="text-accent-cyan">Insights</span>
		</h1>
		<p
			class="mt-6 mx-auto max-w-2xl text-xl text-dark-400 leading-relaxed"
			use:scrollReveal={{ delay: 0.2 }}
		>
			Expert perspectives on IoT, enterprise IT, and digital transformation — written by practitioners
			who build the solutions.
		</p>
	</div>
</section>

<!-- ===== CATEGORY FILTERS ===== -->
<section class="sticky top-16 z-30 bg-dark-950/90 backdrop-blur-md border-b border-dark-800">
	<div class="mx-auto max-w-7xl px-6">
		<div class="flex gap-1 overflow-x-auto py-3 scrollbar-none">
			{#each data.categories as category}
				<button
					onclick={() => (activeCategory = category)}
					class="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all {activeCategory ===
					category
						? 'bg-accent-cyan text-dark-950 font-semibold'
						: 'text-dark-400 hover:text-dark-100 hover:bg-dark-800'}"
				>
					{category}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- ===== ARTICLES ===== -->
<section class="py-16 bg-dark-950">
	<div class="mx-auto max-w-7xl px-6">
		{#if filteredInsights.length === 0}
			<div class="text-center py-24">
				<p class="text-dark-400 text-lg">No articles found in this category yet.</p>
			</div>
		{:else}
			<!-- Featured Article -->
			{#if featuredInsight}
				<div class="mb-16" use:scrollReveal>
					<a
						href="/insights/{featuredInsight.slug}"
						class="group block rounded-2xl overflow-hidden border border-dark-700/50 hover:border-accent-cyan/30 transition-all duration-500 relative"
						style="background: {featuredInsight.coverGradient ?? 'linear-gradient(135deg, #1a1a25, #252535)'};"
					>
						<!-- Overlay for readability -->
						<div
							class="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-dark-950/50 to-transparent"
						></div>
						<div
							class="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-transparent"
						></div>

						<div class="relative p-8 md:p-12 lg:p-16 min-h-[400px] flex flex-col justify-end">
							<!-- Featured label -->
							<div class="absolute top-6 left-6 md:top-8 md:left-10">
								<span
									class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-cyan text-dark-950"
								>
									Featured
								</span>
							</div>

							<div class="max-w-2xl">
								<span
									class="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold border {getCategoryColor(featuredInsight.category)}"
								>
									{featuredInsight.category}
								</span>

								<h2
									class="text-2xl md:text-4xl font-bold text-dark-100 group-hover:text-accent-cyan transition-colors leading-tight mb-4"
								>
									{featuredInsight.title}
								</h2>

								<p class="text-dark-300 text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
									{featuredInsight.excerpt}
								</p>

								<div class="flex items-center gap-6 text-sm text-dark-400">
									<div class="flex items-center gap-2">
										<div
											class="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center text-dark-950 font-bold text-xs"
										>
											{getAuthorInitials(featuredInsight.author)}
										</div>
										<div>
											<span class="text-dark-200 font-medium">{featuredInsight.author}</span>
											{#if featuredInsight.authorRole}
												<span class="text-dark-500 ml-1">· {featuredInsight.authorRole}</span>
											{/if}
										</div>
									</div>
									<span class="flex items-center gap-1">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
										{featuredInsight.readTime} min read
									</span>
									{#if featuredInsight.publishedAt}
										<span>{formatDate(featuredInsight.publishedAt)}</span>
									{/if}
								</div>
							</div>

							<!-- Arrow -->
							<div
								class="absolute right-8 bottom-8 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300"
							>
								<div
									class="w-10 h-10 rounded-full bg-accent-cyan/20 border border-accent-cyan/40 flex items-center justify-center"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
								</div>
							</div>
						</div>
					</a>
				</div>
			{/if}

			<!-- Articles Grid -->
			{#if gridInsights.length > 0}
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each gridInsights as insight, i}
						<a
							href="/insights/{insight.slug}"
							class="group flex flex-col rounded-xl border border-dark-700/50 bg-dark-900 overflow-hidden hover:border-accent-cyan/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-cyan/5"
							use:scrollReveal={{ delay: i * 0.08 }}
							use:tiltCard={{ max: 4 }}
						>
							<!-- Gradient top accent band -->
							<div
								class="h-1.5 w-full"
								style="background: {insight.coverGradient ?? 'linear-gradient(90deg, #00e5ff, #3b82f6)'};"
							></div>

							<div class="flex flex-col flex-1 p-6">
								<!-- Category badge -->
								<span
									class="self-start mb-4 px-2.5 py-1 rounded-full text-xs font-semibold border {getCategoryColor(insight.category)}"
								>
									{insight.category}
								</span>

								<!-- Title -->
								<h3
									class="text-lg font-semibold text-dark-100 group-hover:text-accent-cyan transition-colors leading-snug mb-3 flex-grow"
								>
									{insight.title}
								</h3>

								<!-- Excerpt -->
								<p class="text-sm text-dark-400 leading-relaxed line-clamp-2 mb-6">
									{insight.excerpt}
								</p>

								<!-- Author + meta -->
								<div class="flex items-center justify-between mt-auto pt-4 border-t border-dark-800">
									<div class="flex items-center gap-2">
										<div
											class="w-7 h-7 rounded-full bg-gradient-to-br from-accent-purple/60 to-accent-blue/60 flex items-center justify-center text-dark-100 font-bold text-xs flex-shrink-0"
										>
											{getAuthorInitials(insight.author)}
										</div>
										<div class="min-w-0">
											<p class="text-xs font-medium text-dark-200 truncate">{insight.author}</p>
											{#if insight.authorRole}
												<p class="text-xs text-dark-500 truncate">{insight.authorRole}</p>
											{/if}
										</div>
									</div>
									<div class="flex items-center gap-3 text-xs text-dark-500 flex-shrink-0 ml-2">
										<span class="flex items-center gap-1">
											<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
											{insight.readTime}m
										</span>
										{#if insight.publishedAt}
											<span class="hidden sm:block">{formatDate(insight.publishedAt)}</span>
										{/if}
									</div>
								</div>

								<!-- Read Article link (hover reveal) -->
								<div
									class="flex items-center gap-1 text-xs font-semibold text-accent-cyan mt-3 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-200"
								>
									Read Article
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</section>

<!-- ===== NEWSLETTER SIGNUP ===== -->
<section class="py-24 bg-dark-900">
	<div class="mx-auto max-w-3xl px-6 text-center" use:scrollReveal>
		<span
			class="mb-4 inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
		>
			Stay Updated
		</span>
		<h2 class="text-3xl font-bold text-dark-100 md:text-4xl">
			Get the latest insights
			<span class="text-accent-cyan"> delivered to your inbox</span>
		</h2>
		<p class="mt-4 text-dark-400 text-lg">
			Join technology leaders receiving expert analysis on IoT, digital transformation, and
			enterprise IT strategy.
		</p>

		<form
			class="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
			onsubmit={(e) => {
				e.preventDefault();
				handleSubscribe();
			}}
		>
			<input
				type="email"
				bind:value={emailInput}
				placeholder="your@email.com"
				required
				class="flex-1 px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-dark-100 placeholder-dark-500 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/30 transition-colors"
			/>
			<Button type="submit" variant="primary" size="lg">Subscribe</Button>
		</form>

		<p class="mt-4 text-xs text-dark-500">No spam, ever. Unsubscribe at any time.</p>
	</div>
</section>
