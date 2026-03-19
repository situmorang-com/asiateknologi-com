<script lang="ts">
	let { name, tier }: { name: string; tier?: string | null } = $props();

	// Map partner names to brand colors and SVG paths (Simple Icons, CC0)
	const brands: Record<string, { color: string; svg: string; width?: number }> = {
		'Amazon Web Services': {
			color: '#FF9900',
			width: 60,
			svg: `<g fill="#FF9900">
				<path d="M8.49 10.3c0 .4.043.72.118.958.086.237.194.496.345.776.054.086.075.172.075.248 0 .108-.065.215-.205.323l-.678.452a.516.516 0 0 1-.28.097c-.108 0-.215-.054-.323-.151a3.33 3.33 0 0 1-.388-.507 8.34 8.34 0 0 1-.334-.636c-.84.99-1.898 1.487-3.17 1.487-.906 0-1.628-.258-2.155-.775-.527-.517-.797-1.207-.797-2.07 0-.916.323-1.662.98-2.22.657-.56 1.53-.84 2.641-.84.367 0 .744.032 1.142.086.4.054.81.14 1.24.237v-.787c0-.82-.172-1.39-.507-1.724-.344-.334-.927-.496-1.757-.496-.377 0-.766.043-1.165.14-.398.096-.787.215-1.164.366a3.09 3.09 0 0 1-.378.14.66.66 0 0 1-.172.032c-.151 0-.226-.108-.226-.334v-.527c0-.172.02-.302.075-.377a.806.806 0 0 1 .302-.226 6.113 6.113 0 0 1 1.358-.485 6.533 6.533 0 0 1 1.682-.205c1.283 0 2.22.291 2.824.873.593.581.894 1.465.894 2.65v3.494zm-4.374 1.638c.355 0 .72-.065 1.11-.194.388-.13.733-.366 1.023-.689.172-.205.302-.431.366-.69.065-.258.108-.571.108-.937v-.452a8.988 8.988 0 0 0-.992-.183 8.13 8.13 0 0 0-1.013-.065c-.722 0-1.25.14-1.607.431-.355.291-.528.7-.528 1.238 0 .507.129.885.398 1.143.258.27.636.398 1.132.398zm8.655 1.165c-.194 0-.323-.033-.41-.108-.086-.065-.161-.215-.226-.42L9.5 5.47a1.889 1.889 0 0 1-.097-.431c0-.172.086-.27.258-.27h1.057c.205 0 .345.033.42.108.086.065.151.215.215.42l1.812 7.137 1.682-7.137c.054-.215.119-.355.204-.42a.74.74 0 0 1 .432-.108h.861c.205 0 .345.033.431.108.086.065.162.215.205.42l1.703 7.224 1.865-7.224c.065-.215.14-.355.215-.42a.7.7 0 0 1 .42-.108h1.003c.172 0 .27.087.27.27 0 .054-.011.108-.022.172a1.535 1.535 0 0 1-.076.27l-2.597 8.332c-.054.215-.14.355-.226.42a.688.688 0 0 1-.41.108h-.926c-.205 0-.345-.032-.432-.108-.086-.075-.161-.215-.204-.431l-1.671-6.95-1.66 6.94c-.054.215-.119.355-.204.432-.086.075-.238.108-.432.108z"/>
				<path d="M22.18 15.48c-2.8 2.07-6.865 3.17-10.363 3.17-4.9 0-9.317-1.81-12.656-4.825-.263-.237-.027-.56.29-.376 3.61 2.1 8.072 3.375 12.678 3.375 3.107 0 6.52-.646 9.662-1.982.474-.215.873.312.388.638zm1.207-1.38c-.36-.463-2.372-.22-3.278-.11-.274.034-.316-.205-.069-.388 1.606-1.132 4.246-.808 4.556-.43.31.387-.087 3.03-1.596 4.297-.23.197-.452.097-.35-.162.344-.851 1.11-2.748.745-3.213z"/>
			</g>`
		},
		'Microsoft Azure': {
			color: '#0078D4',
			width: 40,
			svg: `<g>
				<path d="M13.05 4.634L7.022 18.55l5.442.959 5.93-8.498-5.344-6.377z" fill="#0078D4"/>
				<path d="M13.87 3l-5.04 4.225-4.83 13.326H8.28L13.87 3z" fill="#0078D4" opacity="0.8"/>
				<path d="M4 20.551l4.82-2.77h9.35l1.83 2.77H4z" fill="#0078D4" opacity="0.6"/>
			</g>`
		},
		'Cisco Systems': {
			color: '#1BA0D7',
			width: 44,
			svg: `<g fill="#1BA0D7">
				<rect x="10.5" y="5" width="3" height="6" rx="1.5"/>
				<rect x="10.5" y="13" width="3" height="6" rx="1.5"/>
				<rect x="5.5" y="7" width="3" height="4" rx="1.5"/>
				<rect x="5.5" y="13" width="3" height="4" rx="1.5"/>
				<rect x="15.5" y="7" width="3" height="4" rx="1.5"/>
				<rect x="15.5" y="13" width="3" height="4" rx="1.5"/>
				<rect x="0.5" y="9" width="3" height="6" rx="1.5"/>
				<rect x="20.5" y="9" width="3" height="6" rx="1.5"/>
			</g>`
		},
		'Siemens Digital Industries': {
			color: '#009999',
			width: 90,
			svg: `<text x="0" y="18" font-family="Arial, sans-serif" font-weight="700" font-size="17" fill="#009999" letter-spacing="-0.5">SIEMENS</text>`
		},
		'Palo Alto Networks': {
			color: '#FA582D',
			width: 36,
			svg: `<g fill="#FA582D">
				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3l2 3.5-2 1-2-1 2-3.5zm-5 3.5l3.5 2-1 2-2.5-.5L7 10.5zm10 0l-1 4-2.5.5-1-2 4.5-2.5zM8 15l2-2.5 2 .5 2-.5 2 2.5-4 2-4-2z"/>
			</g>`
		},
		'Snowflake': {
			color: '#29B5E8',
			width: 32,
			svg: `<g fill="#29B5E8">
				<line x1="12" y1="2" x2="12" y2="22" stroke="#29B5E8" stroke-width="2" stroke-linecap="round"/>
				<line x1="2" y1="12" x2="22" y2="12" stroke="#29B5E8" stroke-width="2" stroke-linecap="round"/>
				<line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="#29B5E8" stroke-width="2" stroke-linecap="round"/>
				<line x1="19.07" y1="4.93" x2="4.93" y2="19.07" stroke="#29B5E8" stroke-width="2" stroke-linecap="round"/>
				<circle cx="12" cy="2" r="1.5"/>
				<circle cx="12" cy="22" r="1.5"/>
				<circle cx="2" cy="12" r="1.5"/>
				<circle cx="22" cy="12" r="1.5"/>
				<circle cx="4.93" cy="4.93" r="1.5"/>
				<circle cx="19.07" cy="19.07" r="1.5"/>
				<circle cx="19.07" cy="4.93" r="1.5"/>
				<circle cx="4.93" cy="19.07" r="1.5"/>
			</g>`
		}
	};

	const tierColors: Record<string, string> = {
		gold: '#F59E0B',
		premier: '#6366F1',
		advanced: '#10B981',
		certified: '#3B82F6',
		authorized: '#8B5CF6',
		select: '#64748B'
	};

	const brand = brands[name];
	const tierColor = tier ? tierColors[tier] ?? '#64748B' : null;
