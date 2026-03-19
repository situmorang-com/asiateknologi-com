<script lang="ts">
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const categoryNames: Record<string, string> = {
		network: 'Network & Security',
		laptop: 'Laptops & Ultrabooks',
		desktop: 'Desktop Workstations',
		server: 'Enterprise Servers',
		bundle: 'Solution Bundles'
	};

	const categoryIcons: Record<string, string> = {
		network: '🛡️',
		laptop: '💻',
		desktop: '🖥️',
		server: '⚙️',
		bundle: '📦'
	};

	function formatPrice(price: string | null): string {
		if (!price || price === 'null') return 'Custom Quote';
		const num = parseInt(price.replace(/[^0-9]/g, ''));
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0
		}).format(num);
	}
</script>

<svelte:head>
	<title>Hardware & Device Catalog - Asiateknologi</title>
	<meta name="description" content="Enterprise hardware catalog with rent & buy options. Professional workstations, servers, security appliances, and solution bundles." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-b from-dark-900 to-dark-950 px-6 py-24 sm:px-12 sm:py-32">
	<div class="mx-auto max-w-6xl">
		<div use:scrollReveal={{ direction: 'up' }}>
			<span class="inline-block bg-accent-cyan/20 px-4 py-1 rounded-full text-sm font-mono text-accent-cyan mb-6">
				DEVICE LIFECYCLE
			</span>
			<h1 class="text-4xl sm:text-5xl font-bold text-dark-100 mb-6 leading-tight">
				Enterprise Hardware
				<span class="text-accent-cyan">Rent or Buy</span>
			</h1>
			<p class="text-lg text-dark-300 max-w-3xl mb-8">
				Professional-grade devices with flexible acquisition options. From workstations and servers to complete solution bundles—all with local support and Indonesian market pricing.
			</p>
		</div>

		<!-- Quick Stats -->
		<div use:scrollReveal={{ direction: 'up', delay: 0.1 }} class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
			<div class="bg-dark-800 border border-dark-700 rounded-lg p-4">
				<div class="text-2xl font-bold text-accent-cyan">{data.devices.length}</div>
				<div class="text-sm text-dark-400">Products</div>
			</div>
			<div class="bg-dark-800 border border-dark-700 rounded-lg p-4">
				<div class="text-2xl font-bold text-accent-green">24h</div>
				<div class="text-sm text-dark-400">Delivery</div>
			</div>
			<div class="bg-dark-800 border border-dark-700 rounded-lg p-4">
				<div class="text-2xl font-bold text-accent-blue">IDR 8.5M</div>
				<div class="text-sm text-dark-400">Starting Price</div>
			</div>
			<div class="bg-dark-800 border border-dark-700 rounded-lg p-4">
				<div class="text-2xl font-bold text-accent-purple">1:1</div>
				<div class="text-sm text-dark-400">Support Ratio</div>
			</div>
		</div>
	</div>
</section>

