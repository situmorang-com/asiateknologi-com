<script lang="ts">
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const isLogin = $derived($page.url.pathname === '/admin/login');

	const navGroups = [
		{
			label: 'Overview',
			links: [
				{
					href: '/admin',
					label: 'Dashboard',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
					exact: true
				}
			]
		},
		{
			label: 'Content',
			links: [
				{
					href: '/admin/contacts',
					label: 'Contacts',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
					exact: false
				},
				{
					href: '/admin/insights',
					label: 'Insights',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>`,
					exact: false
				},
				{
					href: '/admin/case-studies',
					label: 'Case Studies',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
					exact: false
				},
				{
					href: '/admin/careers',
					label: 'Careers',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
					exact: false
				}
			]
		}
	];

	const pageTitle = $derived(() => {
		const p = $page.url.pathname;
		if (p === '/admin') return 'Dashboard';
		if (p.startsWith('/admin/contacts')) return 'Contact Submissions';
		if (p.startsWith('/admin/insights')) return 'Insights';
		if (p.startsWith('/admin/case-studies')) return 'Case Studies';
		if (p.startsWith('/admin/careers')) return 'Careers';
		return 'Admin';
	});
</script>

{#if isLogin}
	{@render children()}
{:else}
	<div class="flex min-h-screen bg-dark-950">
		<!-- Sidebar -->
		<aside class="hidden w-60 border-r border-dark-800 bg-dark-900 lg:flex lg:flex-col">
			<!-- Logo -->
			<div class="flex h-16 items-center gap-3 border-b border-dark-800 px-5">
				<div class="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent-cyan to-accent-blue text-dark-950 font-bold text-xs">
					AT
				</div>
				<span class="font-mono text-sm font-semibold text-dark-200">Admin Panel</span>
			</div>

			<!-- Nav -->
			<nav class="flex-1 overflow-y-auto py-4 px-3">
				{#each navGroups as group}
					<div class="mb-5">
						<p class="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-dark-600">
							{group.label}
						</p>
						{#each group.links as link}
							{@const isActive = link.exact
								? $page.url.pathname === link.href
								: $page.url.pathname.startsWith(link.href)}
							<a
								href={link.href}
								class="mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors {isActive
									? 'bg-accent-cyan/10 text-accent-cyan'
									: 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'}"
							>
								{@html link.icon}
								{link.label}
							</a>
						{/each}
					</div>
				{/each}
			</nav>

			<!-- Bottom -->
			<div class="border-t border-dark-800 p-4 space-y-1">
				<a
					href="/"
					target="_blank"
					class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-dark-500 hover:bg-dark-800 hover:text-dark-300 transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
					View Website
				</a>
				<a
					href="/admin/login"
					onclick={() => { document.cookie = 'admin_session=; path=/admin; max-age=0'; }}
					class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-dark-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
					Logout
				</a>
			</div>
		</aside>

		<!-- Main content -->
		<div class="flex flex-1 flex-col overflow-hidden">
			<!-- Top bar -->
			<header class="flex h-16 items-center justify-between border-b border-dark-800 bg-dark-900 px-6">
				<h1 class="text-base font-semibold text-dark-100">
					{pageTitle()}
				</h1>
				<div class="flex items-center gap-3">
					<div class="flex items-center gap-2 rounded-full border border-dark-700 bg-dark-800 px-3 py-1.5 text-xs text-dark-400">
						<span class="h-1.5 w-1.5 rounded-full bg-accent-green"></span>
						Logged in as Admin
					</div>
				</div>
			</header>

			<div class="flex-1 overflow-y-auto p-6">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
