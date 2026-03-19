<script lang="ts">
	import { magneticCursor } from '$lib/animations/actions/magneticCursor';
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		children: Snippet;
		onclick?: () => void;
		type?: 'button' | 'submit';
		disabled?: boolean;
	}

	let {
		href,
		variant = 'primary',
		size = 'md',
		children,
		onclick,
		type = 'button',
		disabled = false
	}: Props = $props();

	const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all relative overflow-hidden';

	const variants = {
		primary:
			'bg-gradient-to-r from-accent-cyan to-accent-blue text-dark-950 hover:shadow-lg hover:shadow-accent-cyan/25 hover:brightness-110',
		secondary:
			'border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/60',
		ghost: 'text-dark-300 hover:text-dark-100 hover:bg-dark-800'
	};

	const sizes = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-2.5 text-sm',
		lg: 'px-8 py-3 text-base'
	};

	const classes = $derived(`${baseClasses} ${variants[variant]} ${sizes[size]}`);
</script>

{#if href}
	<a {href} class={classes} use:magneticCursor={{ strength: 0.2, radius: 80 }}>
		{@render children()}
	</a>
{:else}
	<button
		{type}
		{disabled}
		{onclick}
		class={classes}
		class:opacity-50={disabled}
		class:cursor-not-allowed={disabled}
		use:magneticCursor={{ strength: 0.2, radius: 80 }}
	>
		{@render children()}
	</button>
{/if}
