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
		let mouseX = -9999, mouseY = -9999;

		const COLORS: [number, number, number][] = [
			[0, 229, 255],   // cyan
			[139, 92, 246],  // purple
			[59, 130, 246],  // blue
			[16, 185, 129],  // green
		];

		interface P {
			x: number; y: number; vx: number; vy: number;
			r: number; c: [number, number, number]; a: number;
			pulse: number; pulseSpeed: number;
		}

		let particles: P[] = [];

		function resize() {
			const rect = canvas.getBoundingClientRect();
			w = rect.width;
			h = rect.height;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		function init() {
			resize();
			const count = Math.min(120, Math.floor((w * h) / 4500));
			particles = [];
			for (let i = 0; i < count; i++) {
				particles.push({
					x: Math.random() * w,
					y: Math.random() * h,
					vx: (Math.random() - 0.5) * 0.35,
					vy: (Math.random() - 0.5) * 0.35,
					r: Math.random() * 2 + 0.5,
					c: COLORS[Math.floor(Math.random() * COLORS.length)],
					a: Math.random() * 0.4 + 0.2,
					pulse: Math.random() * Math.PI * 2,
					pulseSpeed: 0.01 + Math.random() * 0.02,
				});
			}
		}

		function tick() {
			ctx.clearRect(0, 0, w, h);
			const connDist = Math.min(130, w * 0.14);
			const mouseRad = 160;

			// Update particles
			for (const p of particles) {
				// Mouse repulsion
				const dx = p.x - mouseX;
				const dy = p.y - mouseY;
				const d = Math.sqrt(dx * dx + dy * dy);
				if (d < mouseRad && d > 0) {
					const f = ((mouseRad - d) / mouseRad) * 0.12;
					p.vx += (dx / d) * f;
					p.vy += (dy / d) * f;
				}

				p.vx *= 0.988;
				p.vy *= 0.988;
				p.x += p.vx;
				p.y += p.vy;
				p.pulse += p.pulseSpeed;

				if (p.x < -20) p.x = w + 20;
				if (p.x > w + 20) p.x = -20;
				if (p.y < -20) p.y = h + 20;
				if (p.y > h + 20) p.y = -20;
			}

			// Connections
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const d2 = dx * dx + dy * dy;
					if (d2 < connDist * connDist) {
						const d = Math.sqrt(d2);
						const alpha = (1 - d / connDist) * 0.13;
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
						ctx.lineWidth = 0.6;
						ctx.stroke();
					}
				}
			}

			// Draw particles
			for (const p of particles) {
				const pulseAlpha = p.a + Math.sin(p.pulse) * 0.15;

				// Outer glow for larger particles
				if (p.r > 1.2) {
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${pulseAlpha * 0.08})`;
					ctx.fill();
				}

				// Core
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${pulseAlpha})`;
				ctx.fill();
			}

			animId = requestAnimationFrame(tick);
		}

		init();
		tick();

		// Track mouse globally so canvas can be pointer-events:none
		const onMove = (e: MouseEvent) => {
			const r = canvas.getBoundingClientRect();
			mouseX = e.clientX - r.left;
			mouseY = e.clientY - r.top;
		};
		const onLeave = () => { mouseX = -9999; mouseY = -9999; };
		window.addEventListener('mousemove', onMove);
		document.addEventListener('mouseleave', onLeave);
		window.addEventListener('resize', resize);

		// Pause when off-screen
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
			window.removeEventListener('mousemove', onMove);
			document.removeEventListener('mouseleave', onLeave);
			window.removeEventListener('resize', resize);
			obs.disconnect();
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none absolute inset-0 h-full w-full"
></canvas>
