<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	let expandedId = $state<number | null>(null);
</script>

<div class="mb-4 flex items-center justify-between">
	<p class="text-sm text-dark-400">{data.total} total submissions</p>
</div>

{#if data.contacts.length === 0}
	<div class="rounded-xl border border-dark-700/50 bg-dark-900 p-12 text-center text-dark-400">
		No contact submissions yet.
	</div>
{:else}
	<div class="overflow-hidden rounded-xl border border-dark-700/50 bg-dark-900">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-dark-800 text-left text-dark-400">
					<th class="px-4 py-3 font-medium">Status</th>
					<th class="px-4 py-3 font-medium">Name</th>
					<th class="px-4 py-3 font-medium">Email</th>
					<th class="px-4 py-3 font-medium hidden md:table-cell">Company</th>
					<th class="px-4 py-3 font-medium hidden lg:table-cell">Service</th>
					<th class="px-4 py-3 font-medium hidden lg:table-cell">Date</th>
					<th class="px-4 py-3 font-medium">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.contacts as contact}
					<tr
						class="border-b border-dark-800/50 transition-colors {contact.isRead ? '' : 'bg-accent-cyan/[0.02]'} hover:bg-dark-800/30 cursor-pointer"
						onclick={() => (expandedId = expandedId === contact.id ? null : contact.id)}
					>
						<td class="px-4 py-3">
							{#if contact.isRead}
								<span class="rounded-full bg-dark-800 px-2 py-0.5 text-xs text-dark-400">Read</span>
							{:else}
								<span class="rounded-full bg-accent-cyan/10 px-2 py-0.5 text-xs text-accent-cyan">New</span>
							{/if}
						</td>
						<td class="px-4 py-3 font-medium text-dark-100">{contact.name}</td>
						<td class="px-4 py-3 text-dark-400">{contact.email}</td>
						<td class="px-4 py-3 text-dark-400 hidden md:table-cell">{contact.company || '-'}</td>
						<td class="px-4 py-3 text-dark-400 hidden lg:table-cell">{contact.serviceInterest || '-'}</td>
						<td class="px-4 py-3 text-dark-400 hidden lg:table-cell">
							{contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : '-'}
						</td>
						<td class="px-4 py-3">
							<div class="flex items-center gap-2" onclick={(e) => e.stopPropagation()}>
								<form method="POST" action="?/toggleRead" use:enhance>
									<input type="hidden" name="id" value={contact.id} />
									<input type="hidden" name="isRead" value={contact.isRead} />
									<button
										type="submit"
										class="rounded px-2 py-1 text-xs text-dark-400 hover:bg-dark-800 hover:text-dark-200 transition-colors"
										title={contact.isRead ? 'Mark unread' : 'Mark read'}
									>
										{contact.isRead ? 'Unread' : 'Read'}
									</button>
								</form>
								<form method="POST" action="?/delete" use:enhance>
									<input type="hidden" name="id" value={contact.id} />
									<button
										type="submit"
										class="rounded px-2 py-1 text-xs text-dark-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
										onclick={(e) => { if (!confirm('Delete this submission?')) e.preventDefault(); }}
									>
										Delete
									</button>
								</form>
							</div>
						</td>
					</tr>
					{#if expandedId === contact.id}
						<tr class="bg-dark-800/20">
							<td colspan="7" class="px-4 py-4">
								<div class="grid gap-4 md:grid-cols-2">
									{#if contact.phone}
										<div>
											<span class="text-xs text-dark-500">Phone</span>
											<p class="text-dark-200">{contact.phone}</p>
										</div>
									{/if}
									<div class="md:col-span-2">
										<span class="text-xs text-dark-500">Message</span>
										<p class="mt-1 whitespace-pre-wrap text-dark-200">{contact.message}</p>
									</div>
								</div>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Pagination -->
	{#if data.totalPages > 1}
		<div class="mt-6 flex items-center justify-center gap-2">
			{#each Array.from({ length: data.totalPages }, (_, i) => i + 1) as p}
				<a
					href="/admin/contacts?page={p}"
					class="rounded-lg px-3 py-1.5 text-sm transition-colors {p === data.page
						? 'bg-accent-cyan/10 text-accent-cyan'
						: 'text-dark-400 hover:bg-dark-800'}"
				>
					{p}
				</a>
			{/each}
		</div>
	{/if}
{/if}
