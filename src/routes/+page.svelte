<script lang="ts">
	import { browser } from '$app/environment';
	import ParticleNetwork from '$lib/components/three/ParticleNetwork.svelte';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { tiltCard } from '$lib/animations/actions/tiltCard';
	import { counterUp } from '$lib/animations/actions/counterUp';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { magneticCursor } from '$lib/animations/actions/magneticCursor';
	import { parallax } from '$lib/animations/actions/parallax';
	import PartnerLogo from '$lib/components/ui/PartnerLogo.svelte';

	let { data } = $props();

	// ── Service icons ────────────────────────────────────────────────────────────
	const serviceIcons: Record<string, string> = {
		network: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><circle cx="5" cy="19" r="3"/><line x1="12" y1="8" x2="19" y2="16"/><line x1="12" y1="8" x2="5" y2="16"/></svg>`,
		cpu: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
		users: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
		monitor: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
		shield: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
		lock: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
		cloud: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
		chart: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
		database: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
		refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
		book: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
		briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
	};

	const stats = [
		{ value: 150, suffix: '+', label: 'Projects Delivered' },
		{ value: 50, suffix: '+', label: 'Enterprise Clients' },
		{ value: 12, suffix: '+', label: 'Years Experience' },
		{ value: 500, suffix: '+', label: 'IoT Devices Deployed' }
	];

	const industryIcons: Record<string, string> = {
		mining: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20l4-4m0 0l4 4m-4-4v-8l6-6 6 6v8m0 0l4 4m-4-4l-4 4m4-4"/></svg>`,
		'financial-services': `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 14h.01"/><path d="M10 14h4"/></svg>`,
		healthcare: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3"/><path d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4"/><path d="M22 10l-4.5-4.5L22 1"/></svg>`,
		manufacturing: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20a2 2 0 002 2h16a2 2 0 002-2V8l-7 5V8l-7 5V4a2 2 0 00-2-2H4a2 2 0 00-2 2z"/></svg>`
	};

	// ── Process steps ────────────────────────────────────────────────────────────
	const processSteps = [
		{
			num: '01',
			name: 'Discover',
			desc: 'Deep-dive assessment of your technology landscape, existing systems, and strategic objectives.'
		},
		{
			num: '02',
			name: 'Design',
			desc: 'Architecture and solution blueprint tailored to your environment, constraints, and growth goals.'
		},
		{
			num: '03',
			name: 'Build',
			desc: 'Agile delivery with transparent milestone reporting, code reviews, and continuous stakeholder alignment.'
		},
		{
			num: '04',
			name: 'Deploy',
			desc: 'Precision rollout with zero-downtime migration strategies and comprehensive go-live support.'
		},
		{
			num: '05',
			name: 'Support',
			desc: 'Ongoing managed services, proactive monitoring, and continuous optimization post-deployment.'
		}
	];

	// ── Tier badge colors for partners ──────────────────────────────────────────
	const tierColors: Record<string, string> = {
		platinum: 'border-slate-300/40 text-slate-300 bg-slate-300/10',
		gold: 'border-yellow-400/40 text-yellow-400 bg-yellow-400/10',
		silver: 'border-gray-400/40 text-gray-400 bg-gray-400/10',
		bronze: 'border-amber-600/40 text-amber-600 bg-amber-600/10',
		default: 'border-dark-600 text-dark-300 bg-dark-800'
	};

	function getTierClass(tier: string | null): string {
		return tierColors[tier ?? 'default'] ?? tierColors.default;
	}

	// ── Category badge colors for insights ──────────────────────────────────────
	const categoryColors: Record<string, string> = {
		'IoT': 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
		'Cloud': 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
		'AI/ML': 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
		'Security': 'bg-red-500/10 text-red-400 border-red-500/20',
		'Integration': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
		'default': 'bg-dark-700 text-dark-300 border-dark-600'
	};

	function getCategoryClass(cat: string): string {
		return categoryColors[cat] ?? categoryColors.default;
	}

	// ── Initials helper ──────────────────────────────────────────────────────────
	function getInitials(name: string): string {
		return name
			.split(' ')
			.slice(0, 2)
			.map((w) => w[0])
			.join('')
			.toUpperCase();
	}

	// ── Avatar background colors (cycling) ──────────────────────────────────────
	const avatarColors = [
		'bg-accent-cyan/20 text-accent-cyan',
		'bg-accent-blue/20 text-accent-blue',
		'bg-accent-purple/20 text-accent-purple',
		'bg-emerald-500/20 text-emerald-400'
	];

	// ── Duplicate client logos for seamless marquee ──────────────────────────────
	const marqueeLogos = $derived([...data.clientLogos, ...data.clientLogos]);
