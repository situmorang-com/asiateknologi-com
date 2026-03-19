<script lang="ts">
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { tiltCard } from '$lib/animations/actions/tiltCard';
	import { textScramble } from '$lib/animations/actions/textScramble';

	let { data } = $props();

	const colors = [
		'from-cyan-500/10 to-blue-500/10',
		'from-blue-500/10 to-purple-500/10',
		'from-emerald-500/10 to-cyan-500/10',
		'from-purple-500/10 to-pink-500/10'
	];
</script>

<svelte:head>
	<title>Industry Solutions - Asiateknologi</title>
	<meta name="description" content="Technology solutions tailored for mining, financial services, healthcare, and manufacturing industries." />
</svelte:head>

<!-- Hero -->
<section class="relative pt-32 pb-16 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<div class="relative mx-auto max-w-7xl px-6 text-center">
		<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan" use:scrollReveal>
			Industry Solutions
		</span>
		<h1 class="mt-4 text-4xl font-bold text-dark-100 md:text-6xl" use:textScramble>
			Technology, Purpose-Built
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg text-dark-400" use:scrollReveal={{ delay: 0.2 }}>
			Every industry has unique challenges. We bring deep domain expertise and proven technology
			frameworks tailored to your sector's specific requirements.
		</p>
	</div>
</section>

<!-- Industry Grid -->
<section class="py-24 bg-dark-950">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid gap-8 md:grid-cols-2">
			{#each data.industries as industry, i}
				<a
					href="/solutions/{industry.slug}"
					class="group relative overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-900 transition-all hover:border-accent-cyan/30"
					use:tiltCard={{ maxTilt: 5 }}
					use:scrollReveal={{ delay: i * 0.15 }}
				>
					<!-- Gradient bg -->
					<div class="absolute inset-0 bg-gradient-to-br {colors[i % colors.length]} opacity-0 transition-opacity group-hover:opacity-100"></div>

					<div class="relative p-10">
						<!-- Number -->
						<span class="absolute top-6 right-6 font-mono text-6xl font-bold text-dark-800 group-hover:text-dark-700 transition-colors">
							{String(i + 1).padStart(2, '0')}
						</span>

						<h3 class="text-2xl font-bold text-dark-100 group-hover:text-accent-cyan transition-colors">
							{industry.name}
						</h3>

						<p class="mt-4 text-dark-400 leading-relaxed max-w-md">
							{industry.description}
						</p>

						{#if industry.solutions}
							<div class="mt-6 flex flex-wrap gap-2">
								{#each JSON.parse(industry.solutions).slice(0, 4) as solution}
									<span class="rounded-full border border-dark-700 px-3 py-1 text-xs text-dark-300 group-hover:border-accent-cyan/20">
										{solution}
									</span>
								{/each}
							</div>
						{/if}

						<div class="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan">
							View Solutions
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-24 bg-dark-900">
	<div class="mx-auto max-w-3xl px-6 text-center" use:scrollReveal>
		<h2 class="text-3xl font-bold text-dark-100 md:text-4xl">
			Don't see your industry?
		</h2>
		<p class="mt-4 text-lg text-dark-400">
			Our technology solutions are adaptable. Contact us to discuss how we can address your
			industry's specific challenges.
		</p>
		<div class="mt-8">
			<Button href="/contact" variant="primary" size="lg">Let's Talk</Button>
		</div>
	</div>
</section>
