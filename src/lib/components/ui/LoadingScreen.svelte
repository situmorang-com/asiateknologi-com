<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(true);
	let progress = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			progress += Math.random() * 15 + 5;
			if (progress >= 100) {
				progress = 100;
				clearInterval(interval);
				setTimeout(() => {
					visible = false;
				}, 400);
			}
		}, 100);

		return () => clearInterval(interval);
	});
</script>

{#if visible}
	<div
		class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-950 transition-opacity duration-500"
		class:opacity-0={progress >= 100}
		class:pointer-events-none={progress >= 100}
	>
		<!-- Circuit board animation -->
		<svg viewBox="0 0 200 200" class="mb-8 h-32 w-32">
			<defs>
				<linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="#00e5ff" />
					<stop offset="100%" stop-color="#3b82f6" />
				</linearGradient>
			</defs>
			<!-- Circuit paths -->
			<g stroke="url(#circuit-grad)" stroke-width="2" fill="none" class="circuit-paths">
				<path d="M100,20 L100,60 L140,60 L140,100" class="path-1" />
				<path d="M100,20 L100,60 L60,60 L60,100" class="path-2" />
				<path d="M60,100 L60,140 L100,140 L100,180" class="path-3" />
				<path d="M140,100 L140,140 L100,140" class="path-4" />
				<path d="M140,100 L180,100" class="path-5" />
				<path d="M60,100 L20,100" class="path-6" />
			</g>
			<!-- Nodes -->
			<g fill="url(#circuit-grad)" class="circuit-nodes">
				<circle cx="100" cy="20" r="4" class="node-1" />
				<circle cx="140" cy="100" r="4" class="node-2" />
				<circle cx="60" cy="100" r="4" class="node-3" />
				<circle cx="100" cy="180" r="4" class="node-4" />
				<circle cx="100" cy="100" r="6" class="node-center" />
				<circle cx="180" cy="100" r="3" class="node-5" />
				<circle cx="20" cy="100" r="3" class="node-6" />
			</g>
			<!-- Pulsing center -->
			<circle cx="100" cy="100" r="6" fill="none" stroke="#00e5ff" stroke-width="1" class="pulse-ring" />
		</svg>

		<div class="font-mono text-sm text-dark-400">
			<span class="text-accent-cyan">initializing</span> systems...
		</div>

		<!-- Progress bar -->
		<div class="mt-4 h-0.5 w-48 overflow-hidden rounded-full bg-dark-800">
			<div
				class="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue transition-all duration-200"
				style="width: {progress}%"
			></div>
		</div>
	</div>
{/if}

<style>
	.circuit-paths path {
		stroke-dasharray: 200;
		stroke-dashoffset: 200;
		animation: drawPath 1.5s ease-out forwards;
	}

	.path-1 { animation-delay: 0s; }
	.path-2 { animation-delay: 0.15s; }
	.path-3 { animation-delay: 0.3s; }
	.path-4 { animation-delay: 0.45s; }
	.path-5 { animation-delay: 0.6s; }
	.path-6 { animation-delay: 0.6s; }

	.circuit-nodes circle {
		opacity: 0;
		animation: nodeAppear 0.3s ease-out forwards;
	}

	.node-1 { animation-delay: 0s; }
	.node-2 { animation-delay: 0.4s; }
	.node-3 { animation-delay: 0.2s; }
	.node-4 { animation-delay: 0.6s; }
	.node-center { animation-delay: 0.1s; }
	.node-5 { animation-delay: 0.7s; }
	.node-6 { animation-delay: 0.7s; }

	.pulse-ring {
		animation: pulseRing 1.5s ease-out infinite;
	}

	@keyframes drawPath {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes nodeAppear {
		to {
			opacity: 1;
		}
	}

	@keyframes pulseRing {
		0% {
			r: 6;
			opacity: 1;
		}
		100% {
			r: 25;
			opacity: 0;
		}
	}
</style>
