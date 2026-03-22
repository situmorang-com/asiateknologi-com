<script lang="ts">
	let { name, tier }: { name: string; tier?: string | null } = $props();

	const brands: Record<string, { file: string; color: string }> = {
		'Amazon Web Services':        { file: 'aws.svg',               color: '#FF9900' },
		'Microsoft Azure':            { file: 'microsoft-azure.svg',   color: '#0078D4' },
		'Cisco Systems':              { file: 'cisco.svg',             color: '#1BA0D7' },
		'Siemens Digital Industries': { file: 'siemens.svg',           color: '#009999' },
		'Palo Alto Networks':         { file: 'palo-alto-networks.svg',color: '#F04E23' },
		'Snowflake':                  { file: 'snowflake.svg',         color: '#29B5E8' },
		'BytePlus':                   { file: 'byteplus.svg',          color: '#1D6AE5' },
		'Vonage':                     { file: 'vonage.svg',            color: '#9B59B6' },
		'Ruijie Networks':            { file: 'ruijie-networks.svg',   color: '#0066CC' },
		'Alibaba Cloud':              { file: 'alibaba-cloud.svg',     color: '#FF6A00' },
		'Huawei':                     { file: 'huawei.svg',            color: '#CF0A2C' },
		'Tencent Cloud':              { file: 'tencent-cloud.svg',     color: '#1AABFF' },
	};

	const tierColors: Record<string, string> = {
		gold:       '#F59E0B',
		premier:    '#6366F1',
		advanced:   '#10B981',
		certified:  '#3B82F6',
		authorized: '#8B5CF6',
		select:     '#64748B',
	};

	const brand = brands[name];
	const tierColor = tier ? (tierColors[tier.toLowerCase()] ?? '#64748B') : null;
</script>

<div
	class="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-dark-700/50 bg-dark-900/80 px-5 py-5 transition-all duration-300 hover:scale-105 hover:border-dark-600 hover:bg-dark-800/80"
	style="border-top: 2px solid {brand?.color ?? '#333'}40;"
>
	<!-- Logo image -->
	<div class="flex h-10 items-center justify-center">
		{#if brand}
			<img
				src="/partners/{brand.file}"
				alt="{name} logo"
				class="h-8 w-auto max-w-[80px] object-contain transition-all duration-300"
				style="filter: brightness(0) saturate(100%) invert(1); opacity: 0.75;"
				onmouseover={(e) => (e.currentTarget as HTMLImageElement).style.opacity = '1'}
				onmouseout={(e) => (e.currentTarget as HTMLImageElement).style.opacity = '0.75'}
			/>
		{:else}
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-dark-700 text-sm font-bold text-dark-300">
				{name.charAt(0)}
			</div>
		{/if}
	</div>

	<!-- Name -->
	<span class="text-center text-xs font-medium leading-tight text-dark-300">{name}</span>

	<!-- Tier badge -->
	{#if tier && tierColor}
		<span
			class="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
			style="background: {tierColor}20; color: {tierColor};"
		>
			{tier}
		</span>
	{/if}
</div>