<!-- Devices by Category -->
{#each Object.entries(data.byCategory) as [category, categoryDevices] (category)}
	<section class="relative py-20 sm:py-28 px-6 sm:px-12 border-t border-dark-800">
		<div class="mx-auto max-w-6xl">
			<!-- Category Header -->
			<div use:scrollReveal class="mb-12">
				<span class="text-4xl">{categoryIcons[category] || '📱'}</span>
				<h2 class="text-3xl sm:text-4xl font-bold text-dark-100 mt-2 mb-2">
					{categoryNames[category] || category}
				</h2>
				<div class="w-12 h-1 bg-gradient-to-r from-accent-cyan to-accent-blue rounded"></div>
			</div>

			<!-- Device Grid -->
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each categoryDevices as device (device.id)}
					<div use:scrollReveal={{ direction: 'up' }} class="group relative bg-dark-900 border border-dark-700 rounded-xl overflow-hidden hover:border-accent-cyan/50 transition-all duration-300">
						<!-- Card Header -->
						<div class="bg-gradient-to-br {device.coverGradient || 'from-dark-800 to-dark-900'} p-6 pb-8">
							<div class="flex justify-between items-start mb-4">
								<h3 class="text-xl font-bold text-dark-100 flex-1">{device.name}</h3>
								<span class="bg-dark-950/80 px-3 py-1 rounded-full text-xs font-mono text-accent-cyan">
									{device.availability === 'in-stock' ? '✓ Stock' : device.availability === 'pre-order' ? '⏱ Pre-Order' : '💬 Quote'}
								</span>
							</div>
							<p class="text-sm text-dark-300">{device.description}</p>
						</div>

						<!-- Specs -->
						<div class="px-6 py-4 border-t border-dark-800">
							<div class="grid grid-cols-2 gap-3 text-xs">
								{#each Object.entries(device.specs).slice(0, 4) as [key, value]}
									<div class="text-dark-400">
										<span class="font-semibold text-dark-200 block">{value}</span>
										<span class="text-dark-500 capitalize">{key}</span>
									</div>
								{/each}
							</div>
						</div>

						<!-- Features -->
						<div class="px-6 py-4 border-t border-dark-800">
							<div class="flex flex-wrap gap-2">
								{#each device.features.slice(0, 3) as feature}
									<span class="text-xs bg-dark-800 text-dark-300 px-2 py-1 rounded">
										{feature}
									</span>
								{/each}
							</div>
						</div>

						<!-- Pricing -->
						<div class="px-6 py-5 border-t border-dark-800 bg-dark-950/50">
							<div class="space-y-3 mb-4">
								{#if device.buyPrice && device.buyPrice !== 'null'}
									<div>
										<div class="text-xs text-dark-400 font-mono mb-1">BUY</div>
										<div class="text-lg font-bold text-accent-green">
											{formatPrice(device.buyPrice)}
										</div>
									</div>
								{/if}
								{#if device.rentPriceMonthly && device.rentPriceMonthly !== 'null'}
									<div>
										<div class="text-xs text-dark-400 font-mono mb-1">RENT / MONTH</div>
										<div class="text-lg font-bold text-accent-cyan">
											{formatPrice(device.rentPriceMonthly)}
										</div>
									</div>
								{/if}
								{#if device.rentPricDaily && device.rentPricDaily !== 'null'}
									<div>
										<div class="text-xs text-dark-400 font-mono mb-1">RENT / DAY</div>
										<div class="text-lg font-bold text-accent-blue">
											{formatPrice(device.rentPricDaily)}
										</div>
									</div>
								{/if}
							</div>

							<!-- CTA -->
							<a href="/contact?interest=device-rental&device={device.slug}" class="block w-full text-center bg-gradient-to-r from-accent-cyan to-accent-blue text-dark-950 font-semibold py-2.5 rounded-lg hover:shadow-lg hover:shadow-accent-cyan/30 transition-all duration-300 transform hover:scale-105">
								{device.availability === 'custom-quote' ? 'Request Quote' : 'Get Device'}
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/each}

<!-- CTA Section -->
<section class="relative py-20 sm:py-28 px-6 sm:px-12 bg-gradient-to-r from-accent-cyan/10 to-accent-blue/10 border-t border-accent-cyan/20">
	<div class="mx-auto max-w-4xl text-center" use:scrollReveal>
		<h2 class="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
			Need a Custom Configuration?
		</h2>
		<p class="text-lg text-dark-300 mb-8">
			Our hardware team can design complete solutions tailored to your specific needs, budget, and deployment timeline.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="/contact?interest=device-custom" class="px-8 py-3 bg-accent-cyan text-dark-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-cyan/30 transition-all">
				Contact Sales
			</a>
			<a href="/services/device-rental" class="px-8 py-3 border border-dark-600 text-dark-100 font-semibold rounded-lg hover:border-accent-cyan hover:bg-dark-900 transition-all">
				Learn About Service
			</a>
		</div>
	</div>
</section>
