interface TiltOptions {
	maxTilt?: number;
	perspective?: number;
	scale?: number;
	glare?: boolean;
}

export function tiltCard(node: HTMLElement, options: TiltOptions = {}) {
	const { maxTilt = 10, perspective = 1000, scale = 1.02, glare = true } = options;

	let glareEl: HTMLElement | null = null;

	if (glare) {
		glareEl = document.createElement('div');
		glareEl.style.cssText = `
			position: absolute;
			inset: 0;
			pointer-events: none;
			border-radius: inherit;
			opacity: 0;
			background: linear-gradient(
				135deg,
				rgba(0, 229, 255, 0.15) 0%,
				transparent 50%
			);
			transition: opacity 0.3s;
		`;
		node.style.position = 'relative';
		node.style.overflow = 'hidden';
		node.appendChild(glareEl);
	}

	node.style.transformStyle = 'preserve-3d';
	node.style.transition = 'transform 0.15s ease-out';

	function onMouseMove(e: MouseEvent) {
		const rect = node.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;

		const rotateY = (x - 0.5) * maxTilt * 2;
		const rotateX = (0.5 - y) * maxTilt * 2;

		node.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

		if (glareEl) {
			glareEl.style.opacity = '1';
			glareEl.style.background = `
				radial-gradient(
					circle at ${x * 100}% ${y * 100}%,
					rgba(0, 229, 255, 0.2) 0%,
					transparent 60%
				)
			`;
		}
	}

	function onMouseLeave() {
		node.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
		node.style.transition = 'transform 0.5s ease-out';
		if (glareEl) glareEl.style.opacity = '0';
	}

	function onMouseEnter() {
		node.style.transition = 'transform 0.15s ease-out';
	}

	node.addEventListener('mousemove', onMouseMove);
	node.addEventListener('mouseleave', onMouseLeave);
	node.addEventListener('mouseenter', onMouseEnter);

	return {
		destroy() {
			node.removeEventListener('mousemove', onMouseMove);
			node.removeEventListener('mouseleave', onMouseLeave);
			node.removeEventListener('mouseenter', onMouseEnter);
			if (glareEl) glareEl.remove();
		}
	};
}
