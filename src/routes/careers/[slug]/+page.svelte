<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { scrollReveal } from '$lib/animations/actions/scrollReveal';
	import { textScramble } from '$lib/animations/actions/textScramble';

	let { data } = $props();

	const job = $derived(data.career);

	function parseJson(val: string | null): string[] {
		if (!val) return [];
		try {
			return JSON.parse(val);
		} catch {
			return [];
		}
	}

	const requirements = $derived(parseJson(job.requirements));
	const niceToHave = $derived(parseJson(job.niceToHave));
	const benefits = $derived(parseJson(job.benefits));

	// Apply form state
	let formName = $state('');
	let formEmail = $state('');
	let formLinkedIn = $state('');
	let formMessage = $state('');
	let formFileName = $state('');
	let submitted = $state(false);
	let submitting = $state(false);

	function handleFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files?.[0]) {
			formFileName = input.files[0].name;
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		submitting = true;
		// Simulate submission delay — actual integration would POST to an API route
		await new Promise((r) => setTimeout(r, 1200));
		submitted = true;
		submitting = false;
	}

	const typeColors: Record<string, string> = {
		'Full-time': 'bg-green-500/15 text-green-400 border border-green-500/20',
		'Part-time': 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
		Contract: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',
		Internship: 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
	};

	function getTypeClass(type: string): string {
		return typeColors[type] ?? 'bg-dark-700/50 text-dark-300 border border-dark-600/50';
	}
</script>

