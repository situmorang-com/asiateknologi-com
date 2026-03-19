<script lang="ts">
	let { data } = $props();
</script>

<!-- Stat cards -->
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
	<!-- Contacts: Total -->
	<div class="rounded-xl border border-dark-700/50 bg-dark-900 p-5 xl:col-span-2">
		<div class="flex items-start justify-between">
			<div>
				<p class="text-xs text-dark-500 uppercase tracking-wider font-mono">Total Inquiries</p>
				<p class="mt-2 text-3xl font-bold text-dark-100">{data.stats.total}</p>
			</div>
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-dark-800 text-dark-400">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
			</div>
		</div>
		<p class="mt-3 text-xs text-dark-500">{data.stats.monthly} this month</p>
	</div>

	<!-- Contacts: Unread -->
	<div class="rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-5 xl:col-span-2">
		<div class="flex items-start justify-between">
			<div>
				<p class="text-xs text-accent-cyan/70 uppercase tracking-wider font-mono">Unread</p>
				<p class="mt-2 text-3xl font-bold text-accent-cyan">{data.stats.unread}</p>
			</div>
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
			</div>
		</div>
		{#if data.stats.unread > 0}
			<a href="/admin/contacts" class="mt-3 block text-xs text-accent-cyan/70 hover:text-accent-cyan transition-colors">
				View unread →
			</a>
		{:else}
			<p class="mt-3 text-xs text-dark-500">All caught up</p>
		{/if}
	</div>

	<!-- Content Stats -->
	<div class="rounded-xl border border-dark-700/50 bg-dark-900 p-5 xl:col-span-2">
		<p class="text-xs text-dark-500 uppercase tracking-wider font-mono mb-3">Content Overview</p>
		<div class="space-y-2">
			<div class="flex items-center justify-between text-sm">
				<span class="text-dark-400">Insights Published</span>
				<span class="font-semibold text-dark-200">{data.stats.insights}</span>
			</div>
			<div class="flex items-center justify-between text-sm">
				<span class="text-dark-400">Case Studies</span>
				<span class="font-semibold text-dark-200">{data.stats.caseStudies}</span>
			</div>
			<div class="flex items-center justify-between text-sm">
				<span class="text-dark-400">Open Positions</span>
				<span class="font-semibold text-dark-200">{data.stats.careers}</span>
			</div>
		</div>
	</div>
</div>

<!-- Quick actions -->
<div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
	{#each [
		{ href: '/admin/contacts', label: 'Manage Contacts', desc: 'View and respond to inquiries', color: 'text-accent-cyan', bg: 'bg-accent-cyan/5 border-accent-cyan/20' },
		{ href: '/admin/insights', label: 'Manage Insights', desc: 'Edit blog posts and articles', color: 'text-accent-blue', bg: 'bg-accent-blue/5 border-accent-blue/20' },
		{ href: '/admin/case-studies', label: 'Case Studies', desc: 'Update client success stories', color: 'text-accent-purple', bg: 'bg-accent-purple/5 border-accent-purple/20' },
		{ href: '/admin/careers', label: 'Job Listings', desc: 'Manage open positions', color: 'text-accent-green', bg: 'bg-accent-green/5 border-accent-green/20' }
	] as action}
		<a href={action.href} class="group rounded-xl border {action.bg} p-4 transition-all hover:scale-[1.02]">
			<p class="font-semibold {action.color}">{action.label}</p>
			<p class="mt-1 text-xs text-dark-500">{action.desc}</p>
		</a>
	{/each}
</div>

<!-- Recent contacts table -->
<div class="mt-8">
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-sm font-semibold text-dark-200 uppercase tracking-wider">Recent Inquiries</h2>
		<a href="/admin/contacts" class="text-xs text-accent-cyan hover:underline">View all</a>
	</div>

	{#if data.recentContacts.length === 0}
		<div class="rounded-xl border border-dark-700/50 bg-dark-900 p-12 text-center text-dark-400">
			No contact submissions yet.
		</div>
	{:else}
		<div class="overflow-hidden rounded-xl border border-dark-700/50 bg-dark-900">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-dark-800 text-left text-dark-500">
						<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider">Name</th>
						<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider">Email</th>
						<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Service</th>
						<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Date</th>
						<th class="px-4 py-3 font-medium text-xs uppercase tracking-wider">Status</th>
					</tr>
				</thead>
				<tbody>
					{#each data.recentContacts as contact}
						<tr class="border-b border-dark-800/50 hover:bg-dark-800/30 transition-colors">
							<td class="px-4 py-3 font-medium text-dark-100">{contact.name}</td>
							<td class="px-4 py-3 text-dark-400 font-mono text-xs">{contact.email}</td>
							<td class="px-4 py-3 text-dark-400 hidden md:table-cell">{contact.serviceInterest || '—'}</td>
							<td class="px-4 py-3 text-dark-400 hidden lg:table-cell font-mono text-xs">
								{contact.createdAt ? new Date(contact.createdAt).toLocaleDateString('en-GB') : '—'}
							</td>
							<td class="px-4 py-3">
								{#if contact.isRead}
									<span class="rounded-full bg-dark-800 px-2 py-0.5 text-xs text-dark-500">Read</span>
								{:else}
									<span class="rounded-full bg-accent-cyan/10 px-2 py-0.5 text-xs font-semibold text-accent-cyan">New</span>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
