<script lang="ts">
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { counterUp } from '$lib/animations/actions/counterUp';
	import { tiltCard } from '$lib/animations/actions/tiltCard';

	let { data } = $props();

	const timeline = [
		{ year: '2012', title: 'Founded in Jakarta', description: 'Asiateknologi established as an IT consulting firm focused on system integration.' },
		{ year: '2015', title: 'IoT Division Launched', description: 'Expanded into IoT solutions, deploying first sensor network for mining operations.' },
		{ year: '2017', title: 'Healthcare & Finance', description: 'Entered medical device integration and financial systems markets.' },
		{ year: '2019', title: 'Recruitment Division', description: 'Launched IT staffing and outsourcing services to meet growing demand.' },
		{ year: '2021', title: 'Device Solutions', description: 'Added technology device rental and lifecycle management services.' },
		{ year: '2024', title: 'Regional Expansion', description: 'Extended operations across Southeast Asia with offices in multiple countries.' }
	];

	const values = [
		{
			title: 'Technical Excellence',
			description: 'We pursue deep expertise across every technology we deploy, ensuring our solutions are not just functional but optimal.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`
		},
		{
			title: 'Industry-First Thinking',
			description: 'We start with understanding your industry before recommending technology — because context determines the right solution.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`
		},
		{
			title: 'Reliability',
			description: 'Our systems run in mission-critical environments — underground mines, hospital wards, bank vaults. Reliability is non-negotiable.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>`
		},
		{
			title: 'Partnership',
			description: 'We invest in long-term relationships with our clients, becoming an extension of their technology team rather than a vendor.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
		}
	];
</script>

<svelte:head>
	<title>About Us - Asiateknologi</title>
	<meta name="description" content="Learn about Asiateknologi's mission, team, and journey in IT consulting and system integration across Asia." />
</svelte:head>

<!-- Hero -->
<section class="relative pt-32 pb-16 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<div class="relative mx-auto max-w-7xl px-6 text-center">
		<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan" use:scrollReveal>
			About Us
		</span>
		<h1 class="mt-4 text-4xl font-bold text-dark-100 md:text-6xl" use:textScramble>
			Building the Infrastructure of Tomorrow
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg text-dark-400" use:scrollReveal={{ delay: 0.2 }}>
			Since 2012, we've been at the intersection of enterprise technology and industry-specific
			challenges, delivering solutions that make real-world impact.
		</p>
	</div>
</section>

<!-- Timeline -->
<section class="py-24 bg-dark-900">
	<div class="mx-auto max-w-4xl px-6">
		<SectionHeading label="Our Journey" title="Milestones" />

		<div class="relative">
			<!-- Vertical line -->
			<div class="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan/50 via-accent-blue/30 to-transparent md:left-1/2"></div>

			{#each timeline as item, i}
				<div
					class="relative mb-12 pl-16 md:pl-0 {i % 2 === 0 ? 'md:pr-[calc(50%+2rem)] md:text-right' : 'md:pl-[calc(50%+2rem)]'}"
					use:scrollReveal={{ direction: i % 2 === 0 ? 'right' : 'left', delay: i * 0.1 }}
				>
					<!-- Dot -->
					<div class="absolute left-4 top-1 h-4 w-4 rounded-full border-2 border-accent-cyan bg-dark-950 md:left-[calc(50%-0.5rem)]"></div>

					<span class="font-mono text-sm font-bold text-accent-cyan">{item.year}</span>
					<h3 class="mt-1 text-xl font-bold text-dark-100">{item.title}</h3>
					<p class="mt-2 text-dark-400">{item.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Values -->
<section class="py-24 bg-dark-950">
	<div class="mx-auto max-w-7xl px-6">
		<SectionHeading label="What Drives Us" title="Our Values" />

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
			{#each values as value, i}
				<div
					class="rounded-2xl border border-dark-700 bg-dark-900 p-6 transition-all hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5"
					use:tiltCard={{ maxTilt: 6 }}
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<div class="mb-4 inline-flex rounded-xl bg-accent-cyan/10 p-3 text-accent-cyan">
						{@html value.icon}
					</div>
					<h3 class="mb-2 text-lg font-semibold text-dark-100">{value.title}</h3>
					<p class="text-sm text-dark-400 leading-relaxed">{value.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Team -->
<section class="py-24 bg-dark-900">
	<div class="mx-auto max-w-7xl px-6">
		<SectionHeading label="Our Team" title="Meet the People Behind the Technology" />

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.team as member, i}
				<div
					class="group overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-950 transition-all hover:border-accent-cyan/30"
					use:scrollReveal={{ delay: i * 0.1 }}
				>
					<!-- Avatar placeholder -->
					<div class="relative h-48 bg-gradient-to-br from-dark-800 to-dark-700 flex items-center justify-center overflow-hidden">
						<div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0); background-size: 16px 16px;"></div>
						<span class="text-5xl font-bold text-dark-600 group-hover:text-accent-cyan/30 transition-colors">
							{member.name.split(' ').map((n: string) => n[0]).join('')}
						</span>
					</div>

					<div class="p-6">
						<h3 class="text-lg font-semibold text-dark-100 group-hover:text-accent-cyan transition-colors">
							{member.name}
						</h3>
						<p class="mt-1 font-mono text-xs text-accent-cyan">{member.role}</p>
						{#if member.bio}
							<p class="mt-3 text-sm text-dark-400 leading-relaxed">{member.bio}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-24 bg-dark-950">
	<div class="mx-auto max-w-3xl px-6 text-center" use:scrollReveal>
		<h2 class="text-3xl font-bold text-dark-100 md:text-4xl">Want to Join Our Team?</h2>
		<p class="mt-4 text-lg text-dark-400">
			We're always looking for talented engineers and consultants who are passionate about
			solving complex technology challenges.
		</p>
		<div class="mt-8">
			<Button href="/contact" variant="primary" size="lg">Get in Touch</Button>
		</div>
	</div>
</section>
