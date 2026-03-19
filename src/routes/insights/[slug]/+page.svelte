<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { tiltCard } from '$lib/animations/actions/tiltCard';

	let { data } = $props();

	const insight = $derived(data.insight);
	const related = $derived(data.related);

	// ── Markdown renderer ──────────────────────────────────────────────────────
	function renderMarkdown(text: string): string {
		if (!text) return '';

		// Escape HTML to prevent XSS, then selectively allow rendered tags
		const escape = (s: string) =>
			s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

		const lines = text.split('\n');
		const output: string[] = [];
		let inList = false;

		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];

			// ## Heading 2
			if (/^## (.+)$/.test(line)) {
				if (inList) { output.push('</ul>'); inList = false; }
				const content = escape(line.replace(/^## /, ''));
				const id = content.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
				output.push(`<h2 id="${id}" class="text-2xl font-bold text-dark-100 mt-10 mb-4">${content}</h2>`);
				continue;
			}

			// ### Heading 3
			if (/^### (.+)$/.test(line)) {
				if (inList) { output.push('</ul>'); inList = false; }
				const content = escape(line.replace(/^### /, ''));
				output.push(`<h3 class="text-xl font-semibold text-dark-100 mt-8 mb-3">${content}</h3>`);
				continue;
			}

			// - Bullet list item
			if (/^- (.+)$/.test(line)) {
				if (!inList) { output.push('<ul class="my-4 space-y-2 list-none pl-0">'); inList = true; }
				const content = inlineParse(escape(line.replace(/^- /, '')));
				output.push(`<li class="flex gap-3 text-dark-300"><span class="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent-cyan"></span><span>${content}</span></li>`);
				continue;
			}

			// Close list if we leave bullet territory
			if (inList && line.trim() !== '') {
				output.push('</ul>');
				inList = false;
			}

			// Blank line
			if (line.trim() === '') {
				if (inList) { output.push('</ul>'); inList = false; }
				continue;
			}

			// Regular paragraph
			const parsed = inlineParse(escape(line));
			output.push(`<p class="text-dark-300 leading-relaxed mb-4">${parsed}</p>`);
		}

		if (inList) output.push('</ul>');

		return output.join('\n');
	}

	function inlineParse(text: string): string {
		// **bold**
		text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-dark-100 font-semibold">$1</strong>');
		// *italic*
		text = text.replace(/\*(.+?)\*/g, '<em class="text-dark-200 italic">$1</em>');
		// `code`
		text = text.replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-dark-800 text-accent-cyan font-mono text-sm">$1</code>');
		return text;
	}

	// ── Table of contents ──────────────────────────────────────────────────────
	const tocHeadings = $derived(
		(insight.content ?? '')
			.split('\n')
			.filter((line: string) => /^## .+/.test(line))
			.map((line: string) => {
				const title = line.replace(/^## /, '');
				const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
				return { title, id };
			})
	);

	const renderedContent = $derived(renderMarkdown(insight.content ?? ''));

	// ── Helpers ────────────────────────────────────────────────────────────────
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
			month: 'long',
			day: 'numeric'
		});
	}

	const tags = $derived(() => {
		try {
			return insight.tags ? JSON.parse(insight.tags) : [];
		} catch {
			return [];
		}
	});
</script>

<svelte:head>
	<title>{insight.title} - Asiateknologi Insights</title>
	<meta name="description" content={insight.excerpt} />
	<meta property="og:title" content="{insight.title} - Asiateknologi" />
	<meta property="og:description" content={insight.excerpt} />
	<meta property="og:type" content="article" />
	{#if insight.coverGradient}
		<meta property="og:image" content="https://asiateknologi.com/og/insights/{insight.slug}" />
	{/if}
	<meta name="author" content={insight.author} />
	{#if insight.publishedAt}
		<meta property="article:published_time" content={insight.publishedAt} />
	{/if}
</svelte:head>

<!-- ===== ARTICLE HEADER ===== -->
<section class="relative pt-28 pb-12 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<!-- Gradient accent from coverGradient -->
	<div
		class="absolute inset-0 opacity-15"
		style="background: {insight.coverGradient ?? 'linear-gradient(135deg, transparent, transparent)'};"
	></div>
	<div
		class="absolute inset-0 opacity-5"
		style="background-image: radial-gradient(circle at 1px 1px, rgba(0,229,255,0.4) 1px, transparent 0); background-size: 32px 32px;"
	></div>

	<div class="relative mx-auto max-w-7xl px-6">
		<!-- Breadcrumb -->
		<nav class="flex items-center gap-2 text-sm text-dark-500 mb-8" use:scrollReveal>
			<a href="/" class="hover:text-accent-cyan transition-colors">Home</a>
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
			<a href="/insights" class="hover:text-accent-cyan transition-colors">Insights</a>
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
			<span class="text-dark-400 truncate max-w-xs">{insight.title}</span>
		</nav>

		<div class="max-w-3xl">
			<!-- Category badge -->
			<span
				class="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold border {getCategoryColor(insight.category)}"
				use:scrollReveal
			>
				{insight.category}
			</span>

			<!-- Title -->
			<h1
				class="text-3xl md:text-5xl font-bold text-dark-100 leading-tight mb-6"
				use:textScramble
			>
				{insight.title}
			</h1>

			<!-- Author info row -->
			<div
				class="flex flex-wrap items-center gap-4 text-sm text-dark-400"
				use:scrollReveal={{ delay: 0.2 }}
			>
				<div class="flex items-center gap-2.5">
					<div
						class="w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center text-dark-950 font-bold text-sm flex-shrink-0"
					>
						{getAuthorInitials(insight.author)}
					</div>
					<div>
						<p class="font-medium text-dark-200">{insight.author}</p>
						{#if insight.authorRole}
							<p class="text-xs text-dark-500">{insight.authorRole}</p>
						{/if}
					</div>
				</div>

				<div class="flex items-center gap-1 text-dark-500">
					<span>·</span>
				</div>

				<span class="flex items-center gap-1.5">
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
					{insight.readTime} min read
				</span>

				{#if insight.publishedAt}
					<span class="flex items-center gap-1.5">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
						{formatDate(insight.publishedAt)}
					</span>
				{/if}

				<!-- Share buttons (visual only) -->
				<div class="ml-auto flex items-center gap-2">
					<span class="text-xs text-dark-500 mr-1">Share:</span>
					<button
						class="w-8 h-8 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center text-dark-400 hover:text-accent-cyan hover:border-accent-cyan/30 transition-colors"
						title="Share on X"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.735-8.848L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
					</button>
					<button
						class="w-8 h-8 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center text-dark-400 hover:text-accent-blue hover:border-accent-blue/30 transition-colors"
						title="Share on LinkedIn"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
					</button>
					<button
						class="w-8 h-8 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center text-dark-400 hover:text-dark-100 hover:border-dark-600 transition-colors"
						title="Copy link"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
					</button>
				</div>
			</div>

			<!-- Tags -->
			{#if tags().length > 0}
				<div class="flex flex-wrap gap-2 mt-5" use:scrollReveal={{ delay: 0.3 }}>
					{#each tags() as tag}
						<span
							class="px-2.5 py-1 rounded-md text-xs font-medium bg-dark-800 border border-dark-700 text-dark-400"
						>
							#{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- ===== ARTICLE BODY + TOC ===== -->
<section class="py-12 bg-dark-950">
	<div class="mx-auto max-w-7xl px-6">
		<div class="flex gap-12">
			<!-- Main content -->
			<article class="min-w-0 max-w-3xl flex-1">
				<div class="prose-content" use:scrollReveal>
					{@html renderedContent}
				</div>
			</article>

			<!-- Table of Contents (desktop only) -->
			{#if tocHeadings.length > 0}
				<aside class="hidden xl:block w-64 flex-shrink-0">
					<div class="sticky top-28">
						<div
							class="rounded-xl border border-dark-700/50 bg-dark-900 p-5"
							use:scrollReveal={{ delay: 0.3 }}
						>
							<h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-dark-500 mb-4">
								Contents
							</h4>
							<nav class="space-y-1">
								{#each tocHeadings as heading}
									<a
										href="#{heading.id}"
										class="block text-sm text-dark-400 hover:text-accent-cyan py-1 pl-3 border-l-2 border-dark-700 hover:border-accent-cyan transition-all leading-snug"
									>
										{heading.title}
									</a>
								{/each}
							</nav>
						</div>

						<!-- Back to insights -->
						<a
							href="/insights"
							class="mt-4 flex items-center gap-2 text-sm text-dark-500 hover:text-accent-cyan transition-colors"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
							All Insights
						</a>
					</div>
				</aside>
			{/if}
		</div>
	</div>
</section>

<!-- ===== AUTHOR BIO ===== -->
<section class="py-12 bg-dark-900">
	<div class="mx-auto max-w-3xl px-6" use:scrollReveal>
		<div class="rounded-xl border border-dark-700/50 bg-dark-800/50 p-6 flex gap-5">
			<div
				class="w-14 h-14 rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center text-dark-950 font-bold text-lg flex-shrink-0"
			>
				{getAuthorInitials(insight.author)}
			</div>
			<div>
				<p class="text-sm font-semibold uppercase tracking-wider text-accent-cyan mb-1">
					About the Author
				</p>
				<h3 class="text-lg font-bold text-dark-100">{insight.author}</h3>
				{#if insight.authorRole}
					<p class="text-sm text-dark-400 mb-3">{insight.authorRole} at Asiateknologi</p>
				{/if}
				<p class="text-sm text-dark-400 leading-relaxed">
					A technology practitioner at Asiateknologi with expertise in enterprise IT, IoT solutions,
					and digital transformation across Asia-Pacific markets.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ===== RELATED ARTICLES ===== -->
{#if related.length > 0}
	<section class="py-20 bg-dark-950">
		<div class="mx-auto max-w-7xl px-6">
			<h2 class="text-2xl font-bold text-dark-100 mb-8" use:scrollReveal>
				More in <span class="text-accent-cyan">{insight.category}</span>
			</h2>

			<div class="grid gap-6 md:grid-cols-3">
				{#each related as article, i}
					<a
						href="/insights/{article.slug}"
						class="group flex flex-col rounded-xl border border-dark-700/50 bg-dark-900 overflow-hidden hover:border-accent-cyan/30 transition-all duration-300 hover:-translate-y-1"
						use:scrollReveal={{ delay: i * 0.1 }}
						use:tiltCard={{ max: 4 }}
					>
						<div
							class="h-1.5 w-full"
							style="background: {article.coverGradient ?? 'linear-gradient(90deg, #00e5ff, #3b82f6)'};"
						></div>
						<div class="p-5 flex flex-col flex-1">
							<span
								class="self-start mb-3 px-2.5 py-1 rounded-full text-xs font-semibold border {getCategoryColor(article.category)}"
							>
								{article.category}
							</span>
							<h3
								class="text-base font-semibold text-dark-100 group-hover:text-accent-cyan transition-colors leading-snug flex-grow mb-3"
							>
								{article.title}
							</h3>
							<p class="text-sm text-dark-500 line-clamp-2 mb-4">{article.excerpt}</p>
							<div class="flex items-center justify-between text-xs text-dark-500 mt-auto pt-3 border-t border-dark-800">
								<span>{article.author}</span>
								<span class="flex items-center gap-1">
									<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
									{article.readTime} min
								</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- ===== CTA ===== -->
<section class="py-24 bg-dark-900">
	<div class="mx-auto max-w-3xl px-6 text-center" use:scrollReveal>
		<div
			class="rounded-2xl border border-dark-700/50 bg-dark-800/50 p-10 md:p-14 relative overflow-hidden"
		>
			<div
				class="absolute inset-0 opacity-10"
				style="background: linear-gradient(135deg, #00e5ff20, #3b82f620, #8b5cf620);"
			></div>
			<div class="relative">
				<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
					Let's Talk
				</span>
				<h2 class="mt-4 text-2xl md:text-3xl font-bold text-dark-100">
					Have a technology challenge?
					<span class="text-accent-cyan"> Let's discuss it.</span>
				</h2>
				<p class="mt-4 text-dark-400 max-w-lg mx-auto">
					Our specialists are ready to help you navigate complex technology decisions and design
					solutions that deliver results.
				</p>
				<div class="mt-8 flex flex-wrap gap-4 justify-center">
					<Button href="/contact" variant="primary" size="lg">Start a Conversation</Button>
					<Button href="/insights" variant="secondary" size="lg">More Insights</Button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Prose content styles applied to the rendered markdown */
	:global(.prose-content h2) {
		border-left: 3px solid #00e5ff;
		padding-left: 1rem;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
	}

	:global(.prose-content ul) {
		border-left: 1px solid #35354a;
		padding-left: 1.25rem;
		margin-left: 0.25rem;
	}

	:global(.prose-content p + p) {
		margin-top: 0;
	}

	:global(.prose-content > *:first-child) {
		margin-top: 0;
	}
</style>
