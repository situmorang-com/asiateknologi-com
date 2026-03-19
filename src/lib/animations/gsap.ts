import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global GSAP defaults — forces GPU compositor layer for all animations
gsap.config({
	force3D: true,         // All transforms use translate3d — no layout reflow
	nullTargetWarn: false
});

// ScrollTrigger global config for smoother scroll performance
ScrollTrigger.config({
	limitCallbacks: true,      // Only fire when threshold is actually crossed
	ignoreMobileResize: true   // Prevent iOS address-bar resize from causing jitter
});

export { gsap, ScrollTrigger };

export const EASE = {
	smooth: 'power2.out',
	bounce: 'elastic.out(1, 0.5)',
	snap: 'power4.out',
	gentle: 'power1.inOut'
};

export const DURATION = {
	fast: 0.3,
	normal: 0.5,
	slow: 0.9,
	reveal: 0.7    // Slightly faster — feels crisper
};
