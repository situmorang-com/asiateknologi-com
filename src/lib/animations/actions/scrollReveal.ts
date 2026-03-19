import { gsap, DURATION, EASE } from '../gsap';

interface ScrollRevealOptions {
	direction?: 'up' | 'down' | 'left' | 'right';
	delay?: number;
	distance?: number;
	duration?: number;
	stagger?: number;
	children?: boolean;
}

export function scrollReveal(node: HTMLElement, options: ScrollRevealOptions = {}) {
	const {
		direction = 'up',
		delay = 0,
		distance = 28,           // Reduced from 60 → subtle, smooth movement
		duration = DURATION.reveal,
		stagger = 0,
		children = false
	} = options;

	const directionMap = {
		up:    { y: distance, x: 0 },
		down:  { y: -distance, x: 0 },
		left:  { x: distance, y: 0 },
		right: { x: -distance, y: 0 }
	};

	const { x, y } = directionMap[direction];
	const targets = children ? node.children : node;

	// Set initial hidden state — use force3D to immediately promote to GPU layer
	gsap.set(targets, {
		opacity: 0,
		x,
		y,
		force3D: true,
		immediateRender: true    // Apply instantly, no flicker on first frame
	});

	const tween = gsap.to(targets, {
		opacity: 1,
		x: 0,
		y: 0,
		duration,
		delay,
		ease: EASE.smooth,
		force3D: true,           // Compositor layer — no paint/layout cost during animation
		stagger: stagger || undefined,
		scrollTrigger: {
			trigger: node,
			start: 'top 90%',    // Trigger later so element is already partly visible
			toggleActions: 'play none none none',
			fastScrollEnd: true  // Snap to final state on fast scroll — no half-animated freeze
		}
	});

	return {
		destroy() {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
}
