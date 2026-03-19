<script lang="ts">
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { tiltCard } from '$lib/animations/actions/tiltCard';

	let { data } = $props();

	const tierColors: Record<string, string> = {
		gold: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
		platinum: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
		advanced: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
		premier: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
		certified: 'bg-green-500/15 text-green-400 border border-green-500/30'
	};

	function getTierClass(tier: string | null): string {
		if (!tier) return 'bg-dark-700/50 text-dark-300 border border-dark-600/50';
		return tierColors[tier.toLowerCase()] ?? 'bg-dark-700/50 text-dark-300 border border-dark-600/50';
	}

	const certifications = [
		{
			name: 'ISO 27001',
			subtitle: 'Information Security Management',
			description:
				'Internationally recognized standard for information security management systems, ensuring your data is handled with the highest security protocols.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>`
		},
		{
			name: 'ISO 9001',
			subtitle: 'Quality Management Systems',
			description:
				'Certified quality management processes that ensure consistent, high-quality service delivery across all our technology engagements and consulting services.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`
		},
		{
			name: 'Kominfo Registered',
			subtitle: 'Indonesian Ministry of Communications',
			description:
				'Officially registered with Indonesia\'s Ministry of Communication and Information Technology, compliant with all local regulatory requirements.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/><path d="M7 15h.01"/><path d="M11 15h2"/></svg>`
		}
	];

	const ecosystemFeatures = [
		{
			title: 'Vendor-Neutral Advisory',
			description:
				'Our partnerships span multiple vendors, allowing us to recommend the best solution for your needs — not just what we sell.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`
		},
		{
			title: 'Certified Expertise',
			description:
				'Our engineers hold active certifications from every major vendor partner, ensuring hands-on, validated knowledge for your projects.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`
		},
		{
			title: 'Direct Support Channels',
			description:
				'Partner status grants us escalation access and dedicated support lines, reducing resolution time when critical issues arise.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
		}
	];
</script>

<svelte:head>
	<title>Partners & Certifications - Asiateknologi</title>
	<meta
		name="description"
		content="Explore Asiateknologi's trusted partner ecosystem — certified technology partnerships and compliance certifications that power our vendor-neutral advisory."
	/>
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden pb-16 pt-32">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<div
		class="absolute inset-0 opacity-[0.03]"
		style="background-image: radial-gradient(circle at 1px 1px, rgba(0,229,255,0.8) 1px, transparent 0); background-size: 40px 40px;"
	></div>
	<!-- Glow orbs -->
	<div
		class="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-accent-cyan/5 blur-3xl"
	></div>
	<div
		class="absolute -top-20 right-1/4 h-64 w-64 rounded-full bg-accent-purple/5 blur-3xl"
	></div>

	<div class="relative mx-auto max-w-7xl px-6 text-center">
		<span
			class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
			use:scrollReveal
		>
			Ecosystem
		</span>
		<h1
			class="mt-4 text-4xl font-bold text-dark-100 md:text-6xl"
			use:textScramble
		>
			Our Partners &amp; Certifications
		</h1>
		<p
			class="mx-auto mt-6 max-w-2xl text-lg text-dark-400"
			use:scrollReveal={{ delay: 0.2 }}
		>
			A vendor-neutral trusted ecosystem built on certified expertise. We partner with the world's
			leading technology providers to deliver the right solution for every challenge.
		</p>

		<div
			class="mt-10 flex flex-wrap items-center justify-center gap-6 font-mono text-sm text-dark-400"
			use:scrollReveal={{ delay: 0.3 }}
		>
			<span class="flex items-center gap-2">
				<span class="h-1.5 w-1.5 rounded-full bg-accent-cyan"></span>
				{data.technologyPartners.length} Technology Partners
			</span>
			<span class="flex items-center gap-2">
				<span class="h-1.5 w-1.5 rounded-full bg-accent-purple"></span>
				3 Compliance Certifications
			</span>
			<span class="flex items-center gap-2">
				<span class="h-1.5 w-1.5 rounded-full bg-accent-blue"></span>
				{data.alliancePartners.length} Alliance Members
			</span>
		</div>
	</div>
</section>

