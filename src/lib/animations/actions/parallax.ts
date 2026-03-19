import { gsap, ScrollTrigger } from '../gsap';

interface ParallaxOptions {
	speed?: number;
	direction?: 'vertical' | 'horizontal';
}

export function parallax(node: HTMLElement, options: ParallaxOptions = {}) {
	const { speed = 0.5, direction = 'vertical' } = options;

	const prop = direction === 'vertical' ? 'y' : 'x';
	const distance = speed * 100;

	const tween = gsap.to(node, {
		[prop]: -distance,
		ease: 'none',
		scrollTrigger: {
			trigger: node.parentElement || node,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true
		}
	});

	return {
		destroy() {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
}
