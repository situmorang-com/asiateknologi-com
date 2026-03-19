<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<div class="mb-4 flex items-center justify-between">
	<p class="text-sm text-dark-400">{data.insights.length} articles</p>
</div>

{#if data.insights.length === 0}
	<div class="rounded-xl border border-dark-700/50 bg-dark-900 p-12 text-center text-dark-400">
		No insights articles found.
	</div>
{:else}
	<div class="overflow-hidden rounded-xl border border-dark-700/50 bg-dark-900">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-dark-800 text-left text-dark-500">
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider">Title</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Author</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Published</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider">Status</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.insights as article}
					<tr class="border-b border-dark-800/50 hover:bg-dark-800/20 transition-colors">
						<td class="px-4 py-3">
							<a
								href="/insights/{article.slug}"
								target="_blank"
								class="font-medium text-dark-100 hover:text-accent-cyan transition-colors line-clamp-1"
							>
								{article.title}
							</a>
							<p class="mt-0.5 text-xs text-dark-500 line-clamp-1">{article.excerpt}</p>
						</td>
						<td class="px-4 py-3 hidden md:table-cell">
							<span class="rounded-full border border-dark-700 bg-dark-800 px-2 py-0.5 text-xs text-dark-400">
								{article.category}
							</span>
						</td>
						<td class="px-4 py-3 text-dark-400 hidden lg:table-cell">{article.author}</td>
						<td class="px-4 py-3 text-dark-400 hidden lg:table-cell font-mono text-xs">
							{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-GB') : '—'}
						</td>
						<td class="px-4 py-3">
							{#if article.isPublished}
								<span class="rounded-full bg-accent-green/10 px-2 py-0.5 text-xs font-semibold text-accent-green">Published</span>
							{:else}
								<span class="rounded-full bg-dark-800 px-2 py-0.5 text-xs text-dark-500">Draft</span>
							{/if}
						</td>
						<td class="px-4 py-3">
							<form method="POST" action="?/togglePublish" use:enhance>
								<input type="hidden" name="id" value={article.id} />
								<input type="hidden" name="isPublished" value={article.isPublished} />
								<button
									type="submit"
									class="rounded px-2 py-1 text-xs text-dark-400 hover:bg-dark-800 hover:text-dark-200 transition-colors"
								>
									{article.isPublished ? 'Unpublish' : 'Publish'}
								</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
