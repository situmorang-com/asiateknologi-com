<script lang="ts">
	const currentYear = new Date().getFullYear();

	const footerLinks = {
		services: [
			{ href: '/services/it-consulting', label: 'IT Consulting' },
			{ href: '/services/iot-devices', label: 'IoT Solutions' },
			{ href: '/services/recruitment', label: 'IT Recruitment' },
			{ href: '/services/device-rental', label: 'Device Rental' },
			{ href: '/services/managed-services', label: 'Managed Services' },
			{ href: '/services/cybersecurity', label: 'Cybersecurity' },
			{ href: '/services/cloud-devops', label: 'Cloud & DevOps' },
			{ href: '/services/data-ai', label: 'Data & AI' }
		],
		company: [
			{ href: '/about', label: 'About Us' },
			{ href: '/partners', label: 'Partners' },
			{ href: '/careers', label: 'Careers' },
			{ href: '/resources', label: 'Resources' }
		],
		industries: [
			{ href: '/solutions/mining', label: 'Mining' },
			{ href: '/solutions/healthcare', label: 'Healthcare' },
			{ href: '/solutions/financial-services', label: 'Financial Services' },
			{ href: '/solutions/manufacturing', label: 'Manufacturing' },
			{ href: '/solutions/smart-city', label: 'Smart City' },
			{ href: '/solutions/energy', label: 'Energy' }
		],
		insights: [
			{ href: '/case-studies', label: 'Case Studies' },
			{ href: '/insights', label: 'Insights & Blog' },
			{ href: '/contact', label: 'Contact Us' }
		]
	};

	const socialLinks = [
		{
			href: 'https://linkedin.com/company/asiateknologi',
			label: 'LinkedIn',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`
		},
		{
			href: 'https://twitter.com/asiateknologi',
			label: 'X (Twitter)',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
		}
	];
</script>

<footer class="border-t border-dark-700/50 bg-dark-950">
	<div class="mx-auto max-w-7xl px-6 py-16">
		<!-- Main grid: brand + 4 link columns -->
		<div class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
			<!-- Brand — spans 2 cols on lg -->
			<div class="lg:col-span-2">
				<a href="/" class="inline-block">
					<img
						src="/logo.png"
						alt="Asiateknologi"
						class="h-10 w-auto object-contain"
						style="filter: brightness(0) invert(1);"
					/>
				</a>
				<p class="mt-4 text-sm leading-relaxed text-dark-400">
					Bridging technology and industry across Asia. IT consulting, IoT solutions, recruitment,
					and device management.
				</p>

				<!-- Contact info -->
				<ul class="mt-6 space-y-2 text-sm text-dark-400">
					<li>
						<a href="mailto:info@asiateknologi.com" class="hover:text-accent-cyan transition-colors">
							info@asiateknologi.com
						</a>
					</li>
					<li>
						<a href="tel:+622155501000" class="hover:text-accent-cyan transition-colors">
							+62 21 555 0100
						</a>
					</li>
					<li>Jakarta, Indonesia</li>
				</ul>
			</div>

			<!-- Services -->
			<div>
				<h3 class="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent-cyan">
					Services
				</h3>
				<ul class="space-y-2.5">
					{#each footerLinks.services as link}
						<li>
							<a href={link.href} class="text-sm text-dark-400 transition-colors hover:text-dark-100">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Company -->
			<div>
				<h3 class="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent-cyan">
					Company
				</h3>
				<ul class="space-y-2.5">
					{#each footerLinks.company as link}
						<li>
							<a href={link.href} class="text-sm text-dark-400 transition-colors hover:text-dark-100">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Industries -->
			<div>
				<h3 class="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent-cyan">
					Industries
				</h3>
				<ul class="space-y-2.5">
					{#each footerLinks.industries as link}
						<li>
							<a href={link.href} class="text-sm text-dark-400 transition-colors hover:text-dark-100">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Insights & Resources -->
			<div>
				<h3 class="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent-cyan">
					Resources
				</h3>
				<ul class="space-y-2.5">
					{#each footerLinks.insights as link}
						<li>
							<a href={link.href} class="text-sm text-dark-400 transition-colors hover:text-dark-100">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="mt-12 flex flex-col gap-4 border-t border-dark-800 pt-8 md:flex-row md:items-center md:justify-between">
			<!-- Left: copyright + badges -->
			<div class="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
				<p class="text-xs text-dark-500">
					&copy; {currentYear} Asiateknologi. All rights reserved.
				</p>
				<span class="hidden sm:inline text-dark-700">|</span>
				<p class="text-xs text-dark-600 font-mono tracking-wide">
					ISO 27001 Certified &nbsp;·&nbsp; Kominfo Registered
				</p>
			</div>

			<!-- Right: social icons + status -->
			<div class="flex items-center gap-5">
				<!-- Social links -->
				<div class="flex items-center gap-3">
					{#each socialLinks as social}
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={social.label}
							class="text-dark-500 transition-colors hover:text-dark-200"
						>
							{@html social.icon}
						</a>
					{/each}
				</div>

				<span class="text-dark-700">|</span>

				<!-- Status indicator -->
				<div class="flex items-center gap-1.5 text-xs text-dark-600">
					<span class="inline-block h-2 w-2 rounded-full bg-accent-green animate-pulse"></span>
					All systems operational
				</div>
			</div>
		</div>
	</div>
</footer>
