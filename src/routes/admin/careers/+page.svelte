<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	const activeCount = $derived(data.careers.filter((c: { isActive: number }) => c.isActive).length);
</script>

<div class="mb-4 flex items-center justify-between">
	<p class="text-sm text-dark-400">{activeCount} active of {data.careers.length} positions</p>
</div>

{#if data.careers.length === 0}
	<div class="rounded-xl border border-dark-700/50 bg-dark-900 p-12 text-center text-dark-400">
		No career listings found.
	</div>
{:else}
	<div class="overflow-hidden rounded-xl border border-dark-700/50 bg-dark-900">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-dark-800 text-left text-dark-500">
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider">Position</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Department</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Type</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Location</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider">Status</th>
					<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.careers as job}
					<tr class="border-b border-dark-800/50 hover:bg-dark-800/20 transition-colors {!job.isActive ? 'opacity-50' : ''}">
						<td class="px-4 py-3">
							<a
								href="/careers/{job.slug}"
								target="_blank"
								class="font-medium text-dark-100 hover:text-accent-cyan transition-colors"
							>
								{job.title}
							</a>
						</td>
						<td class="px-4 py-3 hidden md:table-cell">
							<span class="rounded-full border border-dark-700 bg-dark-800 px-2 py-0.5 text-xs text-dark-400">
								{job.department}
							</span>
						</td>
						<td class="px-4 py-3 text-dark-400 hidden md:table-cell">{job.type}</td>
						<td class="px-4 py-3 text-dark-400 hidden lg:table-cell">{job.location}</td>
						<td class="px-4 py-3">
							{#if job.isActive}
								<span class="rounded-full bg-accent-green/10 px-2 py-0.5 text-xs font-semibold text-accent-green">Active</span>
							{:else}
								<span class="rounded-full bg-dark-800 px-2 py-0.5 text-xs text-dark-500">Closed</span>
							{/if}
						</td>
						<td class="px-4 py-3">
							<form method="POST" action="?/toggleActive" use:enhance>
								<input type="hidden" name="id" value={job.id} />
								<input type="hidden" name="isActive" value={job.isActive} />
								<button
									type="submit"
									class="rounded px-2 py-1 text-xs text-dark-400 hover:bg-dark-800 hover:text-dark-200 transition-colors"
								>
									{job.isActive ? 'Close' : 'Reopen'}
								</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
