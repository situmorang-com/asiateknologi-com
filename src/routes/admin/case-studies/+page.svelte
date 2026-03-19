<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<div class="mb-4 flex items-center justify-between">
	<p class="text-sm text-dark-400">{data.caseStudies.length} case studies</p>
</div>

{#if data.caseStudies.length === 0}
	<div class="rounded-xl border border-dark-700/50 bg-dark-900 p-12 text-center text-dark-400">
		No case studies found.
	</div>
{:else}
	<div class="overflow-hidden rounded-xl border border-dark-700/50 bg-dark-900">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-dark-800 text-left text-dark-500">
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider">Title</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Client</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Industry</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Published</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider">Featured</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.caseStudies as study}
					<tr class="border-b border-dark-800/50 hover:bg-dark-800/20 transition-colors">
						<td class="px-4 py-3">
							<a
								href="/case-studies/{study.slug}"
								target="_blank"
								class="font-medium text-dark-100 hover:text-accent-cyan transition-colors line-clamp-1"
							>
								{study.title}
							</a>
						</td>
						<td class="px-4 py-3 text-dark-400 hidden md:table-cell">{study.client}</td>
						<td class="px-4 py-3 hidden md:table-cell">
							<span class="rounded-full border border-dark-700 bg-dark-800 px-2 py-0.5 text-xs text-dark-400">
								{study.industry}
							</span>
						</td>
						<td class="px-4 py-3 text-dark-400 hidden lg:table-cell font-mono text-xs">
							{study.publishedAt ? new Date(study.publishedAt).toLocaleDateString('en-GB') : '—'}
						</td>
						<td class="px-4 py-3">
							{#if study.featured}
								<span class="rounded-full bg-accent-cyan/10 px-2 py-0.5 text-xs font-semibold text-accent-cyan">Featured</span>
							{:else}
								<span class="rounded-full bg-dark-800 px-2 py-0.5 text-xs text-dark-500">Standard</span>
							{/if}
						</td>
						<td class="px-4 py-3">
							<form method="POST" action="?/toggleFeatured" use:enhance>
								<input type="hidden" name="id" value={study.id} />
								<input type="hidden" name="featured" value={study.featured} />
								<button
									type="submit"
									class="rounded px-2 py-1 text-xs text-dark-400 hover:bg-dark-800 hover:text-dark-200 transition-colors"
								>
									{study.featured ? 'Unfeature' : 'Feature'}
								</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
