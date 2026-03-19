interface CounterOptions {
	duration?: number;
	suffix?: string;
	prefix?: string;
}

export function counterUp(node: HTMLElement, options: CounterOptions = {}) {
	const { duration = 2000, suffix = '', prefix = '' } = options;

	// Extract the numeric part — handles "98%", "99.7%", "<50ms", "ISO 27001", "Real-time" etc.
	const rawText = node.textContent || '';
	const numericMatch = rawText.replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
	const target = numericMatch ? Math.round(parseFloat(numericMatch[1])) : NaN;

	let frameId: number;
	let observer: IntersectionObserver;

	// If no valid number found, leave the text as-is and bail out gracefully
	if (isNaN(target)) {
		return { destroy() {} };
	}

	node.textContent = prefix + '0' + suffix;

	function animate() {
		const startTime = performance.now();

		function update(currentTime: number) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			const current = Math.round(eased * target);

			node.textContent = prefix + current.toLocaleString() + suffix;

			if (progress < 1) {
				frameId = requestAnimationFrame(update);
			}
		}

		frameId = requestAnimationFrame(update);
	}

	observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animate();
					observer.disconnect();
				}
			});
		},
		{ threshold: 0.5 }
	);

	observer.observe(node);

	return {
		destroy() {
			cancelAnimationFrame(frameId);
			observer.disconnect();
		}
	};
}