</script>

{#if brand}
	<div class="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dark-700/50 bg-dark-900/80 px-6 py-5 transition-all duration-300 hover:border-dark-600 hover:bg-dark-800/80 hover:scale-105" style="border-top: 2px solid {brand.color}40;">
		<!-- Logo -->
		<svg viewBox="0 0 {brand.width ?? 24} 24" height="28" class="opacity-90 hover:opacity-100 transition-opacity">
			{@html brand.svg}
		</svg>

		<!-- Name -->
		<span class="text-xs font-medium text-dark-300 text-center leading-tight">{name}</span>

		<!-- Tier badge -->
		{#if tier}
			<span class="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider" style="background: {tierColor}20; color: {tierColor};">
				{tier}
			</span>
		{/if}
	</div>
{:else}
	<!-- Fallback for unknown brands -->
	<div class="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dark-700/50 bg-dark-900/80 px-6 py-5 transition-all duration-300 hover:border-dark-600 hover:bg-dark-800/80">
		<div class="flex h-7 w-7 items-center justify-center rounded-full bg-dark-700 text-xs font-bold text-dark-300">
			{name.charAt(0)}
		</div>
		<span class="text-xs font-medium text-dark-300 text-center">{name}</span>
		{#if tier}
			<span class="rounded-full bg-dark-700/50 px-2 py-0.5 text-[10px] text-dark-400 uppercase">{tier}</span>
		{/if}
	</div>
{/if}