</script>

<svelte:head>
	<title>Asiateknologi - IT Consulting, IoT Solutions & System Integration</title>
	<meta
		name="description"
		content="Asiateknologi delivers enterprise IT consulting, IoT solutions, system integration, IT recruitment, and technology device management across Asia."
	/>
</svelte:head>

<!-- ===== HERO SECTION ===== -->
<section class="relative flex min-h-screen items-center overflow-hidden">
	<!-- Particle background -->
	{#if browser}
		<div class="absolute inset-0">
			<ParticleNetwork />
		</div>
	{/if}

	<!-- Gradient overlays -->
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950/50 via-transparent to-dark-950"></div>
	<div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent"></div>

	<!-- Content -->
	<div class="relative z-10 mx-auto max-w-7xl px-6 pt-24">
		<div class="max-w-3xl">
			<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-4 py-1.5">
				<span class="h-2 w-2 rounded-full bg-accent-cyan animate-pulse"></span>
				<span class="font-mono text-xs text-accent-cyan">Engineering the Future</span>
			</div>

			<h1 class="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
				<span class="block text-dark-100" use:textScramble={{ delay: 500 }}>Technology</span>
				<span class="block text-dark-100" use:textScramble={{ delay: 800 }}>Solutions That</span>
				<span
					class="block bg-gradient-to-r from-accent-cyan to-accent-blue bg-clip-text text-transparent"
					use:textScramble={{ delay: 1100 }}
				>
					Transform Industries
				</span>
			</h1>

			<p class="mt-6 max-w-xl text-lg text-dark-400 md:text-xl" use:scrollReveal={{ delay: 0.3 }}>
				From IoT sensor networks in mining operations to medical device integration in hospitals —
				we architect, implement, and manage technology that drives real-world impact.
			</p>

			<div class="mt-8 flex flex-wrap gap-4" use:scrollReveal={{ delay: 0.5 }}>
				<Button href="/contact" variant="primary" size="lg">Start a Project</Button>
				<Button href="/services" variant="secondary" size="lg">Explore Services</Button>
			</div>

			<!-- Tech stack badges -->
			<div class="mt-12 flex flex-wrap items-center gap-3" use:scrollReveal={{ delay: 0.7 }}>
				<span class="text-xs text-dark-500">Trusted technologies:</span>
				{#each ['IoT', 'Cloud', 'AI/ML', 'SCADA', 'HL7/FHIR', 'Edge Computing'] as tech}
					<span class="rounded-md border border-dark-700 bg-dark-900/50 px-2.5 py-1 font-mono text-xs text-dark-400">
						{tech}
					</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
		<div class="flex flex-col items-center gap-2 text-dark-500">
			<span class="text-xs font-mono">scroll</span>
			<div class="h-8 w-5 rounded-full border border-dark-500 flex justify-center pt-1">
				<div class="h-2 w-1 rounded-full bg-accent-cyan animate-bounce"></div>
			</div>
		</div>
	</div>
</section>

<!-- ===== 1. CLIENT LOGO STRIP ===== -->
{#if data.clientLogos.length > 0}
<div class="relative bg-dark-950">
	<!-- Top separator -->
	<div class="h-px bg-gradient-to-r from-transparent via-dark-600/60 to-transparent"></div>

	<div class="py-10">
		<p class="mb-6 text-center font-mono text-xs font-semibold uppercase tracking-[0.2em] text-dark-500">
			Trusted by leading enterprises across Southeast Asia
		</p>

		<!-- Marquee wrapper -->
		<div class="relative overflow-hidden">
			<!-- Fade masks -->
			<div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-dark-950 to-transparent"></div>
			<div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-dark-950 to-transparent"></div>

			<div class="flex w-max animate-marquee-scroll gap-4">
				{#each marqueeLogos as logo}
					<span class="inline-flex shrink-0 items-center rounded-full border border-dark-600 bg-dark-800 px-5 py-2.5 font-mono text-sm text-dark-300 whitespace-nowrap">
						{logo.name}
					</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Bottom separator -->
	<div class="h-px bg-gradient-to-r from-transparent via-dark-600/60 to-transparent"></div>
</div>
{/if}

<!-- ===== SVG WAVE DIVIDER ===== -->
<div class="relative -mt-1 text-dark-950">
	<svg viewBox="0 0 1440 100" class="w-full" preserveAspectRatio="none">
		<path
			fill="currentColor"
			d="M0,0 C240,80 480,100 720,60 C960,20 1200,80 1440,0 L1440,100 L0,100 Z"
			opacity="0.3"
		/>
		<path
			fill="var(--color-dark-900)"
			d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,40 1440,40 L1440,100 L0,100 Z"
		/>
	</svg>
</div>

<!-- ===== COMPANY OVERVIEW ===== -->
<section class="bg-dark-900 py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid items-center gap-16 lg:grid-cols-2">
			<!-- Left: Text content -->
			<div use:scrollReveal={{ direction: 'left' }}>
				<span class="mb-4 inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
					Who We Are
				</span>
				<h2 class="text-3xl font-bold leading-tight text-dark-100 md:text-4xl lg:text-5xl">
					Bridging Technology<br/>& Industry Across Asia
				</h2>
				<div class="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue"></div>
				<p class="mt-8 leading-relaxed text-dark-400">
					Asiateknologi is a premier IT consulting and system integration firm specializing in
					deploying advanced technology solutions across demanding industries. We go beyond traditional
					IT services — our expertise spans IoT sensor networks, industrial automation, medical device
					connectivity, and financial system integration.
				</p>
				<p class="mt-4 leading-relaxed text-dark-400">
					Whether you need to monitor underground mining equipment in real-time, integrate hospital
					information systems with medical devices, or build a secure core banking platform — our team
					has the domain expertise and technical depth to deliver.
				</p>

				<!-- Feature highlights -->
				<div class="mt-8 grid grid-cols-2 gap-4">
					{#each [
						{ icon: '⚡', text: 'End-to-End Integration' },
						{ icon: '🌐', text: 'IoT & Edge Computing' },
						{ icon: '🏭', text: 'Industrial-Grade Systems' },
						{ icon: '🔒', text: 'Enterprise Security' }
					] as feat}
						<div class="flex items-center gap-2.5 rounded-xl border border-dark-600/50 bg-dark-800/60 px-4 py-3">
							<span class="text-lg">{feat.icon}</span>
							<span class="text-sm font-medium text-dark-300">{feat.text}</span>
						</div>
					{/each}
				</div>

				<div class="mt-8">
					<Button href="/about" variant="secondary">Learn More About Us</Button>
				</div>
			</div>

			<!-- Right: Animated graphic -->
			<div class="relative flex items-center justify-center" use:scrollReveal={{ direction: 'right' }}>
				<div class="relative h-[420px] w-[420px]">
					<!-- Outer glow -->
					<div class="absolute inset-0 rounded-full bg-accent-cyan/5 blur-3xl"></div>

					<!-- Orbiting rings -->
					<div class="absolute inset-0 animate-spin-slow rounded-full border border-dark-600/40"></div>
					<div class="absolute inset-8 animate-spin-slow-reverse rounded-full border border-accent-cyan/20"></div>
					<div class="absolute inset-16 animate-spin-slow rounded-full border border-accent-blue/15"></div>

					<!-- Center logo box -->
					<div class="absolute inset-0 flex items-center justify-center">
						<div class="relative">
							<div class="h-28 w-28 rounded-3xl border border-accent-cyan/30 bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center shadow-2xl shadow-accent-cyan/20">
								<span class="font-mono text-3xl font-bold text-accent-cyan">AT</span>
							</div>
							<div class="absolute inset-0 rounded-3xl bg-accent-cyan/10 blur-2xl"></div>
						</div>
					</div>

					<!-- Orbiting node badges -->
					{#each [
						{ angle: 0,   label: 'IoT',     color: 'accent-cyan' },
						{ angle: 90,  label: 'Cloud',   color: 'accent-blue' },
						{ angle: 180, label: 'AI/ML',   color: 'accent-purple' },
						{ angle: 270, label: 'SCADA',   color: 'accent-cyan' }
					] as node, i}
						<div
							class="absolute flex items-center justify-center"
							style="
								width: 56px; height: 56px;
								top: 50%; left: 50%;
								transform: rotate({node.angle}deg) translateY(-168px) rotate(-{node.angle}deg) translate(-50%, -50%);
								animation: orbit-pulse 2s ease-in-out {i * 0.5}s infinite alternate;
							"
						>
							<div class="rounded-xl border border-dark-500 bg-dark-800 px-2.5 py-1.5 text-center shadow-lg">
								<span class="font-mono text-xs font-bold text-accent-cyan">{node.label}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ===== 3. HOW WE WORK ===== -->
<section class="relative py-32 bg-dark-950 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950 opacity-80"></div>

	<div class="relative mx-auto max-w-7xl px-6 lg:px-8">
		<SectionHeading
			label="Our Process"
			title="How We Deliver Results"
			subtitle="A proven five-step framework that takes you from idea to live system — and keeps it running."
		/>

		<!-- Desktop: horizontal row; Mobile: vertical stack -->
		<div class="relative mt-16">
			<!-- Connecting line (desktop only) -->
			<div class="absolute top-[52px] left-[calc(10%+28px)] right-[calc(10%+28px)] hidden h-px lg:block">
				<div class="h-full bg-gradient-to-r from-accent-cyan/40 via-accent-blue/40 to-accent-purple/40"></div>
			</div>

			<div class="grid gap-8 lg:grid-cols-5">
				{#each processSteps as step, i}
					<div
						class="group relative flex flex-col items-center text-center lg:items-center"
						use:scrollReveal={{ delay: i * 0.12 }}
					>
						<!-- Numbered badge -->
						<div class="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent-cyan/40 bg-dark-900 font-mono text-lg font-bold text-accent-cyan shadow-lg shadow-accent-cyan/10 transition-all duration-300 group-hover:border-accent-cyan group-hover:bg-accent-cyan/10 group-hover:shadow-accent-cyan/30">
							{step.num}
						</div>

						<!-- Step card -->
						<div class="rounded-xl border border-dark-600/60 bg-dark-800 p-5 transition-all duration-300 group-hover:border-accent-cyan/40 group-hover:shadow-lg group-hover:shadow-accent-cyan/5">
							<h3 class="mb-2 text-base font-bold text-dark-100 transition-colors group-hover:text-accent-cyan">
								{step.name}
							</h3>
							<p class="text-xs leading-relaxed text-dark-400">{step.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ===== SERVICES SECTION ===== -->
<section class="relative py-32">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950"></div>

	<div class="relative mx-auto max-w-7xl px-6 lg:px-8">
		<SectionHeading
			label="What We Do"
			title="Comprehensive Technology Services"
			subtitle="From strategic consulting to hands-on implementation, we deliver end-to-end technology solutions."
		/>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
			{#each data.services as service, i}
				<div
					class="group relative flex flex-col rounded-2xl border border-dark-600/60 bg-dark-800 p-7 transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-lg hover:shadow-accent-cyan/10"
					use:tiltCard={{ maxTilt: 8, glare: true }}
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<!-- Top accent line -->
					<div class="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

					<div class="mb-5 inline-flex self-start rounded-xl bg-accent-cyan/10 p-3 text-accent-cyan ring-1 ring-accent-cyan/20">
						{@html serviceIcons[service.icon || 'network']}
					</div>

					<h3 class="mb-3 text-lg font-semibold text-dark-100 transition-colors group-hover:text-accent-cyan">
						{service.title}
					</h3>

					<p class="flex-1 text-sm leading-relaxed text-dark-400">{service.description}</p>

					<a
						href="/services/{service.slug}"
						class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan/70 transition-all group-hover:gap-2.5 group-hover:text-accent-cyan"
					>
						Learn more
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ===== 4. FEATURED CASE STUDIES ===== -->
{#if data.featuredCaseStudies.length > 0}
<section class="relative py-32 bg-dark-900">
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-dark-600/60 to-transparent"></div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<SectionHeading
			label="Client Success"
			title="Real Results, Real Impact"
			subtitle="Proven outcomes from our most complex enterprise engagements."
		/>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.featuredCaseStudies as cs, i}
				{@const metrics = cs.metrics ? (() => { try { return JSON.parse(cs.metrics); } catch { return []; } })() : []}
				{@const technologies = cs.technologies ? (() => { try { return JSON.parse(cs.technologies); } catch { return []; } })() : []}
				<div
					class="group flex flex-col overflow-hidden rounded-2xl border border-dark-600/60 bg-dark-800 transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-xl hover:shadow-accent-cyan/10"
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<!-- Gradient header -->
					<div
						class="relative h-32 p-5"
						style="background: {cs.coverGradient || 'linear-gradient(135deg, #0a2540 0%, #0d3b5e 100%)'};"
					>
						<span class="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
							{cs.industry}
						</span>
						<p class="mt-2 font-mono text-sm font-semibold text-white/70">{cs.client}</p>
					</div>

					<div class="flex flex-1 flex-col p-6">
						<h3 class="mb-4 text-base font-bold leading-snug text-dark-100 transition-colors group-hover:text-accent-cyan">
							{cs.title}
						</h3>

						<!-- Key metrics -->
						{#if metrics.length > 0}
							<div class="mb-5 grid grid-cols-2 gap-3">
								{#each metrics.slice(0, 2) as metric}
									<div class="rounded-lg border border-dark-600/50 bg-dark-900/60 p-3 text-center">
										<div class="text-xl font-bold text-accent-cyan">{metric.value}</div>
										<div class="mt-0.5 text-xs text-dark-400">{metric.label}</div>
									</div>
								{/each}
							</div>
						{/if}

						<!-- Technologies -->
						{#if technologies.length > 0}
							<div class="mb-5 flex flex-wrap gap-1.5">
								{#each technologies.slice(0, 3) as tech}
									<span class="rounded-md border border-dark-600 bg-dark-900 px-2 py-0.5 font-mono text-xs text-dark-400">
										{tech}
									</span>
								{/each}
							</div>
						{/if}

						<a
							href="/case-studies/{cs.slug}"
							class="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan/70 transition-all group-hover:gap-3 group-hover:text-accent-cyan"
						>
							Read Full Case Study
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
						</a>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-12 text-center" use:scrollReveal>
			<Button href="/case-studies" variant="secondary" size="lg">View All Case Studies</Button>
		</div>
	</div>
</section>
{/if}

<!-- ===== 5. DEVICE LIFECYCLE ===== -->
{#if data.devices.length > 0}
<section class="relative py-24 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 to-dark-900"></div>
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent"></div>

	<div class="relative mx-auto max-w-7xl px-6">
		<!-- Header -->
		<div class="mb-10" data-gsap="reveal">
			<p class="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-accent-cyan">Device Lifecycle</p>
			<h2 class="text-4xl font-bold leading-tight text-dark-50 md:text-5xl">
				Rent or buy enterprise hardware<br class="hidden md:block" />
				<span class="text-dark-200">with managed deployment support</span>
			</h2>
			<div class="mt-4 h-0.5 w-16 bg-gradient-to-r from-accent-cyan to-accent-blue"></div>
		</div>

		<!-- Scrolling rail -->
		<div class="device-rail overflow-hidden rounded-2xl border border-dark-700/60 bg-dark-900/60">
			<div class="device-track flex gap-3 p-3" style="width: max-content;">
				{#each [...data.devices, ...data.devices] as device}
					{@const specs = device.specs ? JSON.parse(device.specs) : {}}
					{@const categoryLabel = device.category === 'network' ? 'Network Appliance' : device.category === 'laptop' ? 'Laptop' : device.category === 'desktop' ? 'Desktop' : device.category === 'bundle' ? 'Project Bundle' : device.category}
					{@const hasRent = device.rentPriceMonthly}
					{@const hasBuy = device.buyPrice}
					{@const optionLabel = hasRent && hasBuy ? 'Rent / Buy' : hasRent ? 'Rent' : 'Buy'}
					{@const priceLabel = device.rentPriceMonthly ? `from IDR ${device.rentPriceMonthly} / month` : device.buyPrice ? `from IDR ${device.buyPrice}` : 'Custom quote'}

					<article class="device-card flex w-72 flex-shrink-0 flex-col gap-2 rounded-xl border border-dark-700/50 bg-gradient-to-b from-dark-800/90 to-dark-900/95 p-4">
						<p class="font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-accent-cyan">{categoryLabel}</p>
						<h3 class="text-base font-bold text-dark-50">{device.name}</h3>
						{#if specs.cpu || specs.ram}
							<small class="text-xs text-dark-300">
								{[specs.cpu, specs.ram, specs.storage].filter(Boolean).join(', ')}
							</small>
						{/if}
						<div class="mt-auto flex items-center justify-between pt-2">
							<span class="rounded-full bg-accent-cyan/10 px-2.5 py-1 text-xs font-medium text-accent-cyan border border-accent-cyan/20">{optionLabel}</span>
							<strong class="text-xs font-semibold text-dark-100">{priceLabel}</strong>
						</div>
						<em class="text-xs not-italic text-dark-400">
							{device.availability === 'in-stock' ? 'Ready Stock' : device.availability === 'pre-order' ? 'Pre-order' : device.availability === 'custom-quote' ? 'Custom Quote' : device.availability}
						</em>
					</article>
				{/each}
			</div>
		</div>

		<!-- CTA -->
		<div class="mt-8 flex items-center justify-between" data-gsap="reveal">
			<p class="text-sm text-dark-400">All devices come with warranty, setup, and optional managed support.</p>
			<a href="/services/device-rental" class="group flex items-center gap-2 text-sm font-medium text-accent-cyan hover:text-accent-blue transition-colors">
				View full catalog
				<svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
			</a>
		</div>
	</div>
</section>
{/if}

<!-- ===== 5b. TESTIMONIALS ===== -->
{#if data.testimonials.length > 0}
<section class="relative py-32 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950"></div>
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent"></div>

	<!-- Subtle background glow -->
	<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
		<div class="h-[400px] w-[800px] rounded-full bg-accent-cyan/3 blur-[120px]"></div>
	</div>

	<div class="relative mx-auto max-w-7xl px-6 lg:px-8">
		<SectionHeading
			label="Client Voices"
			title="What Our Clients Say"
			subtitle="Outcomes measured in real business value, not just technical deliverables."
		/>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.testimonials.slice(0, 3) as testimonial, i}
				<div
					class="group relative flex flex-col rounded-2xl border border-dark-600/60 bg-dark-800 p-8 transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-xl hover:shadow-accent-cyan/5"
					use:tiltCard={{ maxTilt: 6 }}
					use:scrollReveal={{ delay: i * 0.12 }}
				>
					<!-- Cyan quote mark -->
					<div class="mb-5 text-accent-cyan/30 transition-colors group-hover:text-accent-cyan/50">
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
							<path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
						</svg>
					</div>

					<!-- Quote text -->
					<p class="flex-1 text-sm leading-relaxed text-dark-300 italic">
						"{testimonial.quote}"
					</p>

					<!-- Stars -->
					<div class="mt-5 flex gap-0.5">
						{#each { length: 5 } as _, s}
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={s < (testimonial.rating ?? 5) ? '#f59e0b' : 'none'} stroke="#f59e0b" stroke-width="1.5">
								<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
							</svg>
						{/each}
					</div>

					<!-- Author -->
					<div class="mt-5 flex items-center gap-3 border-t border-dark-600/50 pt-5">
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold {avatarColors[i % avatarColors.length]}">
							{getInitials(testimonial.authorName)}
						</div>
						<div class="min-w-0">
							<p class="truncate text-sm font-semibold text-dark-100">{testimonial.authorName}</p>
							<p class="truncate text-xs text-dark-400">{testimonial.authorTitle} · {testimonial.authorCompany}</p>
						</div>
						{#if testimonial.industry}
							<span class="ml-auto shrink-0 rounded-full border border-dark-600 bg-dark-900 px-2.5 py-1 text-xs text-dark-400">
								{testimonial.industry}
							</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- ===== INDUSTRY SHOWCASE ===== -->
<section class="py-32 bg-dark-950">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<SectionHeading
			label="Industries"
			title="Solutions Across Sectors"
			subtitle="Deep domain expertise in industries where technology makes the biggest difference."
		/>

		<div class="grid gap-6 md:grid-cols-2">
			{#each data.industries as industry, i}
				<a
					href="/solutions/{industry.slug}"
					class="group relative overflow-hidden rounded-2xl border border-dark-600/60 bg-dark-800 p-8 transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-xl hover:shadow-accent-cyan/10"
					use:scrollReveal={{ direction: i % 2 === 0 ? 'left' : 'right', delay: i * 0.1 }}
				>
					<!-- Top accent line on hover -->
					<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

					<!-- Dot grid pattern -->
					<div class="pointer-events-none absolute inset-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.07]">
						<div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, #00e5ff 1px, transparent 0); background-size: 24px 24px;"></div>
					</div>

					<!-- Gradient glow on hover -->
					<div class="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

					<div class="relative">
						<div class="mb-5 inline-flex rounded-xl bg-accent-cyan/10 p-3 text-accent-cyan ring-1 ring-accent-cyan/20">
							{@html industryIcons[industry.slug] || industryIcons['manufacturing']}
						</div>
						<h3 class="mb-3 text-xl font-bold text-dark-100 transition-colors group-hover:text-accent-cyan">
							{industry.name}
						</h3>
						<p class="leading-relaxed text-dark-400">{industry.description}</p>

						<!-- Solution tags -->
						{#if industry.solutions}
							<div class="mt-5 flex flex-wrap gap-2">
								{#each JSON.parse(industry.solutions).slice(0, 3) as solution}
									<span class="rounded-md border border-dark-600 bg-dark-900 px-2.5 py-1 text-xs text-dark-300">
										{solution}
									</span>
								{/each}
							</div>
						{/if}

						<div class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan">
							Explore solutions
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform group-hover:translate-x-1.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ===== STATS SECTION ===== -->
<section class="relative py-28 overflow-hidden bg-dark-900">
	<div class="absolute inset-0 bg-gradient-to-r from-accent-cyan/8 via-accent-blue/8 to-accent-purple/8"></div>
	<!-- Top separator line -->
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent"></div>
	<div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent"></div>

	<!-- Animated background lines -->
	<div class="absolute inset-0 opacity-10" use:parallax={{ speed: 0.2 }}>
		<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
					<path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" stroke-width="0.5" class="text-accent-cyan" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)" />
		</svg>
	</div>

	<div class="relative mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid grid-cols-2 gap-12 md:grid-cols-4">
			{#each stats as stat, i}
				<div class="text-center" use:scrollReveal={{ delay: i * 0.1 }}>
					<div class="text-4xl font-bold text-accent-cyan md:text-5xl">
						<span use:counterUp={{ suffix: stat.suffix }}>{stat.value}</span>
					</div>
					<div class="mt-2 text-sm text-dark-400">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ===== 2. PARTNER STRIP ===== -->
{#if data.technologyPartners.length > 0}
<section class="relative bg-dark-950 py-16">
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-dark-600/60 to-transparent"></div>
	<div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-dark-600/60 to-transparent"></div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-8 flex items-center justify-between" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-dark-500">
				Our Technology Partners
			</span>
			<a
				href="/partners"
				class="inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan/70 transition-colors hover:text-accent-cyan"
			>
				View All Partners
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</a>
		</div>

		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
			{#each data.technologyPartners as partner, i}
				<div use:scrollReveal={{ delay: i * 0.07 }}>
					<PartnerLogo name={partner.name} tier={partner.tier} />
				</div>
			{/each}
		</div>
	</div>
</section>
{/if}

<!-- ===== 6. INSIGHTS TEASER ===== -->
{#if data.recentInsights.length > 0}
<section class="relative py-32 bg-dark-900">
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-dark-600/60 to-transparent"></div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<SectionHeading
			label="Latest Insights"
			title="From Our Technology Team"
			subtitle="Perspectives on enterprise technology, integration patterns, and industry trends."
		/>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.recentInsights as insight, i}
				<a
					href="/insights/{insight.slug}"
					class="group flex flex-col overflow-hidden rounded-2xl border border-dark-600/60 bg-dark-800 transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-xl hover:shadow-accent-cyan/10"
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<!-- Gradient top band -->
					<div
						class="h-24"
						style="background: {insight.coverGradient || 'linear-gradient(135deg, #0a1628 0%, #0d2545 100%)'};"
					>
						<div class="flex h-full items-end p-4">
							<span class="rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm {getCategoryClass(insight.category)}">
								{insight.category}
							</span>
						</div>
					</div>

					<div class="flex flex-1 flex-col p-6">
						<h3 class="mb-3 line-clamp-2 text-base font-bold leading-snug text-dark-100 transition-colors group-hover:text-accent-cyan">
							{insight.title}
						</h3>

						<p class="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-dark-400">
							{insight.excerpt}
						</p>

						<div class="flex items-center justify-between border-t border-dark-600/50 pt-4 text-xs text-dark-500">
							<span class="font-medium text-dark-400">{insight.author}</span>
							<span>{insight.readTime} min read</span>
						</div>
					</div>
				</a>
			{/each}
		</div>

		<div class="mt-12 text-center" use:scrollReveal>
			<Button href="/insights" variant="secondary" size="lg">View All Insights</Button>
		</div>
	</div>
</section>
{/if}

<!-- ===== CTA SECTION ===== -->
<section class="relative py-32 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950"></div>

	<!-- Floating orbs -->
	<div class="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-accent-cyan/5 blur-3xl animate-pulse"></div>
	<div class="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-accent-blue/5 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>

	<div class="relative mx-auto max-w-3xl px-6 text-center" use:scrollReveal>
		<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
			Ready to Start?
		</span>
		<h2 class="mt-4 text-3xl font-bold text-dark-100 md:text-5xl">
			Let's Build Something
			<span class="bg-gradient-to-r from-accent-cyan to-accent-blue bg-clip-text text-transparent">
				Extraordinary
			</span>
		</h2>
		<p class="mt-6 text-lg text-dark-400">
			Whether you're deploying IoT sensors underground, integrating medical devices, or scaling your
			IT team — we have the expertise to make it happen.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<Button href="/contact" variant="primary" size="lg">Get in Touch</Button>
			<Button href="/solutions" variant="secondary" size="lg">View Solutions</Button>
		</div>
	</div>
</section>

<style>
	@keyframes spin-slow {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	@keyframes orbit-pulse {
		from { opacity: 0.5; transform: rotate(var(--angle, 0deg)) translateY(-168px) rotate(calc(-1 * var(--angle, 0deg))) translate(-50%, -50%) scale(0.9); }
		to   { opacity: 1;   transform: rotate(var(--angle, 0deg)) translateY(-168px) rotate(calc(-1 * var(--angle, 0deg))) translate(-50%, -50%) scale(1); }
	}

	@keyframes marquee-scroll {
		0%   { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}

	/* Device rail infinite scroll */
	.device-track {
		animation: device-slide 28s linear infinite;
	}
	.device-rail:hover .device-track {
		animation-play-state: paused;
	}
	@keyframes device-slide {
		to { transform: translateX(-50%); }
	}

	:global(.animate-spin-slow) {
		animation: spin-slow 20s linear infinite;
	}

	:global(.animate-spin-slow-reverse) {
		animation: spin-slow 15s linear infinite reverse;
	}

	:global(.animate-marquee-scroll) {
		animation: marquee-scroll 30s linear infinite;
	}


</style>
