<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { tiltCard } from '$lib/animations/actions/tiltCard';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { counterUp } from '$lib/animations/actions/counterUp';

	// FAQ accordion state
	let openFaq = $state(-1);
	function toggleFaq(i: number) {
		openFaq = openFaq === i ? -1 : i;
	}

	const services = [
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>`,
			title: 'Search Engine Optimization',
			desc: 'Technical SEO audits, on-page optimization, link building, and local SEO strategies that drive sustainable organic growth.',
			color: '#ec4899'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
			title: 'Social Media Marketing',
			desc: 'Community management, paid social campaigns, influencer partnerships, and content creation across all major platforms.',
			color: '#fb923c'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
			title: 'Paid Media & PPC',
			desc: 'Google Ads, Meta Ads, LinkedIn Ads, and programmatic buying with real-time bidding optimization and ROAS tracking.',
			color: '#f59e0b'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>`,
			title: 'Content Marketing',
			desc: 'Blog strategy, whitepapers, video production, and thought leadership content that positions your brand as an industry authority.',
			color: '#ec4899'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
			title: 'Email & Marketing Automation',
			desc: 'Drip campaigns, lead nurturing sequences, segmentation, A/B testing, and full CRM integration with HubSpot and Mailchimp.',
			color: '#fb923c'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
			title: 'Analytics & Conversion',
			desc: 'Full-funnel analytics setup, attribution modeling, conversion rate optimization, and data-driven reporting dashboards.',
			color: '#f59e0b'
		}
	];

	const eventServices = [
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>`,
			title: 'Technology Seminars',
			desc: 'Vendor-sponsored educational seminars that position emerging technologies in front of qualified enterprise audiences.',
			color: '#ec4899'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
			title: 'Executive Roundtables',
			desc: 'Intimate, invite-only sessions for C-level and VP-level decision-makers featuring moderated discussions on industry trends.',
			color: '#fb923c'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m15 10 5-5"/><path d="M20 10V5h-5"/><rect width="14" height="11" x="5" y="11" rx="2"/><path d="M5 15h14"/></svg>`,
			title: 'Product Launch Events',
			desc: 'End-to-end event production for technology product launches — from venue sourcing and creative design to live demos.',
			color: '#f59e0b'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/><rect width="18" height="18" x="3" y="4" rx="2"/><circle cx="12" cy="10" r="2"/><line x1="8" y1="2" x2="8" y2="4"/><line x1="16" y1="2" x2="16" y2="4"/></svg>`,
			title: 'Webinars & Virtual Events',
			desc: 'High-production virtual events with live Q&A, breakout rooms, on-demand replay, and integrated lead capture.',
			color: '#ec4899'
		}
	];

	const processSteps = [
		{ num: '01', title: 'Audit & Discovery', desc: 'Deep analysis of your current digital presence, competitor landscape, and target audience behavior.' },
		{ num: '02', title: 'Strategy & Planning', desc: 'Data-informed strategy with clear KPIs, channel mix, budget allocation, and content calendar.' },
		{ num: '03', title: 'Creative Execution', desc: 'Campaign launch across selected channels with brand-consistent creative assets and messaging.' },
		{ num: '04', title: 'Optimize & Scale', desc: 'Continuous A/B testing, bid optimization, audience refinement, and budget reallocation based on performance.' },
		{ num: '05', title: 'Report & Iterate', desc: 'Monthly performance reporting with actionable insights and strategic recommendations for the next cycle.' }
	];

	const faqs = [
		{ q: 'What is the minimum budget for a paid media campaign?', a: 'We typically recommend a minimum media spend of $3,000/month for paid search and $2,000/month for paid social to generate statistically significant data. Our management fees are separate and scale with spend.' },
		{ q: 'How long before we see results from SEO?', a: 'SEO is a long-term investment. Most clients see measurable improvements in rankings within 3-4 months, with significant traffic growth by month 6. We provide monthly progress reports from day one.' },
		{ q: 'Do you handle creative production in-house?', a: 'Yes. Our team includes graphic designers, copywriters, video editors, and motion designers. We produce all campaign assets, social content, and event collateral internally for faster turnaround and brand consistency.' },
		{ q: 'Can you manage events outside of Indonesia?', a: 'Absolutely. We have organized events across Jakarta, Singapore, Kuala Lumpur, Bangkok, and Manila. Our event team handles venue sourcing, logistics, speaker coordination, and on-site production regionally.' },
		{ q: 'How do you measure event ROI?', a: 'We track registrations, attendance rate, engagement scores, post-event survey NPS, leads generated, and pipeline influenced. Every event includes a detailed post-event analytics report with revenue attribution.' },
		{ q: 'What platforms do you specialize in?', a: 'Google Ads, Meta (Facebook/Instagram), LinkedIn, TikTok, YouTube, and programmatic. For marketing automation, we are certified partners of HubSpot and experienced with Mailchimp, Marketo, and Pardot.' }
	];

	let activeStep = $state(0);
	onMount(() => {
		const t = setInterval(() => {
			activeStep = (activeStep + 1) % processSteps.length;
		}, 3000);
		return () => clearInterval(t);
	});
</script>

<svelte:head>
	<title>Digital Marketing & Events | Asiateknologi</title>
	<meta name="description" content="Data-driven digital marketing and high-impact event services across Southeast Asia. SEO, paid media, social media, tech seminars, executive roundtables, and more." />
</svelte:head>

<!-- ===== HERO ===== -->
<section class="relative min-h-[90vh] overflow-hidden bg-dark-950 pt-32 pb-20">
	<!-- Gradient orbs -->
	<div class="pointer-events-none absolute inset-0">
		<div class="absolute -left-40 top-20 h-[600px] w-[600px] rounded-full opacity-20 blur-[150px]"
			style="background: radial-gradient(circle, rgba(236,72,153,0.7), transparent 70%);"></div>
		<div class="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full opacity-15 blur-[130px]"
			style="background: radial-gradient(circle, rgba(251,146,60,0.6), transparent 70%);"></div>
		<div class="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-10 blur-[120px]"
			style="background: radial-gradient(circle, rgba(245,158,11,0.5), transparent 70%);"></div>
	</div>

	<!-- Grid pattern overlay -->
	<div class="pointer-events-none absolute inset-0 opacity-[0.03]"
		style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>

	<div class="relative mx-auto max-w-7xl px-6 lg:px-8">
		<!-- Breadcrumb -->
		<nav class="mb-12 flex items-center gap-2 font-mono text-xs text-dark-500" use:scrollReveal>
			<a href="/" class="transition-colors hover:text-dark-300">Home</a>
			<span>/</span>
			<a href="/services" class="transition-colors hover:text-dark-300">Services</a>
			<span>/</span>
			<span class="text-pink-400">Digital Marketing & Events</span>
		</nav>

		<div class="grid items-center gap-16 lg:grid-cols-2">
			<div use:scrollReveal>
				<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/5 px-4 py-1.5">
					<div class="h-2 w-2 animate-pulse rounded-full bg-pink-400"></div>
					<span class="font-mono text-xs font-semibold uppercase tracking-wider text-pink-400">Now Accepting Clients</span>
				</div>
				<h1 class="text-5xl font-bold leading-[1.1] text-white md:text-6xl lg:text-7xl" use:textScramble>
					Grow Revenue With
					<span class="bg-gradient-to-r from-pink-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
						Data-Driven Marketing
					</span>
				</h1>
				<p class="mt-6 max-w-xl text-lg leading-relaxed text-dark-400">
					From search and social to executive roundtables and product launches — we build full-funnel marketing engines that generate qualified pipeline for technology companies across Southeast Asia.
				</p>
				<div class="mt-10 flex flex-wrap gap-4">
					<Button href="/contact?service=digital-marketing" variant="primary" size="lg">Get a Free Audit</Button>
					<Button href="#services" variant="secondary" size="lg">View Services</Button>
				</div>

				<!-- Quick stats -->
				<div class="mt-12 flex flex-wrap gap-8 border-t border-dark-800 pt-8">
					{#each [
						{ value: 50, suffix: '+', label: 'Brands Served' },
						{ value: 3.5, suffix: 'x', label: 'Avg. ROAS' },
						{ value: 50, suffix: '+', label: 'Events Delivered' }
					] as stat}
						<div>
							<p class="text-3xl font-bold text-white">
								<span use:counterUp={{ target: stat.value, duration: 2000 }}>{stat.value}</span>{stat.suffix}
							</p>
							<p class="font-mono text-xs text-dark-500">{stat.label}</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- Hero visual — floating metric cards -->
			<div class="relative hidden lg:block" use:scrollReveal={{ delay: 0.3 }}>
				<div class="relative h-[500px]">
					<!-- Central glow -->
					<div class="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[80px]"></div>

					<!-- Floating cards -->
					<div class="absolute left-4 top-8 rounded-2xl border border-dark-700/50 bg-dark-900/80 p-5 backdrop-blur-md" style="animation: float-slow 6s ease-in-out infinite;">
						<p class="font-mono text-[10px] uppercase tracking-wider text-dark-500">Organic Traffic</p>
						<p class="mt-1 text-2xl font-bold text-green-400">+247%</p>
						<div class="mt-2 flex gap-0.5">
							{#each Array(12) as _, i}
								<div class="w-2 rounded-sm bg-green-400/60" style="height: {8 + Math.random() * 20}px;"></div>
							{/each}
						</div>
					</div>

					<div class="absolute right-0 top-16 rounded-2xl border border-dark-700/50 bg-dark-900/80 p-5 backdrop-blur-md" style="animation: float-slow 7s ease-in-out infinite 1s;">
						<p class="font-mono text-[10px] uppercase tracking-wider text-dark-500">Conversion Rate</p>
						<p class="mt-1 text-2xl font-bold text-pink-400">4.8%</p>
						<p class="mt-1 text-xs text-green-400">+1.2% vs last month</p>
					</div>

					<div class="absolute bottom-24 left-8 rounded-2xl border border-dark-700/50 bg-dark-900/80 p-5 backdrop-blur-md" style="animation: float-slow 5s ease-in-out infinite 0.5s;">
						<p class="font-mono text-[10px] uppercase tracking-wider text-dark-500">Event Attendees</p>
						<p class="mt-1 text-2xl font-bold text-orange-400">1,247</p>
						<p class="mt-1 text-xs text-dark-400">Last quarter</p>
					</div>

					<div class="absolute bottom-8 right-8 rounded-2xl border border-dark-700/50 bg-dark-900/80 p-5 backdrop-blur-md" style="animation: float-slow 8s ease-in-out infinite 2s;">
						<p class="font-mono text-[10px] uppercase tracking-wider text-dark-500">Ad Spend ROAS</p>
						<p class="mt-1 text-2xl font-bold text-amber-400">3.8x</p>
						<div class="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-dark-700">
							<div class="h-full w-[76%] rounded-full bg-gradient-to-r from-amber-400 to-orange-400"></div>
						</div>
					</div>

					<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-pink-500/20 bg-dark-900/90 p-6 backdrop-blur-md" style="animation: float-slow 6s ease-in-out infinite 1.5s;">
						<p class="font-mono text-[10px] uppercase tracking-wider text-pink-400">Campaign Performance</p>
						<div class="mt-3 flex items-end gap-1">
							{#each [40, 55, 35, 65, 50, 80, 70, 90, 75, 95] as h}
								<div class="w-3 rounded-t-sm bg-gradient-to-t from-pink-500 to-orange-400" style="height: {h}px; opacity: {0.4 + h/150};"></div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ===== PAIN POINTS ===== -->
<section class="relative bg-dark-900 py-24">
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"></div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-16 text-center" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-dark-500">Common Challenges</span>
			<h2 class="mt-4 text-3xl font-bold text-white md:text-4xl">Sound Familiar?</h2>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			{#each [
				{ icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`, title: 'Low Online Visibility', desc: 'Your competitors outrank you on Google and your brand barely registers on social media despite having a superior product.' },
				{ icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`, title: 'Inconsistent Lead Flow', desc: 'Pipeline depends on referrals and sporadic outbound. You need a predictable, scalable engine that fills your funnel every month.' },
				{ icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>`, title: 'No Event Capability', desc: 'You know executive events drive enterprise deals, but you lack the team, vendor relationships, and playbook to produce them.' }
			] as pain, i}
				<div
					class="group rounded-2xl border border-dark-700/40 bg-dark-800/30 p-7 transition-all duration-300 hover:border-pink-500/20 hover:bg-dark-800/60"
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<div class="mb-4 inline-flex rounded-xl bg-pink-500/10 p-3 text-pink-400">
						{@html pain.icon}
					</div>
					<h3 class="mb-2 text-lg font-semibold text-white">{pain.title}</h3>
					<p class="text-sm leading-relaxed text-dark-400">{pain.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ===== DIGITAL SERVICES ===== -->
<section id="services" class="relative bg-dark-950 py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-16" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">Digital Marketing</span>
			<h2 class="mt-4 text-3xl font-bold text-white md:text-4xl">Full-Channel Digital Capabilities</h2>
			<p class="mt-4 max-w-2xl text-dark-400">Every channel, every platform, one integrated strategy — designed to maximize your marketing ROI from first impression to closed deal.</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each services as svc, i}
				<div
					class="group relative overflow-hidden rounded-2xl border border-dark-700/40 bg-dark-900/60 p-7 transition-all duration-500 hover:border-white/10"
					use:tiltCard={{ maxTilt: 8 }}
					use:scrollReveal={{ delay: i * 0.08 }}
				>
					<div class="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						style="background: linear-gradient(90deg, transparent, {svc.color}, transparent);"></div>
					<div class="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-20"
						style="background: {svc.color};"></div>

					<div class="relative">
						<div class="mb-4 inline-flex rounded-xl p-3 transition-colors duration-300"
							style="background: {svc.color}12; color: {svc.color};">
							{@html svc.icon}
						</div>
						<h3 class="mb-2 text-lg font-semibold text-dark-100 transition-colors group-hover:text-white">{svc.title}</h3>
						<p class="text-sm leading-relaxed text-dark-400">{svc.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ===== EVENT SERVICES ===== -->
<section class="relative bg-dark-900 py-28">
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent"></div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-16" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">Event Services</span>
			<h2 class="mt-4 text-3xl font-bold text-white md:text-4xl">High-Impact Events That Drive Pipeline</h2>
			<p class="mt-4 max-w-2xl text-dark-400">From 30-person executive roundtables to 500-seat technology summits — we produce events that put your brand in front of the right decision-makers.</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			{#each eventServices as evt, i}
				<div
					class="group relative overflow-hidden rounded-2xl border border-dark-700/40 bg-dark-800/40 p-8 transition-all duration-500 hover:border-white/10"
					use:tiltCard={{ maxTilt: 6 }}
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<div class="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						style="background: linear-gradient(90deg, transparent, {evt.color}, transparent);"></div>
					<div class="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-20"
						style="background: {evt.color};"></div>

					<div class="relative">
						<div class="mb-4 inline-flex rounded-xl p-3 transition-colors duration-300"
							style="background: {evt.color}12; color: {evt.color};">
							{@html evt.icon}
						</div>
						<h3 class="mb-3 text-xl font-semibold text-dark-100 transition-colors group-hover:text-white">{evt.title}</h3>
						<p class="text-sm leading-relaxed text-dark-400">{evt.desc}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Event formats strip -->
		<div class="mt-16 flex flex-wrap items-center justify-center gap-3" use:scrollReveal={{ delay: 0.2 }}>
			{#each ['Keynote Sessions', 'Panel Discussions', 'Hands-on Workshops', 'Networking Dinners', 'Demo Stations', 'Hybrid/Virtual'] as format}
				<span class="rounded-full border border-dark-700/60 bg-dark-900/60 px-4 py-1.5 font-mono text-xs text-dark-400 transition-colors hover:border-orange-400/40 hover:text-dark-200">
					{format}
				</span>
			{/each}
		</div>
	</div>
</section>

<!-- ===== PROCESS ===== -->
<section class="relative bg-dark-950 py-28">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-16 text-center" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-dark-500">Our Process</span>
			<h2 class="mt-4 text-3xl font-bold text-white md:text-4xl">How We Deliver Results</h2>
		</div>

		<div class="grid gap-4 md:grid-cols-5">
			{#each processSteps as step, i}
				<button
					class="group relative cursor-pointer rounded-2xl border p-6 text-left transition-all duration-500 {activeStep === i ? 'border-pink-500/40 bg-pink-500/5' : 'border-dark-700/40 bg-dark-900/40 hover:border-dark-600'}"
					onclick={() => { activeStep = i; }}
					use:scrollReveal={{ delay: i * 0.08 }}
				>
					<div class="absolute inset-x-0 top-0 h-0.5 transition-all duration-500 {activeStep === i ? 'opacity-100' : 'opacity-0'}"
						style="background: linear-gradient(90deg, transparent, #ec4899, transparent);"></div>
					<span class="font-mono text-2xl font-bold {activeStep === i ? 'text-pink-400' : 'text-dark-700'} transition-colors duration-300">{step.num}</span>
					<h3 class="mt-2 text-sm font-semibold {activeStep === i ? 'text-white' : 'text-dark-300'} transition-colors">{step.title}</h3>
					<p class="mt-2 text-xs leading-relaxed {activeStep === i ? 'text-dark-300' : 'text-dark-500'} transition-colors">{step.desc}</p>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- ===== RESULTS ===== -->
<section class="relative bg-dark-900 py-28">
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"></div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-16 text-center" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-dark-500">Proven Results</span>
			<h2 class="mt-4 text-3xl font-bold text-white md:text-4xl">Numbers That Speak</h2>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each [
				{ value: 250, suffix: '%', label: 'Average Organic Growth', desc: 'Year-over-year traffic increase for SEO clients' },
				{ value: 3.5, suffix: 'x', label: 'Average ROAS', desc: 'Return on ad spend across paid campaigns' },
				{ value: 5000, suffix: '+', label: 'Event Attendees', desc: 'C-level and IT leaders engaged annually' },
				{ value: 45, suffix: '%', label: 'Lower CAC', desc: 'Reduced customer acquisition cost for clients' }
			] as stat, i}
				<div
					class="group rounded-2xl border border-dark-700/40 bg-dark-800/30 p-7 text-center transition-all duration-300 hover:border-pink-500/20"
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<p class="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-5xl font-bold text-transparent">
						<span use:counterUp={{ target: stat.value, duration: 2500 }}>{stat.value}</span>{stat.suffix}
					</p>
					<p class="mt-2 text-sm font-semibold text-white">{stat.label}</p>
					<p class="mt-1 text-xs text-dark-500">{stat.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ===== PLATFORMS ===== -->
<section class="relative bg-dark-950 py-20">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<p class="mb-8 text-center font-mono text-xs font-semibold uppercase tracking-[0.2em] text-dark-500" use:scrollReveal>
			Platforms & Tools We Use
		</p>
		<div class="flex flex-wrap items-center justify-center gap-3" use:scrollReveal={{ delay: 0.1 }}>
			{#each ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads', 'YouTube', 'HubSpot', 'Mailchimp', 'Google Analytics', 'SEMrush', 'Ahrefs', 'Zoom Events', 'Eventbrite', 'Canva', 'Figma'] as tool}
				<span class="rounded-full border border-dark-700/60 bg-dark-900/60 px-4 py-2 font-mono text-xs text-dark-400 transition-colors hover:border-pink-500/30 hover:text-dark-200">
					{tool}
				</span>
			{/each}
		</div>
	</div>
</section>

<!-- ===== FAQ ===== -->
<section class="relative bg-dark-900 py-28">
	<div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent"></div>

	<div class="mx-auto max-w-3xl px-6 lg:px-8">
		<div class="mb-16 text-center" use:scrollReveal>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-dark-500">FAQ</span>
			<h2 class="mt-4 text-3xl font-bold text-white md:text-4xl">Common Questions</h2>
		</div>

		<div class="space-y-3" use:scrollReveal={{ delay: 0.1 }}>
			{#each faqs as faq, i}
				<div class="overflow-hidden rounded-xl border transition-colors duration-300 {openFaq === i ? 'border-pink-500/30 bg-dark-800/60' : 'border-dark-700/40 bg-dark-800/20'}">
					<button
						class="flex w-full items-center justify-between px-6 py-5 text-left"
						onclick={() => toggleFaq(i)}
					>
						<span class="pr-4 text-sm font-semibold {openFaq === i ? 'text-white' : 'text-dark-200'}">{faq.q}</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0 text-dark-500 transition-transform duration-300 {openFaq === i ? 'rotate-180' : ''}">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</button>
					{#if openFaq === i}
						<div class="px-6 pb-5">
							<p class="text-sm leading-relaxed text-dark-400">{faq.a}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ===== FINAL CTA ===== -->
<section class="relative overflow-hidden bg-dark-950 py-28">
	<div class="pointer-events-none absolute inset-0">
		<div class="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[150px]"
			style="background: radial-gradient(circle, rgba(236,72,153,0.5), transparent 70%);"></div>
	</div>

	<div class="relative mx-auto max-w-3xl px-6 text-center lg:px-8" use:scrollReveal>
		<h2 class="text-4xl font-bold text-white md:text-5xl">
			Ready to Grow Your
			<span class="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">Pipeline?</span>
		</h2>
		<p class="mt-6 text-lg text-dark-400">
			Book a free 30-minute strategy call. We will audit your current marketing, identify quick wins, and outline a growth roadmap — no strings attached.
		</p>
		<div class="mt-10 flex flex-wrap justify-center gap-4">
			<Button href="/contact?service=digital-marketing" variant="primary" size="lg">Schedule a Free Consultation</Button>
			<Button href="/case-studies" variant="secondary" size="lg">View Case Studies</Button>
		</div>
	</div>
</section>

<style>
	@keyframes float-slow {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-12px); }
	}
</style>