<svelte:head>
	<title>{job.title} — Careers at Asiateknologi</title>
	<meta name="description" content="Apply for {job.title} at Asiateknologi. {job.description.slice(0, 150)}..." />
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden pb-16 pt-32">
	<div class="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
	<div
		class="absolute inset-0 opacity-[0.03]"
		style="background-image: radial-gradient(circle at 1px 1px, rgba(0,229,255,0.8) 1px, transparent 0); background-size: 36px 36px;"
	></div>

	<div class="relative mx-auto max-w-5xl px-6">
		<a
			href="/careers"
			class="mb-8 inline-flex items-center gap-2 text-sm text-dark-400 transition-colors hover:text-accent-cyan"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
			</svg>
			All Open Positions
		</a>

		<div class="flex flex-wrap items-start justify-between gap-6">
			<div class="min-w-0 flex-1">
				<div class="mb-3 flex flex-wrap items-center gap-2">
					<span
						class="rounded-full bg-accent-blue/15 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-accent-blue border border-accent-blue/20"
					>
						{job.department}
					</span>
					<span
						class="rounded-full px-2.5 py-1 text-xs font-medium {getTypeClass(job.type)}"
					>
						{job.type}
					</span>
				</div>

				<h1
					class="text-4xl font-bold text-dark-100 md:text-5xl"
					use:textScramble
				>
					{job.title}
				</h1>

				<div class="mt-5 flex flex-wrap items-center gap-5 text-sm text-dark-400">
					<span class="flex items-center gap-1.5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
							<circle cx="12" cy="10" r="3" />
						</svg>
						{job.location}
					</span>
					{#if job.experience}
						<span class="flex items-center gap-1.5">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
							</svg>
							{job.experience}
						</span>
					{/if}
				</div>
			</div>

			<div class="shrink-0" use:scrollReveal={{ delay: 0.2 }}>
				<a
					href="#apply"
					class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue px-7 py-3.5 font-semibold text-dark-950 transition-all hover:brightness-110 hover:shadow-lg hover:shadow-accent-cyan/25"
				>
					Apply Now
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
					>
						<path d="m9 18 6-6-6-6" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Job Detail Content -->
<section class="bg-dark-900 py-16">
	<div class="mx-auto max-w-5xl px-6">
		<div class="grid gap-12 lg:grid-cols-3">
			<!-- Main Content -->
			<div class="lg:col-span-2" use:scrollReveal>
				<!-- About the Role -->
				<div class="mb-10">
					<h2 class="mb-4 text-xl font-bold text-dark-100">About the Role</h2>
					<p class="leading-relaxed text-dark-400">{job.description}</p>
				</div>

				<!-- Requirements -->
				{#if requirements.length > 0}
					<div class="mb-10">
						<h2 class="mb-5 flex items-center gap-2 text-xl font-bold text-dark-100">
							<span
								class="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="15"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<polyline points="9 11 12 14 22 4" />
									<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
								</svg>
							</span>
							Requirements
						</h2>
						<ul class="space-y-3">
							{#each requirements as req}
								<li class="flex items-start gap-3 text-dark-300">
									<span
										class="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-cyan/10 text-accent-cyan"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="9"
											height="9"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="3"
										>
											<polyline points="20 6 9 17 4 12" />
										</svg>
									</span>
									{req}
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Nice to Have -->
				{#if niceToHave.length > 0}
					<div class="mb-10">
						<h2 class="mb-5 flex items-center gap-2 text-xl font-bold text-dark-100">
							<span
								class="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-purple/10 text-accent-purple"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="15"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
									/>
								</svg>
							</span>
							Nice to Have
						</h2>
						<ul class="space-y-3">
							{#each niceToHave as item}
								<li class="flex items-start gap-3 text-dark-300">
									<span
										class="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-purple/10 text-accent-purple"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="9"
											height="9"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										>
											<path d="M12 5v14M5 12h14" />
										</svg>
									</span>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Benefits -->
				{#if benefits.length > 0}
					<div>
						<h2 class="mb-5 flex items-center gap-2 text-xl font-bold text-dark-100">
							<span
								class="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-400"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="15"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M20 12V22H4V12" />
									<path d="M22 7H2v5h20V7z" />
									<path d="M12 22V7" />
									<path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
									<path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
								</svg>
							</span>
							Role Benefits
						</h2>
						<ul class="space-y-3">
							{#each benefits as benefit}
								<li class="flex items-start gap-3 text-dark-300">
									<span
										class="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-400"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="9"
											height="9"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="3"
										>
											<polyline points="20 6 9 17 4 12" />
										</svg>
									</span>
									{benefit}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>

			<!-- Sidebar -->
			<aside use:scrollReveal={{ delay: 0.15 }}>
				<div
					class="sticky top-28 rounded-2xl border border-dark-700/50 bg-dark-950/80 p-6"
				>
					<h3 class="mb-4 font-semibold text-dark-100">Job Summary</h3>
					<dl class="space-y-3 text-sm">
						<div>
							<dt class="font-mono text-[10px] uppercase tracking-wider text-dark-500">
								Department
							</dt>
							<dd class="mt-1 text-dark-200">{job.department}</dd>
						</div>
						<div>
							<dt class="font-mono text-[10px] uppercase tracking-wider text-dark-500">Location</dt>
							<dd class="mt-1 text-dark-200">{job.location}</dd>
						</div>
						<div>
							<dt class="font-mono text-[10px] uppercase tracking-wider text-dark-500">
								Employment Type
							</dt>
							<dd class="mt-1 text-dark-200">{job.type}</dd>
						</div>
						{#if job.experience}
							<div>
								<dt class="font-mono text-[10px] uppercase tracking-wider text-dark-500">
									Experience
								</dt>
								<dd class="mt-1 text-dark-200">{job.experience}</dd>
							</div>
						{/if}
					</dl>

					<div class="mt-6 border-t border-dark-700/50 pt-5">
						<a
							href="#apply"
							class="block w-full rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue py-3 text-center font-semibold text-dark-950 transition-all hover:brightness-110 hover:shadow-lg hover:shadow-accent-cyan/20"
						>
							Apply Now
						</a>
					</div>

					<p class="mt-4 text-center text-xs text-dark-500">
						Questions? Email <a
							href="mailto:careers@asiateknologi.com"
							class="text-accent-cyan hover:underline">careers@asiateknologi.com</a
						>
					</p>
				</div>
			</aside>
		</div>
	</div>
</section>

<!-- Application Form -->
<section id="apply" class="bg-dark-950 py-24">
	<div class="mx-auto max-w-3xl px-6">
		<div class="mb-10 text-center" use:scrollReveal>
			<span
				class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
			>
				Apply
			</span>
			<h2 class="mt-3 text-3xl font-bold text-dark-100 md:text-4xl">
				Apply for {job.title}
			</h2>
			<p class="mt-3 text-dark-400">
				Fill in the form below and we'll get back to you within 3–5 business days.
			</p>
		</div>

		<div
			class="overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-900/60"
			use:scrollReveal={{ delay: 0.1 }}
		>
			{#if submitted}
				<!-- Success State -->
				<div class="px-8 py-16 text-center">
					<div
						class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 text-green-400 ring-1 ring-green-500/20"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<circle cx="12" cy="12" r="10" />
							<polyline points="9 12 11.5 14.5 15.5 9.5" />
						</svg>
					</div>
					<h3 class="text-2xl font-bold text-dark-100">Application Submitted!</h3>
					<p class="mx-auto mt-3 max-w-md text-dark-400">
						Thank you for applying for the <strong class="text-dark-200">{job.title}</strong> position.
						Our team will review your application and reach out within 3–5 business days.
					</p>
					<div class="mt-8">
						<Button href="/careers" variant="secondary" size="md">Browse More Positions</Button>
					</div>
				</div>
			{:else}
				<!-- Form -->
				<form class="p-8" onsubmit={handleSubmit} novalidate>
					<div class="grid gap-6 sm:grid-cols-2">
						<!-- Full Name -->
						<div class="sm:col-span-2">
							<label for="name" class="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-dark-400">
								Full Name <span class="text-accent-cyan">*</span>
							</label>
							<input
								id="name"
								type="text"
								bind:value={formName}
								required
								placeholder="Your full name"
								class="w-full rounded-xl border border-dark-600/60 bg-dark-800/60 px-4 py-3 text-dark-100 placeholder-dark-600 outline-none transition-all focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/10"
							/>
						</div>

						<!-- Email -->
						<div>
							<label for="email" class="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-dark-400">
								Email Address <span class="text-accent-cyan">*</span>
							</label>
							<input
								id="email"
								type="email"
								bind:value={formEmail}
								required
								placeholder="you@company.com"
								class="w-full rounded-xl border border-dark-600/60 bg-dark-800/60 px-4 py-3 text-dark-100 placeholder-dark-600 outline-none transition-all focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/10"
							/>
						</div>

						<!-- LinkedIn -->
						<div>
							<label for="linkedin" class="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-dark-400">
								LinkedIn URL
							</label>
							<input
								id="linkedin"
								type="url"
								bind:value={formLinkedIn}
								placeholder="linkedin.com/in/yourprofile"
								class="w-full rounded-xl border border-dark-600/60 bg-dark-800/60 px-4 py-3 text-dark-100 placeholder-dark-600 outline-none transition-all focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/10"
							/>
						</div>

						<!-- Cover Letter / Message -->
						<div class="sm:col-span-2">
							<label for="message" class="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-dark-400">
								Cover Letter / Message <span class="text-accent-cyan">*</span>
							</label>
							<textarea
								id="message"
								bind:value={formMessage}
								required
								rows={6}
								placeholder="Tell us about yourself, your experience, and why you're excited about this role..."
								class="w-full resize-none rounded-xl border border-dark-600/60 bg-dark-800/60 px-4 py-3 text-dark-100 placeholder-dark-600 outline-none transition-all focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/10"
							></textarea>
						</div>

						<!-- Resume Upload -->
						<div class="sm:col-span-2">
							<label class="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-dark-400">
								Resume / CV
							</label>
							<label
								class="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-dark-600/60 bg-dark-800/40 px-6 py-8 text-center transition-all hover:border-accent-cyan/40 hover:bg-dark-700/30"
							>
								<div
									class="flex h-12 w-12 items-center justify-center rounded-xl bg-dark-700/80 text-dark-400 transition-colors group-hover:text-accent-cyan"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="22"
										height="22"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
									>
										<path
											d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
										/>
										<polyline points="17 8 12 3 7 8" />
										<line x1="12" y1="3" x2="12" y2="15" />
									</svg>
								</div>
								{#if formFileName}
									<div>
										<p class="font-medium text-accent-cyan">{formFileName}</p>
										<p class="mt-1 text-xs text-dark-500">Click to change file</p>
									</div>
								{:else}
									<div>
										<p class="font-medium text-dark-300">
											Drag &amp; drop or <span class="text-accent-cyan">browse files</span>
										</p>
										<p class="mt-1 text-xs text-dark-500">PDF, DOC, DOCX up to 10MB</p>
									</div>
								{/if}
								<input
									type="file"
									accept=".pdf,.doc,.docx"
									class="hidden"
									onchange={handleFileChange}
								/>
							</label>
						</div>
					</div>

					<!-- Submit -->
					<div class="mt-8 flex items-center justify-between gap-4">
						<p class="text-xs text-dark-500">
							By submitting, you agree to our
							<a href="/privacy" class="text-accent-cyan hover:underline">Privacy Policy</a>.
						</p>
						<button
							type="submit"
							disabled={submitting || !formName || !formEmail || !formMessage}
							class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue px-8 py-3 font-semibold text-dark-950 transition-all hover:brightness-110 hover:shadow-lg hover:shadow-accent-cyan/25 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{#if submitting}
								<svg
									class="animate-spin"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M21 12a9 9 0 1 1-6.219-8.56" />
								</svg>
								Submitting...
							{:else}
								Submit Application
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
								</svg>
							{/if}
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
</section>
