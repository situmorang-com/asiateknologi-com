<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import LoadingScreen from '$lib/components/ui/LoadingScreen.svelte';
	import WhatsAppButton from '$lib/components/ui/WhatsAppButton.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
	const isAdmin = $derived($page.url.pathname.startsWith('/admin'));

	let cursorX = $state(0);
	let cursorY = $state(0);
	let cursorVisible = $state(false);
	let cursorScale = $state(1);
	let isTouch = $state(true);
	let showLoading = $state(true);

	// Direct DOM references for cursor — bypasses Svelte reactivity overhead on every mousemove
	let dotEl: HTMLElement | null = null;
	let ringEl: HTMLElement | null = null;

	onMount(() => {
		isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

		if (!isTouch) {
			// Use a WeakSet so we never add the same cursor-scale listeners twice
			const tracked = new WeakSet<Element>();

			function attachCursorScale(el: Element) {
				if (tracked.has(el)) return;
				tracked.add(el);
				el.addEventListener('mouseenter', () => updateScale(1.5));
				el.addEventListener('mouseleave', () => updateScale(1));
			}

			function updateScale(s: number) {
				cursorScale = s;
				applyTransform();
			}

			// Write cursor position directly to DOM via transform — no layout reflow
			function applyTransform() {
				if (dotEl) {
					dotEl.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
				}
				if (ringEl) {
					ringEl.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
				}
			}

			const onMove = (e: MouseEvent) => {
				cursorX = e.clientX;
				cursorY = e.clientY;
				if (!cursorVisible) {
					cursorVisible = true;
				}
				applyTransform();
			};

			const onDown = () => updateScale(0.8);
			const onUp = () => updateScale(1);

			document.addEventListener('mousemove', onMove, { passive: true });
			document.addEventListener('mousedown', onDown, { passive: true });
			document.addEventListener('mouseup', onUp, { passive: true });
			document.addEventListener('mouseleave', () => { cursorVisible = false; });
			document.addEventListener('mouseenter', () => { cursorVisible = true; });

			// Attach scale listeners to interactive elements — use WeakSet to avoid duplicates
			function refreshInteractives() {
				document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach(attachCursorScale);
			}

			refreshInteractives();

			const observer = new MutationObserver(refreshInteractives);
			observer.observe(document.body, { childList: true, subtree: true });

			return () => {
				document.removeEventListener('mousemove', onMove);
				document.removeEventListener('mousedown', onDown);
				document.removeEventListener('mouseup', onUp);
				observer.disconnect();
			};
		}

		setTimeout(() => (showLoading = false), 2500);
	});
</script>

<svelte:head>
	<title>Asiateknologi - IT Consulting & System Integration</title>
	<meta name="description" content="Enterprise IT consulting, IoT solutions, system integration, IT recruitment, and technology device management across Asia." />

	<!-- Favicon -->
	<link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
	<link rel="apple-touch-icon" sizes="512x512" href="/favicon.png" />

	<!-- Open Graph / Social Media Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://asiateknologi.com" />
	<meta property="og:title" content="Asiateknologi - Enterprise IT Solutions Across Asia" />
	<meta property="og:description" content="IT Consulting, IoT Solutions, Cloud Services, Cybersecurity, Device Management & IT Recruitment for Southeast Asian enterprises." />
	<meta property="og:image" content="https://asiateknologi.com/og-image.svg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Asiateknologi" />

	<!-- Twitter Card -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://asiateknologi.com" />
	<meta property="twitter:title" content="Asiateknologi - Enterprise IT Solutions Across Asia" />
	<meta property="twitter:description" content="IT Consulting, IoT Solutions, Cloud Services, Cybersecurity, Device Management & IT Recruitment for Southeast Asian enterprises." />
	<meta property="twitter:image" content="https://asiateknologi.com/og-image.svg" />
	<meta name="twitter:creator" content="@asiateknologi" />

	<!-- JSON-LD: Organization structured data -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Asiateknologi",
		"url": "https://asiateknologi.com",
		"logo": "https://asiateknologi.com/logo.png",
		"description": "Enterprise IT consulting, IoT solutions, system integration, IT recruitment, and technology device management across Asia.",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "Jl. Sudirman No. 1",
			"addressLocality": "Jakarta",
			"addressCountry": "ID"
		},
		"contactPoint": {
			"@type": "ContactPoint",
			"telephone": "+62-21-555-0100",
			"contactType": "customer service",
			"email": "info@asiateknologi.com"
		},
		"sameAs": [
			"https://linkedin.com/company/asiateknologi",
			"https://twitter.com/asiateknologi"
		],
		"serviceType": [
			"IT Consulting",
			"IoT Solutions",
			"System Integration",
			"IT Recruitment",
			"Technology Device Management"
		]
	})}<\/script>`}
</svelte:head>

{#if isAdmin}
	{@render children()}
{:else}
	{#if showLoading && browser}
		<LoadingScreen />
	{/if}

	<!-- Custom cursor: positioned at top-left origin, moved entirely via transform (GPU only, zero layout reflow) -->
	{#if browser && !isTouch && cursorVisible}
		<div
			bind:this={dotEl}
			class="pointer-events-none fixed left-0 top-0 z-[999] mix-blend-difference will-change-transform"
			style="transition: transform 0.1s ease-out;"
		>
			<div class="h-2 w-2 rounded-full bg-accent-cyan"></div>
		</div>
		<div
			bind:this={ringEl}
			class="pointer-events-none fixed left-0 top-0 z-[998] will-change-transform"
			style="transition: transform 0.12s ease-out;"
		>
			<div class="h-8 w-8 rounded-full border border-accent-cyan/30"></div>
		</div>
	{/if}

	<div class="flex min-h-screen flex-col">
		<Header />
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />

		<!-- Floating WhatsApp Contact Button (hidden on admin pages) -->
		{#if !isAdmin}
			<WhatsAppButton />
		{/if}
	</div>
{/if}
