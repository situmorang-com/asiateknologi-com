<script lang="ts">
	import { onMount } from 'svelte';

	let isVisible = $state(false);
	let isHovered = $state(false);

	const whatsappNumber = '62812345678'; // Replace with your number
	const message = encodeURIComponent('Halo Asiateknologi! Saya ingin bertanya mengenai solusi IT untuk perusahaan kami.');
	const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

	onMount(() => {
		setTimeout(() => { isVisible = true; }, 800);
	});
</script>

<div
	class="fixed bottom-6 right-6 z-50 flex items-center gap-3"
	style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? 0 : 16}px); transition: opacity 0.4s ease, transform 0.4s ease;"
>
	<!-- Tooltip label -->
	{#if isHovered}
		<div
			class="rounded-full bg-dark-900/95 backdrop-blur-sm border border-white/10 px-4 py-2 text-sm font-medium text-white shadow-xl"
			style="animation: fadeInLeft 0.15s ease-out;"
		>
			Chat with us
		</div>
	{/if}

	<!-- WhatsApp button -->
	<a
		href={whatsappUrl}
		target="_blank"
		rel="noopener noreferrer"
		aria-label="Chat with us on WhatsApp"
		onmouseenter={() => isHovered = true}
		onmouseleave={() => isHovered = false}
		class="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-green-900/40 transition-transform duration-200 hover:scale-110 active:scale-95"
	>
		<!-- Pulse ring -->
		<span class="absolute inset-0 rounded-full bg-[#25D366] opacity-40"
			style="animation: pulse-ring 2s ease-out infinite;"></span>

		<!-- WhatsApp SVG icon -->
		<svg viewBox="0 0 32 32" fill="white" class="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
			<path d="M16 2C8.268 2 2 8.268 2 16c0 2.444.659 4.733 1.808 6.703L2 30l7.524-1.774A13.924 13.924 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.535 11.535 0 01-5.882-1.612l-.422-.25-4.468 1.052 1.083-4.34-.274-.445A11.536 11.536 0 014.4 16C4.4 9.594 9.594 4.4 16 4.4S27.6 9.594 27.6 16 22.406 27.6 16 27.6z"/>
			<path d="M22.003 19.178c-.328-.164-1.942-.957-2.243-1.067-.3-.11-.519-.164-.737.164-.219.328-.847 1.067-1.039 1.286-.191.219-.382.246-.71.082-.328-.164-1.385-.51-2.638-1.628-.975-.87-1.633-1.943-1.824-2.271-.191-.328-.02-.505.144-.668.147-.147.328-.382.492-.574.164-.191.219-.328.328-.546.11-.219.055-.41-.027-.574-.082-.164-.737-1.778-1.01-2.434-.266-.64-.537-.553-.737-.563-.19-.009-.41-.011-.628-.011a1.207 1.207 0 00-.874.41c-.3.328-1.148 1.122-1.148 2.735s1.175 3.172 1.34 3.39c.164.219 2.312 3.528 5.604 4.946.783.338 1.394.54 1.87.692.786.25 1.502.215 2.068.13.631-.093 1.942-.793 2.216-1.56.273-.765.273-1.42.191-1.56-.08-.136-.3-.218-.628-.382z"/>
		</svg>
	</a>
</div>

<style>
	@keyframes pulse-ring {
		0%   { transform: scale(1);   opacity: 0.4; }
		70%  { transform: scale(1.35); opacity: 0;   }
		100% { transform: scale(1.35); opacity: 0;   }
	}

	@keyframes fadeInLeft {
		from { opacity: 0; transform: translateX(8px); }
		to   { opacity: 1; transform: translateX(0);   }
	}
</style>
