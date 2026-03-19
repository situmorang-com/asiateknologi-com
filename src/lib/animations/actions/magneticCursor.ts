import { gsap } from '../gsap';

interface MagneticOptions {
	strength?: number;
	radius?: number;
}

export function magneticCursor(node: HTMLElement, options: MagneticOptions = {}) {
	const { strength = 0.3, radius = 100 } = options;

	function onMouseMove(e: MouseEvent) {
		const rect = node.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const deltaX = e.clientX - centerX;
		const deltaY = e.clientY - centerY;
		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

		if (distance < radius) {
			gsap.to(node, {
				x: deltaX * strength,
				y: deltaY * strength,
				duration: 0.3,
				ease: 'power2.out'
			});
		}
	}

	function onMouseLeave() {
		gsap.to(node, {
			x: 0,
			y: 0,
			duration: 0.5,
			ease: 'elastic.out(1, 0.4)'
		});
	}

	node.addEventListener('mousemove', onMouseMove);
	node.addEventListener('mouseleave', onMouseLeave);

	return {
		destroy() {
			node.removeEventListener('mousemove', onMouseMove);
			node.removeEventListener('mouseleave', onMouseLeave);
		}
	};
}
