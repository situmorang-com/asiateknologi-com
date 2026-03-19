<script lang="ts">
	import { onMount } from 'svelte';

	let isVisible = false;
	const whatsappNumber = '62812345678'; // Replace with actual number
	const message = encodeURIComponent('Hi Asiateknologi! I would like to inquire about your IT solutions.');
	const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

	onMount(() => {
		// Fade in after page loads
		setTimeout(() => {
			isVisible = true;
		}, 500);
	});
</script>

<!-- Floating WhatsApp Button -->
<a
	href={whatsappUrl}
	target="_blank"
	rel="noopener noreferrer"
	class="fixed bottom-6 right-6 z-40 group transition-all duration-300 ease-out transform"
	class:opacity-0={!isVisible}
	class:opacity-100={isVisible}
	class:translate-y-0={isVisible}
	class:translate-y-4={!isVisible}
	aria-label="Contact us on WhatsApp"
>
	<!-- Pulse background animation -->
	<div class="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-20"></div>

	<!-- Main button -->
	<div
		class="relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
	>
		<!-- WhatsApp Icon (SVG) -->
		<svg
			class="w-7 h-7 text-white"
			fill="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.898 1.27c-1.547.83-2.823 2.01-3.72 3.465C2.202 13.115 1.77 15.039 1.77 17.04c0 1.894.474 3.75 1.38 5.377l-1.465 4.734 4.861-1.275c1.545.92 3.330 1.406 5.205 1.406 2.54 0 4.94-.994 6.75-2.745 1.81-1.75 2.81-4.08 2.81-6.555 0-1.928-.474-3.744-1.38-5.377-1.813-3.356-5.226-5.605-9.125-5.605m8.143-2.678C18.418 2.67 15.777 1.5 12.96 1.5c-4.029 0-7.796 1.563-10.628 4.408C-.445 8.753-1.5 12.502-1.5 16.466c0 2.816.669 5.538 1.952 8.032L-1.5 28.5l8.529-2.24c2.325 1.256 4.955 1.92 7.686 1.92 4.029 0 7.796-1.562 10.628-4.408 2.832-2.846 4.393-6.613 4.393-10.576 0-2.816-.669-5.538-1.952-8.032l1.583-5.09-8.472 2.22z"
			/>
		</svg>
	</div>

	<!-- Tooltip (shows on hover) -->
	<div
		class="absolute right-16 bottom-2 bg-dark-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-dark-700"
	>
		Chat with us
		<div class="absolute right-0 top-3 w-2 h-2 bg-dark-900 border-r border-t border-dark-700 transform rotate-45 -translate-x-1"></div>
	</div>
</a>

<style>
	@keyframes pulse {
		0%,
		100% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.4;
		}
	}

	:global(.animate-pulse) {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
