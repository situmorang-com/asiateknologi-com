<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement;
	let animationId: number;

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		radius: number;
		opacity: number;
	}

	onMount(() => {
		if (!browser || !canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let mouseX = -1000;
		let mouseY = -1000;
		let particles: Particle[] = [];
		const CONNECTION_DISTANCE = 120;
		const MOUSE_RADIUS = 150;

		function resize() {
			const dpr = window.devicePixelRatio || 1;
			const rect = canvas.parentElement!.getBoundingClientRect();
			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;
			canvas.style.width = rect.width + 'px';
			canvas.style.height = rect.height + 'px';
			ctx!.scale(dpr, dpr);
			initParticles(rect.width, rect.height);
		}

		function initParticles(w: number, h: number) {
			const count = Math.min(Math.floor((w * h) / 8000), 200);
			particles = Array.from({ length: count }, () => ({
				x: Math.random() * w,
				y: Math.random() * h,
				vx: (Math.random() - 0.5) * 0.5,
				vy: (Math.random() - 0.5) * 0.5,
				radius: Math.random() * 1.5 + 0.5,
				opacity: Math.random() * 0.5 + 0.3
			}));
		}

		function draw() {
			const w = canvas.width / (window.devicePixelRatio || 1);
			const h = canvas.height / (window.devicePixelRatio || 1);

			ctx!.clearRect(0, 0, w, h);

			// Update & draw particles
			for (const p of particles) {
				// Mouse attraction
				const dx = mouseX - p.x;
				const dy = mouseY - p.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < MOUSE_RADIUS) {
					const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.02;
					p.vx += dx * force;
					p.vy += dy * force;
				}

				// Damping
				p.vx *= 0.99;
				p.vy *= 0.99;

				p.x += p.vx;
				p.y += p.vy;

				// Wrap around
				if (p.x < 0) p.x = w;
				if (p.x > w) p.x = 0;
				if (p.y < 0) p.y = h;
				if (p.y > h) p.y = 0;

				// Draw particle with glow
				ctx!.beginPath();
				ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx!.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
				ctx!.fill();

				// Glow
				ctx!.beginPath();
				ctx!.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
				ctx!.fillStyle = `rgba(0, 229, 255, ${p.opacity * 0.15})`;
				ctx!.fill();
			}

			// Draw connections
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist < CONNECTION_DISTANCE) {
						const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
						ctx!.beginPath();
						ctx!.moveTo(particles[i].x, particles[i].y);
						ctx!.lineTo(particles[j].x, particles[j].y);
						ctx!.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
						ctx!.lineWidth = 0.5;
						ctx!.stroke();
					}
				}
			}

			// Mouse connections
			for (const p of particles) {
				const dx = mouseX - p.x;
				const dy = mouseY - p.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < MOUSE_RADIUS) {
					const opacity = (1 - dist / MOUSE_RADIUS) * 0.3;
					ctx!.beginPath();
					ctx!.moveTo(p.x, p.y);
					ctx!.lineTo(mouseX, mouseY);
					ctx!.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
					ctx!.lineWidth = 0.8;
					ctx!.stroke();
				}
			}

			animationId = requestAnimationFrame(draw);
		}

		function onMouseMove(e: MouseEvent) {
			const rect = canvas.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		}

		function onMouseLeave() {
			mouseX = -1000;
			mouseY = -1000;
		}

		resize();
		draw();

		window.addEventListener('resize', resize);
		canvas.addEventListener('mousemove', onMouseMove);
		canvas.addEventListener('mouseleave', onMouseLeave);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
			canvas.removeEventListener('mousemove', onMouseMove);
			canvas.removeEventListener('mouseleave', onMouseLeave);
		};
	});
</script>

<canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>
