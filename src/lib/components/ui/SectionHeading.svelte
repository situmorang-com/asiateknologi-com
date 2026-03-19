<script lang="ts">
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';

	interface Props {
		title: string;
		subtitle?: string;
		label?: string;
		center?: boolean;
	}

	let { title, subtitle, label, center = true }: Props = $props();
</script>

<div class="mb-12 {center ? 'text-center' : ''}" use:scrollReveal>
	{#if label}
		<span
			class="mb-4 inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
		>
			{label}
		</span>
	{/if}
	<h2 class="text-3xl font-bold text-dark-100 md:text-4xl lg:text-5xl" use:textScramble>
		{title}
	</h2>
	{#if subtitle}
		<p class="mx-auto mt-4 max-w-2xl text-lg text-dark-400">
			{subtitle}
		</p>
	{/if}
</div>
