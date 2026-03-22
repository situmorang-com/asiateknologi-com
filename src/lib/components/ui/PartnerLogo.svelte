<script lang="ts">
	let { name, tier, description, url }: { name: string; tier?: string | null; description?: string | null; url?: string | null } = $props();

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
		'Confluent':                  { file: 'confluent.svg',         color: '#CC1F24' },
		'Tableau':                    { file: 'tableau.png',           color: '#E97627' },
		'Databricks':                 { file: 'databricks.svg',        color: '#FF3621' },
		'Power BI':                   { file: 'powerbi.svg',           color: '#F2C811' },
		'Looker':                     { file: 'looker.svg',            color: '#4285F4' },
		'Microsoft Fabric':           { file: 'fabric.svg',            color: '#0078D4' },
		'Odoo':                       { file: 'odoo.svg',              color: '#714B67' },
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
	class="group flex flex-col gap-3 rounded-2xl border border-dark-700/50 bg-dark-900/80 px-5 py-5 transition-all duration-300 hover:border-dark-600 hover:bg-dark-800/80 {description ? 'items-start' : 'items-center justify-center hover:scale-105'}"
	style="border-top: 2px solid {brand?.color ?? '#333'}40;"
>
	<!-- Logo image + tier row -->
	<div class="flex w-full items-center {description ? 'justify-between' : 'justify-center'}">
		<div class="flex h-10 items-center">
			{#if brand}
				<img
					src="/partners/{brand.file}"
					alt="{name} logo"
					class="h-8 w-auto max-w-[80px] object-contain transition-all duration-300"
					style="filter: brightness(0) saturate(100%) invert(1); opacity: 0.75;"
				/>
			{:else}
				<div class="flex h-8 w-8 items-center justify-center rounded-full bg-dark-700 text-sm font-bold text-dark-300">
					{name.charAt(0)}
				</div>
			{/if}
		</div>
		{#if tier && tierColor}
			<span
				class="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
				style="background: {tierColor}20; color: {tierColor};"
			>
				{tier}
			</span>
		{/if}
	</div>

	<!-- Name -->
	<span class="text-center text-sm font-semibold text-dark-200 {description ? 'text-left' : 'text-center text-xs'}">{name}</span>

	<!-- Description (only on full partner cards) -->
	{#if description}
		<p class="text-xs leading-relaxed text-dark-400 line-clamp-3">{description}</p>
	{/if}

	<!-- Link -->
	{#if url}
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			class="mt-auto inline-flex items-center gap-1 font-mono text-xs text-dark-400 transition-colors hover:text-accent-cyan"
		>
			Learn more
			<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
		</a>
	{/if}
</div>
