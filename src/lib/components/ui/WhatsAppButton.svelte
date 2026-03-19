<script lang="ts">
	import { onMount } from 'svelte';

	let isVisible = $state(false);
	let isHovered = $state(false);

	const whatsappNumber = '62812345678';
	const message = encodeURIComponent('Halo Asiateknologi! Saya ingin bertanya mengenai solusi IT untuk perusahaan kami.');
	const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

	onMount(() => {
		setTimeout(() => { isVisible = true; }, 800);
	});
</script>

<div
	class="fixed bottom-6 right-6 z-50"
	style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? 0 : 20}px); transition: opacity 0.5s ease, transform 0.5s ease;"
>
	<div
		class="group flex items-center"
		onmouseenter={() => isHovered = true}
		onmouseleave={() => isHovered = false}
		role="presentation"
	>
		<!-- Sliding label — overflow hidden so no bleed -->
		<div
			class="overflow-hidden rounded-full"
			style="max-width: {isHovered ? '160px' : '0'}; opacity: {isHovered ? 1 : 0}; margin-right: {isHovered ? '12px' : '0'}; transition: max-width 0.3s ease, opacity 0.3s ease, margin-right 0.3s ease;"
		>
			<span class="block whitespace-nowrap rounded-full border border-white/10 bg-dark-900/95 px-4 py-2 text-sm font-medium text-white shadow-xl backdrop-blur-sm">
				Chat with us
			</span>
		</div>

		<!-- WhatsApp button -->
		<a
			href={whatsappUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Chat with us on WhatsApp"
			class="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-xl shadow-[#25D366]/30 transition-transform duration-200 hover:scale-110 active:scale-95"
		>
			<!-- Dual staggered pulse rings — always animating -->
			<span class="absolute inset-0 rounded-full bg-[#25D366]" style="animation: wa-pulse 2s ease-out infinite;"></span>
			<span class="absolute inset-0 rounded-full bg-[#25D366]" style="animation: wa-pulse 2s ease-out infinite; animation-delay: 0.5s;"></span>

			<!-- WhatsApp icon -->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="relative z-10 h-7 w-7">
				<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
			</svg>
		</a>
	</div>
</div>

<style>
	@keyframes wa-pulse {
		0%   { transform: scale(1);   opacity: 0.45; }
		70%  { transform: scale(1.65); opacity: 0;   }
		100% { transform: scale(1.65); opacity: 0;   }
	}
</style>