<!-- Technology Partners -->
{#if data.technologyPartners.length > 0}
	<section class="bg-dark-900 py-24">
		<div class="mx-auto max-w-7xl px-6">
			<SectionHeading
				label="Technology Partners"
				title="Trusted Technology Ecosystem"
				subtitle="Certified partnerships with the world's leading enterprise technology vendors."
			/>

			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each data.technologyPartners as partner, i}
					<div
						class="group relative overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-950/80 p-6 transition-all duration-300 hover:border-accent-cyan/30 hover:bg-dark-800/60 hover:shadow-lg hover:shadow-accent-cyan/5"
						use:tiltCard={{ maxTilt: 5 }}
						use:scrollReveal={{ delay: i * 0.07 }}
					>
						<!-- Subtle inner glow on hover -->
						<div
							class="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/0 to-accent-blue/0 opacity-0 transition-opacity duration-500 group-hover:from-accent-cyan/5 group-hover:to-accent-blue/5 group-hover:opacity-100"
						></div>

						<div class="relative flex flex-col gap-4">
							<!-- Logo / Name -->
							<div class="flex items-start justify-between">
								<div class="flex-1">
									{#if partner.logoSvg}
										<div class="mb-3 h-10 w-auto text-dark-100 opacity-80 transition-opacity group-hover:opacity-100">
											{@html partner.logoSvg}
										</div>
									{:else}
										<div
											class="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-dark-700 to-dark-800 px-4 py-2.5"
										>
											<span
												class="font-mono text-sm font-bold tracking-wider text-dark-200 group-hover:text-accent-cyan transition-colors"
											>
												{partner.name}
											</span>
										</div>
									{/if}
								</div>

								{#if partner.tier}
									<span
										class="ml-2 shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider {getTierClass(partner.tier)}"
									>
										{partner.tier}
									</span>
								{/if}
							</div>

							{#if !partner.logoSvg}
								<h3 class="text-base font-semibold text-dark-100 group-hover:text-dark-50 transition-colors">
									{partner.name}
								</h3>
							{/if}

							{#if partner.description}
								<p class="text-sm leading-relaxed text-dark-400 line-clamp-3">
									{partner.description}
								</p>
							{/if}

							{#if partner.url}
								<a
									href={partner.url}
									target="_blank"
									rel="noopener noreferrer"
									class="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-dark-400 transition-colors hover:text-accent-cyan"
								>
									Learn more
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<path d="M7 7h10v10" /><path d="M7 17 17 7" />
									</svg>
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Alliance Partners -->
{#if data.alliancePartners.length > 0}
	<section class="bg-dark-950 py-24">
		<div class="mx-auto max-w-7xl px-6">
			<SectionHeading
				label="Alliance Partners"
				title="Strategic Alliances"
				subtitle="Collaborative partnerships that extend our reach and capabilities across Southeast Asia."
			/>

			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.alliancePartners as partner, i}
					<div
						class="group relative overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-900/80 p-6 transition-all duration-300 hover:border-accent-purple/30 hover:shadow-lg hover:shadow-accent-purple/5"
						use:scrollReveal={{ delay: i * 0.08 }}
					>
						<div class="flex items-start gap-4">
							<div
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-purple/10 text-accent-purple"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
								>
									<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
									<circle cx="9" cy="7" r="4" />
									<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
									<path d="M16 3.13a4 4 0 0 1 0 7.75" />
								</svg>
							</div>
							<div class="min-w-0 flex-1">
								<div class="flex items-center gap-2">
									<h3 class="font-semibold text-dark-100 group-hover:text-dark-50 transition-colors">
										{partner.name}
									</h3>
									{#if partner.tier}
										<span
											class="shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider {getTierClass(partner.tier)}"
										>
											{partner.tier}
										</span>
									{/if}
								</div>
								{#if partner.description}
									<p class="mt-1.5 text-sm leading-relaxed text-dark-400">{partner.description}</p>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Certifications & Compliance -->
<section class="bg-dark-900 py-24">
	<div class="mx-auto max-w-7xl px-6">
		<SectionHeading
			label="Certifications & Compliance"
			title="Standards We Uphold"
			subtitle="Our operations are governed by internationally recognized standards, ensuring quality, security, and regulatory compliance."
		/>

		<div class="grid gap-6 md:grid-cols-3">
			{#each certifications as cert, i}
				<div
					class="group relative overflow-hidden rounded-2xl border border-accent-cyan/20 bg-dark-950/80 p-8 transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-xl hover:shadow-accent-cyan/10"
					use:tiltCard={{ maxTilt: 4 }}
					use:scrollReveal={{ delay: i * 0.12 }}
				>
					<!-- Top accent line -->
					<div
						class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent"
					></div>

					<div
						class="mb-5 inline-flex rounded-xl bg-accent-cyan/10 p-3.5 text-accent-cyan ring-1 ring-accent-cyan/20"
					>
						{@html cert.icon}
					</div>

					<h3 class="text-2xl font-bold text-dark-100">{cert.name}</h3>
					<p class="mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-accent-cyan">
						{cert.subtitle}
					</p>
					<p class="mt-4 text-sm leading-relaxed text-dark-400">
						{cert.description}
					</p>

					<div class="mt-6 flex items-center gap-2">
						<span
							class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/15 text-green-400"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
							>
								<polyline points="20 6 9 17 4 12" />
							</svg>
						</span>
						<span class="text-xs font-medium text-green-400">Certified &amp; Active</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Why Partner Ecosystem Matters -->
<section class="bg-dark-950 py-24">
	<div class="mx-auto max-w-7xl px-6">
		<SectionHeading
			label="Why It Matters"
			title="The Power of Our Partner Network"
			subtitle="Our ecosystem is designed to give you access to the best technology choices, backed by certified expertise."
		/>

		<div class="grid gap-6 md:grid-cols-3">
			{#each ecosystemFeatures as feature, i}
				<div
					class="group rounded-2xl border border-dark-700/50 bg-dark-900/50 p-7 transition-all duration-300 hover:border-accent-cyan/30 hover:bg-dark-800/50"
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<div
						class="mb-5 inline-flex rounded-xl bg-gradient-to-br from-accent-cyan/15 to-accent-blue/10 p-3.5 text-accent-cyan ring-1 ring-accent-cyan/20"
					>
						{@html feature.icon}
					</div>
					<h3 class="mb-3 text-lg font-semibold text-dark-100 group-hover:text-accent-cyan transition-colors">
						{feature.title}
					</h3>
					<p class="text-sm leading-relaxed text-dark-400">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Become a Partner CTA -->
<section class="py-24">
	<div class="mx-auto max-w-5xl px-6">
		<div
			class="relative overflow-hidden rounded-3xl p-12 text-center"
			style="background: linear-gradient(135deg, #1a1a25 0%, #0f1729 50%, #1a1a25 100%);"
			use:scrollReveal
		>
			<!-- Gradient border effect -->
			<div
				class="pointer-events-none absolute inset-0 rounded-3xl"
				style="background: linear-gradient(135deg, rgba(0,229,255,0.15), rgba(59,130,246,0.1), rgba(139,92,246,0.15)); padding: 1px;"
			>
				<div class="h-full w-full rounded-3xl bg-transparent"></div>
			</div>
			<div
				class="absolute inset-0 rounded-3xl border border-accent-cyan/20"
			></div>

			<!-- Background glow -->
			<div
				class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-blue/10 blur-3xl"
			></div>
			<div
				class="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-purple/10 blur-3xl"
			></div>

			<div class="relative">
				<span
					class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
				>
					Partner Program
				</span>
				<h2 class="mt-3 text-3xl font-bold text-dark-100 md:text-4xl">
					Become a Partner
				</h2>
				<p class="mx-auto mt-4 max-w-xl text-lg text-dark-400">
					Join our growing partner ecosystem. Whether you're a technology vendor, systems integrator,
					or regional reseller — let's explore how we can grow together across Southeast Asia.
				</p>
				<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
					<Button href="/contact" variant="primary" size="lg">Start the Conversation</Button>
					<Button href="/about" variant="secondary" size="lg">Learn About Us</Button>
				</div>
			</div>
		</div>
	</div>
</section>
