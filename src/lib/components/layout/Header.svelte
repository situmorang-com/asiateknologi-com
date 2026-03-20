<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';

	let mobileOpen = $state(false);
	let scrolled = $state(false);
	let activeMenu = $state<string | null>(null);
	let closeTimeout: ReturnType<typeof setTimeout> | null = null;

	// Mobile accordion state
	let mobileExpanded = $state<Record<string, boolean>>({});

	const servicesMenu = {
		columns: [
			{
				heading: 'Core Services',
				items: [
					{ label: 'IT Consulting', href: '/services/it-consulting' },
					{ label: 'IoT & Devices', href: '/services/iot-devices' },
					{ label: 'Device Rental', href: '/services/device-rental' },
					{ label: 'Cloud & DevOps', href: '/services/cloud-devops' }
				]
			},
			{
				heading: 'Managed & Security',
				items: [
					{ label: 'Managed Services', href: '/services/managed-services' },
					{ label: 'Cybersecurity', href: '/services/cybersecurity' },
					{ label: 'IT Asset Management', href: '/services/itam-mdm' },
					{ label: 'BCDR', href: '/services/bcdr' }
				]
			},
			{
				heading: 'Advisory',
				items: [
					{ label: 'Data & AI', href: '/services/data-ai' },
					{ label: 'IT Recruitment', href: '/services/recruitment' },
					{ label: 'Training', href: '/services/training' },
					{ label: 'Procurement', href: '/services/procurement' }
				]
			}
		],
		viewAll: { label: 'View All Services →', href: '/services' }
	};

	const industriesMenu = {
		columns: [
			[
				{ label: 'Mining', href: '/solutions/mining', icon: 'mining' },
				{ label: 'Healthcare', href: '/solutions/healthcare', icon: 'healthcare' },
				{ label: 'Manufacturing', href: '/solutions/manufacturing', icon: 'manufacturing' },
				{ label: 'Smart City', href: '/solutions/smart-city', icon: 'smart-city' }
			],
			[
				{ label: 'Financial Services', href: '/solutions/financial-services', icon: 'finance' },
				{ label: 'Energy & Utilities', href: '/solutions/energy-utilities', icon: 'energy' },
				{ label: 'Logistics', href: '/solutions/logistics', icon: 'logistics' },
				{ label: 'Telecommunications', href: '/solutions/telecommunications', icon: 'telecom' }
			]
		],
		viewAll: { label: 'View All Industries →', href: '/solutions' }
	};

	const companyMenu = [
		{ label: 'About Us', href: '/about' },
		{ label: 'Partners', href: '/partners' },
		{ label: 'Careers', href: '/careers' },
		{ label: 'Resources', href: '/resources' },
		{ label: 'Device Catalog', href: '/devices' }
	];

	const industryIcons: Record<string, string> = {
		mining: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="m6 20 4-8 4 8"/><path d="m10 12 2-4 2 4"/><path d="M14 8h4v4"/></svg>`,
		healthcare: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/></svg>`,
		manufacturing: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>`,
		'smart-city': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
		finance: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
		energy: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
		logistics: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
		telecom: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 15v3z"/></svg>`
	};

	function handleScroll() {
		scrolled = window.scrollY > 50;
	}

	function closeMobile() {
		mobileOpen = false;
		mobileExpanded = {};
	}

	function openMenu(name: string) {
		// Cancel any pending close so moving into the dropdown doesn't dismiss it
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
		activeMenu = name;
	}

	function closeMenu() {
		// Delay closing so the mouse can travel across the gap between button and panel
		closeTimeout = setTimeout(() => {
			activeMenu = null;
			closeTimeout = null;
		}, 150);
	}

	function toggleMobileSection(key: string) {
		mobileExpanded[key] = !mobileExpanded[key];
	}

	function handleMenuKeydown(e: KeyboardEvent, name: string) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			activeMenu = activeMenu === name ? null : name;
		}
		if (e.key === 'Escape') {
			activeMenu = null;
		}
	}
</script>

<svelte:window onscroll={handleScroll} />

<!-- Click-outside overlay to close menus -->
{#if activeMenu}
	<div
		class="fixed inset-0 z-40"
		role="presentation"
		onclick={closeMenu}
	></div>
{/if}

<header
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
		? 'bg-dark-950/80 backdrop-blur-xl border-b border-dark-700/50 py-3'
		: 'bg-transparent py-5'}"
