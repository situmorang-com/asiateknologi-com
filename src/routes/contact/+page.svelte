<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { textScramble } from '$lib/animations/actions/textScramble';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let submitting = $state(false);
	let showSuccess = $state(false);

	$effect(() => {
		if (form?.success) {
			showSuccess = true;
		}
	});

	const whyPoints = [
		'15+ years serving enterprise clients across Asia',
		'Certified engineers across cloud, IoT, and security',
		'Dedicated account manager from day one',
		'Proven track record with 200+ successful deployments'
	];
</script>

<svelte:head>
	<title>Contact - Asiateknologi</title>
	<meta name="description" content="Get in touch with Asiateknologi for IT consulting, IoT solutions, system integration, and more." />
</svelte:head>

<!-- Hero -->
<section class="relative pt-32 pb-16 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<div class="relative mx-auto max-w-7xl px-6 text-center">
		<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan" use:scrollReveal>
			Contact Us
		</span>
		<h1 class="mt-4 text-4xl font-bold text-dark-100 md:text-6xl" use:textScramble>
			Let's Start a Conversation
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg text-dark-400" use:scrollReveal={{ delay: 0.2 }}>
			Ready to discuss your next technology project? Our team is here to help you find the
			right solution.
		</p>
	</div>
</section>

<!-- Contact Section -->
<section class="py-24 bg-dark-900">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid gap-12 lg:grid-cols-[1fr_1.6fr]">

			<!-- Left column: info + why work with us -->
			<div use:scrollReveal={{ direction: 'left' }} class="space-y-8">
				<div>
					<h2 class="text-2xl font-bold text-dark-100">Get in Touch</h2>
					<p class="mt-4 text-dark-400 leading-relaxed">
						Whether you have a specific project in mind or just want to explore possibilities,
						we'd love to hear from you.
					</p>
				</div>

				<!-- Contact info cards -->
				<div class="space-y-4">
					<div class="flex items-start gap-4 rounded-xl border border-dark-700/50 bg-dark-950 p-4">
						<div class="rounded-lg bg-accent-cyan/10 p-2.5 text-accent-cyan shrink-0">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
						</div>
						<div>
							<p class="text-sm font-medium text-dark-200">Email</p>
							<a href="mailto:info@asiateknologi.com" class="text-sm text-accent-cyan hover:underline">info@asiateknologi.com</a>
						</div>
					</div>

					<div class="flex items-start gap-4 rounded-xl border border-dark-700/50 bg-dark-950 p-4">
						<div class="rounded-lg bg-accent-cyan/10 p-2.5 text-accent-cyan shrink-0">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
						</div>
						<div>
							<p class="text-sm font-medium text-dark-200">Phone</p>
							<a href="tel:+622155501000" class="text-sm text-accent-cyan hover:underline">+62 21 555 0100</a>
						</div>
					</div>

					<div class="flex items-start gap-4 rounded-xl border border-dark-700/50 bg-dark-950 p-4">
						<div class="rounded-lg bg-accent-cyan/10 p-2.5 text-accent-cyan shrink-0">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
						</div>
						<div>
							<p class="text-sm font-medium text-dark-200">Office</p>
							<p class="text-sm text-dark-400">Jakarta, Indonesia</p>
						</div>
					</div>
				</div>

				<!-- Operating hours -->
				<div class="rounded-xl border border-dark-700/50 bg-dark-950 p-6">
					<h3 class="font-mono text-xs font-semibold uppercase tracking-widest text-accent-cyan">Operating Hours</h3>
					<div class="mt-4 space-y-2 text-sm text-dark-400">
						<div class="flex justify-between">
							<span>Monday – Friday</span>
							<span class="text-dark-200">09:00 – 18:00 WIB</span>
						</div>
						<div class="flex justify-between">
							<span>Saturday</span>
							<span class="text-dark-200">09:00 – 13:00 WIB</span>
						</div>
						<div class="flex justify-between">
							<span>Sunday</span>
							<span class="text-dark-500">Closed</span>
						</div>
					</div>
				</div>

				<!-- Why Work With Us -->
				<div class="rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-6">
					<h3 class="font-mono text-xs font-semibold uppercase tracking-widest text-accent-cyan">Why Work With Us?</h3>
					<ul class="mt-4 space-y-3">
						{#each whyPoints as point}
							<li class="flex items-start gap-3 text-sm text-dark-300">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-accent-cyan mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
								{point}
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- Right column: form -->
			<div use:scrollReveal={{ direction: 'right' }}>
				{#if showSuccess}
					<div class="flex flex-col items-center justify-center rounded-2xl border border-accent-green/30 bg-accent-green/5 p-12 text-center">
						<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-green/20">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent-green success-check">
								<path d="M20 6 9 17l-5-5" />
							</svg>
						</div>
						<h3 class="text-2xl font-bold text-dark-100">Message Sent!</h3>
						<p class="mt-2 text-dark-400">We'll get back to you within 1 business day.</p>
						<button
							class="mt-6 text-sm text-accent-cyan hover:underline"
							onclick={() => (showSuccess = false)}
						>
							Send another message
						</button>
					</div>
				{:else}
					<form
						method="POST"
						class="rounded-2xl border border-dark-700/50 bg-dark-950 p-8"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								await update();
								submitting = false;
							};
						}}
					>
						{#if form?.error}
							<div class="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
								{form.error}
							</div>
						{/if}

						<div class="grid gap-6 sm:grid-cols-2">
							<div>
								<label for="name" class="mb-2 block text-sm font-medium text-dark-200">Name *</label>
								<input
									id="name"
									name="name"
									type="text"
									required
									value={form?.name ?? ''}
									class="w-full rounded-lg border border-dark-700 bg-dark-900 px-4 py-3 text-sm text-dark-100 placeholder-dark-500 transition-colors focus:border-accent-cyan focus:outline-none"
									placeholder="Your name"
								/>
							</div>

							<div>
								<label for="email" class="mb-2 block text-sm font-medium text-dark-200">Email *</label>
								<input
									id="email"
									name="email"
									type="email"
									required
									value={form?.email ?? ''}
									class="w-full rounded-lg border border-dark-700 bg-dark-900 px-4 py-3 text-sm text-dark-100 placeholder-dark-500 transition-colors focus:border-accent-cyan focus:outline-none"
									placeholder="you@company.com"
								/>
							</div>

							<div>
								<label for="company" class="mb-2 block text-sm font-medium text-dark-200">Company</label>
								<input
									id="company"
									name="company"
									type="text"
									value={form?.company ?? ''}
									class="w-full rounded-lg border border-dark-700 bg-dark-900 px-4 py-3 text-sm text-dark-100 placeholder-dark-500 transition-colors focus:border-accent-cyan focus:outline-none"
									placeholder="Company name"
								/>
							</div>

							<div>
								<label for="phone" class="mb-2 block text-sm font-medium text-dark-200">Phone</label>
								<input
									id="phone"
									name="phone"
									type="tel"
									value={form?.phone ?? ''}
									class="w-full rounded-lg border border-dark-700 bg-dark-900 px-4 py-3 text-sm text-dark-100 placeholder-dark-500 transition-colors focus:border-accent-cyan focus:outline-none"
									placeholder="+62 xxx xxxx"
								/>
							</div>
						</div>

						<div class="mt-6">
							<label for="serviceInterest" class="mb-2 block text-sm font-medium text-dark-200">Service Interest</label>
							<select
								id="serviceInterest"
								name="serviceInterest"
								class="w-full rounded-lg border border-dark-700 bg-dark-900 px-4 py-3 text-sm text-dark-100 transition-colors focus:border-accent-cyan focus:outline-none"
							>
								<option value="">Select a service (optional)</option>
								{#each data.services as service}
									<option value={service.title} selected={form?.serviceInterest === service.title}>{service.title}</option>
								{/each}
							</select>
						</div>

						<!-- Budget -->
						<div class="mt-6">
							<label for="budget" class="mb-2 block text-sm font-medium text-dark-200">Project Budget</label>
							<select
								id="budget"
								name="budget"
								class="w-full rounded-lg border border-dark-700 bg-dark-900 px-4 py-3 text-sm text-dark-100 transition-colors focus:border-accent-cyan focus:outline-none"
							>
								<option value="">— Select a budget range —</option>
								<option value="Under $10,000" selected={form?.budget === 'Under $10,000'}>Under $10,000</option>
								<option value="$10,000 – $50,000" selected={form?.budget === '$10,000 – $50,000'}>$10,000 – $50,000</option>
								<option value="$50,000 – $200,000" selected={form?.budget === '$50,000 – $200,000'}>$50,000 – $200,000</option>
								<option value="$200,000+" selected={form?.budget === '$200,000+'}>$200,000+</option>
								<option value="Let's discuss" selected={form?.budget === "Let's discuss"}>Let's discuss</option>
							</select>
						</div>

						<!-- Timeline -->
						<div class="mt-6">
							<label for="timeline" class="mb-2 block text-sm font-medium text-dark-200">Project Timeline</label>
							<select
								id="timeline"
								name="timeline"
								class="w-full rounded-lg border border-dark-700 bg-dark-900 px-4 py-3 text-sm text-dark-100 transition-colors focus:border-accent-cyan focus:outline-none"
							>
								<option value="">— Select a timeline —</option>
								<option value="Immediately (ASAP)" selected={form?.timeline === 'Immediately (ASAP)'}>Immediately (ASAP)</option>
								<option value="1–3 months" selected={form?.timeline === '1–3 months'}>1–3 months</option>
								<option value="3–6 months" selected={form?.timeline === '3–6 months'}>3–6 months</option>
								<option value="6–12 months" selected={form?.timeline === '6–12 months'}>6–12 months</option>
								<option value="Just exploring" selected={form?.timeline === 'Just exploring'}>Just exploring</option>
							</select>
						</div>

						<div class="mt-6">
							<label for="message" class="mb-2 block text-sm font-medium text-dark-200">Message *</label>
							<textarea
								id="message"
								name="message"
								required
								rows="5"
								class="w-full resize-none rounded-lg border border-dark-700 bg-dark-900 px-4 py-3 text-sm text-dark-100 placeholder-dark-500 transition-colors focus:border-accent-cyan focus:outline-none"
								placeholder="Tell us about your project or requirements..."
							>{form?.message ?? ''}</textarea>
						</div>

						<div class="mt-8 space-y-4">
							<Button type="submit" variant="primary" size="lg" disabled={submitting}>
								{#if submitting}
									<span class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-dark-950 border-t-transparent"></span>
									Sending...
								{:else}
									Send Message
								{/if}
							</Button>

							<p class="text-xs text-dark-500 flex items-center gap-1.5">
								<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
								We respond within 1 business day.
							</p>
						</div>

						<!-- OR divider -->
						<div class="relative my-8 flex items-center gap-4">
							<div class="h-px flex-1 bg-dark-700"></div>
							<span class="font-mono text-xs font-semibold uppercase tracking-widest text-dark-500">OR</span>
							<div class="h-px flex-1 bg-dark-700"></div>
						</div>

						<!-- WhatsApp CTA -->
						<a
							href="https://wa.me/6221555010"
							target="_blank"
							rel="noopener noreferrer"
							class="flex w-full items-center justify-center gap-3 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-6 py-4 text-sm font-medium text-[#25D366] transition-all hover:bg-[#25D366]/20 hover:border-[#25D366]/50"
						>
							<!-- WhatsApp icon -->
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
							</svg>
							Chat on WhatsApp — Typical reply within 2 hours
						</a>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.success-check {
		stroke-dasharray: 30;
		stroke-dashoffset: 30;
		animation: drawCheck 0.5s ease-out 0.2s forwards;
	}

	@keyframes drawCheck {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
