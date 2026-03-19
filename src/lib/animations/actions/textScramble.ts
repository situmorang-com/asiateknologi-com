const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

interface TextScrambleOptions {
	speed?: number;
	delay?: number;
}

export function textScramble(node: HTMLElement, options: TextScrambleOptions = {}) {
	const { speed = 30, delay = 0 } = options;
	const originalText = node.textContent || '';
	let frameId: number;
	let timeoutId: ReturnType<typeof setTimeout>;
	let observer: IntersectionObserver;

	function scramble() {
		let iteration = 0;
		const length = originalText.length;

		function update() {
			const text = originalText
				.split('')
				.map((char, index) => {
					if (char === ' ') return ' ';
					if (index < iteration) return originalText[index];
					return CHARS[Math.floor(Math.random() * CHARS.length)];
				})
				.join('');

			node.textContent = text;

			if (iteration < length) {
				iteration += 0.5;
				frameId = requestAnimationFrame(update);
			}
		}

		node.textContent = originalText.replace(/[^\s]/g, () =>
			CHARS[Math.floor(Math.random() * CHARS.length)]
		);

		timeoutId = setTimeout(() => {
			frameId = requestAnimationFrame(update);
		}, delay);
	}

	observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setTimeout(scramble, speed);
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
			clearTimeout(timeoutId);
			observer.disconnect();
		}
	};
}