>
	<nav class="mx-auto flex max-w-7xl items-center justify-between px-6" role="navigation" aria-label="Main navigation">
		<!-- Logo -->
		<a href="/" class="group flex items-center" onclick={closeMobile}>
			<img
				src="/logo.png"
				alt="Asiateknologi"
				class="h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
			/>
		</a>

		<!-- Desktop nav -->
		<div class="hidden items-center gap-1 lg:flex">
			<!-- Home -->
			<a
				href="/"
				class="relative px-4 py-2 text-sm font-medium transition-colors {$page.url.pathname === '/'
					? 'text-accent-cyan'
					: 'text-dark-300 hover:text-dark-100'}"
			>
				Home
				{#if $page.url.pathname === '/'}
					<span class="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-accent-cyan"></span>
				{/if}
			</a>

			<!-- Services mega-menu -->
			<div
				class="relative"
				onmouseenter={() => openMenu('services')}
				onmouseleave={closeMenu}
			>
				<button
					class="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors {$page.url.pathname.startsWith('/services')
						? 'text-accent-cyan'
						: 'text-dark-300 hover:text-dark-100'}"
					aria-expanded={activeMenu === 'services'}
					aria-haspopup="true"
					onkeydown={(e) => handleMenuKeydown(e, 'services')}
				>
					Services
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						class="transition-transform duration-200 {activeMenu === 'services' ? 'rotate-180' : ''}"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
					{#if $page.url.pathname.startsWith('/services')}
						<span class="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-accent-cyan"></span>
					{/if}
				</button>

				{#if activeMenu === 'services'}
					<div
						class="absolute left-1/2 top-full mt-2 w-[680px] -translate-x-1/2 rounded-xl border border-dark-700/50 bg-dark-900 shadow-2xl shadow-black/50"
						role="menu"
						transition:fly={{ y: -8, duration: 180 }}
						onmouseenter={() => openMenu('services')}
						onmouseleave={closeMenu}
					>
						<div class="grid grid-cols-3 gap-0 p-6">
							{#each servicesMenu.columns as col}
								<div class="pr-6 {col !== servicesMenu.columns[servicesMenu.columns.length - 1] ? 'border-r border-dark-700/40 mr-6' : ''}">
									<p class="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-accent-cyan/70">
										{col.heading}
									</p>
									<ul class="space-y-1">
										{#each col.items as item}
											<li>
												<a
													href={item.href}
													class="block rounded-lg px-3 py-2 text-sm text-dark-300 transition-all hover:bg-dark-800 hover:text-dark-100"
													role="menuitem"
												>
													{item.label}
												</a>
											</li>
										{/each}
									</ul>
								</div>
							{/each}
						</div>
						<div class="border-t border-dark-700/40 px-6 py-3">
							<a
								href={servicesMenu.viewAll.href}
								class="text-sm font-medium text-accent-cyan transition-colors hover:text-accent-cyan/80"
								role="menuitem"
							>
								{servicesMenu.viewAll.label}
							</a>
						</div>
					</div>
				{/if}
			</div>

			<!-- Industries mega-menu -->
			<div
				class="relative"
				onmouseenter={() => openMenu('industries')}
				onmouseleave={closeMenu}
			>
				<button
					class="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors {$page.url.pathname.startsWith('/solutions')
						? 'text-accent-cyan'
						: 'text-dark-300 hover:text-dark-100'}"
					aria-expanded={activeMenu === 'industries'}
					aria-haspopup="true"
					onkeydown={(e) => handleMenuKeydown(e, 'industries')}
				>
					Industries
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						class="transition-transform duration-200 {activeMenu === 'industries' ? 'rotate-180' : ''}"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
					{#if $page.url.pathname.startsWith('/solutions')}
						<span class="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-accent-cyan"></span>
					{/if}
				</button>

				{#if activeMenu === 'industries'}
					<div
						class="absolute left-1/2 top-full mt-2 w-[420px] -translate-x-1/2 rounded-xl border border-dark-700/50 bg-dark-900 shadow-2xl shadow-black/50"
						role="menu"
						transition:fly={{ y: -8, duration: 180 }}
						onmouseenter={() => openMenu('industries')}
						onmouseleave={closeMenu}
					>
						<div class="grid grid-cols-2 gap-0 p-6">
							{#each industriesMenu.columns as col, ci}
								<div class="{ci === 0 ? 'border-r border-dark-700/40 pr-6 mr-6' : ''}">
									<ul class="space-y-1">
										{#each col as item}
											<li>
												<a
													href={item.href}
													class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-dark-300 transition-all hover:bg-dark-800 hover:text-dark-100"
													role="menuitem"
												>
													<span class="text-accent-cyan/60 shrink-0">{@html industryIcons[item.icon]}</span>
													{item.label}
												</a>
											</li>
										{/each}
									</ul>
								</div>
							{/each}
						</div>
						<div class="border-t border-dark-700/40 px-6 py-3">
							<a
								href={industriesMenu.viewAll.href}
								class="text-sm font-medium text-accent-cyan transition-colors hover:text-accent-cyan/80"
								role="menuitem"
							>
								{industriesMenu.viewAll.label}
							</a>
						</div>
					</div>
				{/if}
			</div>

			<!-- Work (Case Studies) -->
			<a
				href="/case-studies"
				class="relative px-4 py-2 text-sm font-medium transition-colors {$page.url.pathname.startsWith('/case-studies')
					? 'text-accent-cyan'
					: 'text-dark-300 hover:text-dark-100'}"
			>
				Case Studies
				{#if $page.url.pathname.startsWith('/case-studies')}
					<span class="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-accent-cyan"></span>
				{/if}
			</a>

			<!-- Insights -->
			<a
				href="/insights"
				class="relative px-4 py-2 text-sm font-medium transition-colors {$page.url.pathname.startsWith('/insights')
					? 'text-accent-cyan'
					: 'text-dark-300 hover:text-dark-100'}"
			>
				Insights
				{#if $page.url.pathname.startsWith('/insights')}
					<span class="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-accent-cyan"></span>
				{/if}
			</a>

			<!-- Company dropdown -->
			<div
				class="relative"
				onmouseenter={() => openMenu('company')}
				onmouseleave={closeMenu}
			>
				<button
					class="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors {['/about', '/partners', '/careers', '/resources', '/devices'].some(p => $page.url.pathname.startsWith(p))
						? 'text-accent-cyan'
						: 'text-dark-300 hover:text-dark-100'}"
					aria-expanded={activeMenu === 'company'}
					aria-haspopup="true"
					onkeydown={(e) => handleMenuKeydown(e, 'company')}
				>
					Company
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						class="transition-transform duration-200 {activeMenu === 'company' ? 'rotate-180' : ''}"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				</button>

				{#if activeMenu === 'company'}
					<div
						class="absolute right-0 top-full mt-2 w-48 rounded-xl border border-dark-700/50 bg-dark-900 py-2 shadow-2xl shadow-black/50"
						role="menu"
						transition:fly={{ y: -8, duration: 180 }}
						onmouseenter={() => openMenu('company')}
						onmouseleave={closeMenu}
					>
						{#each companyMenu as item}
							<a
								href={item.href}
								class="block px-4 py-2.5 text-sm text-dark-300 transition-all hover:bg-dark-800 hover:text-dark-100"
								role="menuitem"
							>
								{item.label}
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Contact CTA -->
			<a
				href="/contact"
				class="ml-3 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-blue px-5 py-2 text-sm font-semibold text-dark-950 transition-all hover:shadow-lg hover:shadow-accent-cyan/25 hover:brightness-110"
			>
				Contact
			</a>
		</div>

		<!-- Mobile hamburger -->
		<button
			class="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label="Toggle menu"
			aria-expanded={mobileOpen}
		>
			<span
				class="h-0.5 w-6 rounded-full bg-dark-100 transition-all duration-300 {mobileOpen
					? 'translate-y-2 rotate-45'
					: ''}"
			></span>
			<span
				class="h-0.5 w-6 rounded-full bg-dark-100 transition-all duration-300 {mobileOpen
					? 'opacity-0'
					: ''}"
			></span>
			<span
				class="h-0.5 w-6 rounded-full bg-dark-100 transition-all duration-300 {mobileOpen
					? '-translate-y-2 -rotate-45'
					: ''}"
			></span>
		</button>
	</nav>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div
			class="fixed inset-0 z-40 overflow-y-auto bg-dark-950/98 backdrop-blur-xl lg:hidden"
			role="dialog"
			aria-modal="true"
			transition:fade={{ duration: 200 }}
		>
			<div class="flex min-h-full flex-col px-6 pb-10 pt-24">
				<!-- Home -->
				<a
					href="/"
					class="block border-b border-dark-800 py-4 text-lg font-medium text-dark-100 transition-colors hover:text-accent-cyan"
					onclick={closeMobile}
				>
					Home
				</a>

				<!-- Services accordion -->
				<div class="border-b border-dark-800">
					<button
						class="flex w-full items-center justify-between py-4 text-lg font-medium text-dark-100"
						onclick={() => toggleMobileSection('services')}
					>
						Services
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="transition-transform duration-200 {mobileExpanded['services'] ? 'rotate-180' : ''}"
						>
							<path d="m6 9 6 6 6-6" />
						</svg>
					</button>
					{#if mobileExpanded['services']}
						<div class="pb-4" transition:fly={{ y: -8, duration: 150 }}>
							{#each servicesMenu.columns as col}
								<p class="mt-3 mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent-cyan/70 px-2">
									{col.heading}
								</p>
								{#each col.items as item}
									<a
										href={item.href}
										class="block rounded-lg px-3 py-2.5 text-sm text-dark-300 transition-colors hover:bg-dark-800 hover:text-dark-100"
										onclick={closeMobile}
									>
										{item.label}
									</a>
								{/each}
							{/each}
							<a
								href="/services"
								class="mt-3 block px-3 py-2 text-sm font-medium text-accent-cyan"
								onclick={closeMobile}
							>
								View All Services →
							</a>
						</div>
					{/if}
				</div>

				<!-- Industries accordion -->
				<div class="border-b border-dark-800">
					<button
						class="flex w-full items-center justify-between py-4 text-lg font-medium text-dark-100"
						onclick={() => toggleMobileSection('industries')}
					>
						Industries
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="transition-transform duration-200 {mobileExpanded['industries'] ? 'rotate-180' : ''}"
						>
							<path d="m6 9 6 6 6-6" />
						</svg>
					</button>
					{#if mobileExpanded['industries']}
						<div class="pb-4" transition:fly={{ y: -8, duration: 150 }}>
							{#each industriesMenu.columns as col}
								{#each col as item}
									<a
										href={item.href}
										class="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-dark-300 transition-colors hover:bg-dark-800 hover:text-dark-100"
										onclick={closeMobile}
									>
										<span class="text-accent-cyan/60">{@html industryIcons[item.icon]}</span>
										{item.label}
									</a>
								{/each}
							{/each}
							<a
								href="/solutions"
								class="mt-3 block px-3 py-2 text-sm font-medium text-accent-cyan"
								onclick={closeMobile}
							>
								View All Industries →
							</a>
						</div>
					{/if}
				</div>

				<!-- Case Studies -->
				<a
					href="/case-studies"
					class="block border-b border-dark-800 py-4 text-lg font-medium text-dark-100 transition-colors hover:text-accent-cyan"
					onclick={closeMobile}
				>
					Case Studies
				</a>

				<!-- Insights -->
				<a
					href="/insights"
					class="block border-b border-dark-800 py-4 text-lg font-medium text-dark-100 transition-colors hover:text-accent-cyan"
					onclick={closeMobile}
				>
					Insights
				</a>

				<!-- Company accordion -->
				<div class="border-b border-dark-800">
					<button
						class="flex w-full items-center justify-between py-4 text-lg font-medium text-dark-100"
						onclick={() => toggleMobileSection('company')}
					>
						Company
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="transition-transform duration-200 {mobileExpanded['company'] ? 'rotate-180' : ''}"
						>
							<path d="m6 9 6 6 6-6" />
						</svg>
					</button>
					{#if mobileExpanded['company']}
						<div class="pb-4" transition:fly={{ y: -8, duration: 150 }}>
							{#each companyMenu as item}
								<a
									href={item.href}
									class="block rounded-lg px-3 py-2.5 text-sm text-dark-300 transition-colors hover:bg-dark-800 hover:text-dark-100"
									onclick={closeMobile}
								>
									{item.label}
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Contact CTA -->
				<div class="mt-8">
					<a
						href="/contact"
						class="block w-full rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue px-8 py-4 text-center text-lg font-semibold text-dark-950 transition-all hover:shadow-lg hover:shadow-accent-cyan/25"
						onclick={closeMobile}
					>
						Contact Us
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
