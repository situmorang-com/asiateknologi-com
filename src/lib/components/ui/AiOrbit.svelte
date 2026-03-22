<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		if (!browser) return;

		const ctx = canvas.getContext('2d')!;
		const dpr = window.devicePixelRatio || 1;
		let w: number, h: number;
		let animId = 0;
		let t = 0;

		const COLORS = {
			purple: [139, 92, 246] as [number, number, number],
			blue: [59, 130, 246] as [number, number, number],
			cyan: [0, 229, 255] as [number, number, number],
			green: [16, 185, 129] as [number, number, number],
		};

		interface OrbNode {
			label: string;
			angle: number;
			speed: number;
			orbit: number; // radius multiplier
			color: [number, number, number];
			size: number;
		}

		const nodes: OrbNode[] = [
			{ label: 'ML', angle: 0, speed: 0.008, orbit: 0.38, color: COLORS.purple, size: 18 },
			{ label: 'ETL', angle: Math.PI * 0.6, speed: 0.006, orbit: 0.34, color: COLORS.blue, size: 15 },
			{ label: 'BI', angle: Math.PI, speed: 0.01, orbit: 0.42, color: COLORS.green, size: 14 },
			{ label: 'NLP', angle: Math.PI * 1.4, speed: 0.007, orbit: 0.36, color: COLORS.cyan, size: 13 },
			{ label: 'LLM', angle: Math.PI * 0.3, speed: 0.005, orbit: 0.45, color: COLORS.purple, size: 16 },
			{ label: 'CV', angle: Math.PI * 1.7, speed: 0.009, orbit: 0.3, color: COLORS.blue, size: 12 },
		];

		// Data packets flowing along connections
		interface Packet {
			from: number;
			progress: number;
			speed: number;
			color: [number, number, number];
		}
		let packets: Packet[] = [];
		let packetTimer = 0;

		function resize() {
			const rect = canvas.getBoundingClientRect();
			w = rect.width;
			h = rect.height;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		function getNodePos(node: OrbNode): [number, number] {
			const cx = w / 2;
			const cy = h / 2;
			const r = Math.min(w, h) * node.orbit;
			return [
				cx + Math.cos(node.angle) * r,
				cy + Math.sin(node.angle) * r * 0.6 // elliptical
			];
		}

		function tick() {
			ctx.clearRect(0, 0, w, h);
			t += 0.016;
			const cx = w / 2;
			const cy = h / 2;
			const baseR = Math.min(w, h) * 0.38;

			// Draw orbit rings (faint)
			for (let i = 0; i < 3; i++) {
				const r = baseR * (0.7 + i * 0.2);
				ctx.beginPath();
				ctx.ellipse(cx, cy, r, r * 0.6, 0, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(139,92,246,${0.06 - i * 0.015})`;
				ctx.lineWidth = 1;
				ctx.stroke();
			}

			// Update node positions
			for (const node of nodes) {
				node.angle += node.speed;
			}

			// Spawn data packets periodically
			packetTimer += 0.016;
			if (packetTimer > 0.4) {
				packetTimer = 0;
				const fromIdx = Math.floor(Math.random() * nodes.length);
				const colors = [COLORS.purple, COLORS.cyan, COLORS.blue, COLORS.green];
				packets.push({
					from: fromIdx,
					progress: 0,
					speed: 0.008 + Math.random() * 0.012,
					color: colors[Math.floor(Math.random() * colors.length)]
				});
			}

			// Draw connections from nodes to center
			for (const node of nodes) {
				const [nx, ny] = getNodePos(node);
				const grad = ctx.createLinearGradient(nx, ny, cx, cy);
				grad.addColorStop(0, `rgba(${node.color[0]},${node.color[1]},${node.color[2]},0.15)`);
				grad.addColorStop(1, `rgba(${node.color[0]},${node.color[1]},${node.color[2]},0.03)`);
				ctx.beginPath();
				ctx.moveTo(nx, ny);
				ctx.lineTo(cx, cy);
				ctx.strokeStyle = grad;
				ctx.lineWidth = 1;
				ctx.stroke();
			}

			// Draw & update packets
			packets = packets.filter(p => p.progress < 1);
			for (const p of packets) {
				p.progress += p.speed;
				const [nx, ny] = getNodePos(nodes[p.from]);
				const px = nx + (cx - nx) * p.progress;
				const py = ny + (cy - ny) * p.progress;
				const alpha = Math.sin(p.progress * Math.PI) * 0.9;

				// Glow
				ctx.beginPath();
				ctx.arc(px, py, 6, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${alpha * 0.2})`;
				ctx.fill();

				// Core
				ctx.beginPath();
				ctx.arc(px, py, 2.5, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${alpha})`;
				ctx.fill();
			}

			// Draw center "brain" hub
			const pulseR = 22 + Math.sin(t * 2) * 3;

			// Outer glow rings
			for (let i = 3; i >= 1; i--) {
				ctx.beginPath();
				ctx.arc(cx, cy, pulseR + i * 12, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(139,92,246,${0.03 * (4 - i)})`;
				ctx.lineWidth = 1.5;
				ctx.stroke();
			}

			// Core gradient
			const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseR);
			coreGrad.addColorStop(0, 'rgba(139,92,246,0.4)');
			coreGrad.addColorStop(0.6, 'rgba(59,130,246,0.2)');
			coreGrad.addColorStop(1, 'rgba(0,229,255,0.05)');
			ctx.beginPath();
			ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
			ctx.fillStyle = coreGrad;
			ctx.fill();

			// Center icon (brain symbol)
			ctx.beginPath();
			ctx.arc(cx, cy, 8, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(139,92,246,0.8)';
			ctx.fill();
			ctx.beginPath();
			ctx.arc(cx, cy, 4, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(200,180,255,0.9)';
			ctx.fill();

			// Draw orbiting nodes
			for (const node of nodes) {
				const [nx, ny] = getNodePos(node);

				// Node glow
				ctx.beginPath();
				ctx.arc(nx, ny, node.size * 1.8, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${node.color[0]},${node.color[1]},${node.color[2]},0.08)`;
				ctx.fill();

				// Node body
				ctx.beginPath();
				ctx.arc(nx, ny, node.size, 0, Math.PI * 2);
				const nodeGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, node.size);
				nodeGrad.addColorStop(0, `rgba(${node.color[0]},${node.color[1]},${node.color[2]},0.3)`);
				nodeGrad.addColorStop(1, `rgba(${node.color[0]},${node.color[1]},${node.color[2]},0.08)`);
				ctx.fillStyle = nodeGrad;
				ctx.fill();

				// Node border
				ctx.beginPath();
				ctx.arc(nx, ny, node.size, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(${node.color[0]},${node.color[1]},${node.color[2]},0.4)`;
				ctx.lineWidth = 1;
				ctx.stroke();

				// Node inner dot
				ctx.beginPath();
				ctx.arc(nx, ny, 3, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${node.color[0]},${node.color[1]},${node.color[2]},0.9)`;
				ctx.fill();

				// Label
				ctx.font = '600 10px Inter, system-ui, sans-serif';
				ctx.textAlign = 'center';
				ctx.fillStyle = `rgba(${node.color[0]},${node.color[1]},${node.color[2]},0.7)`;
				ctx.fillText(node.label, nx, ny + node.size + 14);
			}

			animId = requestAnimationFrame(tick);
		}

		resize();
		tick();

		window.addEventListener('resize', resize);

		const obs = new IntersectionObserver(([e]) => {
			if (e.isIntersecting) {
				if (!animId) tick();
			} else {
				if (animId) cancelAnimationFrame(animId);
				animId = 0;
			}
		}, { threshold: 0.05 });
		obs.observe(canvas);

		return () => {
			if (animId) cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
			obs.disconnect();
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none absolute inset-0 h-full w-full"
></canvas>
