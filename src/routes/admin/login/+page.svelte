<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Admin Login - Asiateknologi</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-dark-950 px-6">
	<div class="w-full max-w-sm">
		<div class="mb-8 text-center">
			<div class="mx-auto mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center text-dark-950 font-bold">
				AT
			</div>
			<h1 class="text-2xl font-bold text-dark-100">Admin Access</h1>
			<p class="mt-2 text-sm text-dark-400">Enter the admin password to continue.</p>
		</div>

		<form
			method="POST"
			class="rounded-2xl border border-dark-700/50 bg-dark-900 p-6"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					await update();
					submitting = false;
				};
			}}
		>
			{#if form?.error}
				<div class="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
					{form.error}
				</div>
			{/if}

			<div>
				<label for="password" class="mb-2 block text-sm font-medium text-dark-200">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					autofocus
					class="w-full rounded-lg border border-dark-700 bg-dark-950 px-4 py-3 text-sm text-dark-100 transition-colors focus:border-accent-cyan focus:outline-none"
					placeholder="Enter admin password"
				/>
			</div>

			<button
				type="submit"
				disabled={submitting}
				class="mt-4 w-full rounded-lg bg-gradient-to-r from-accent-cyan to-accent-blue py-3 text-sm font-semibold text-dark-950 transition-all hover:shadow-lg hover:shadow-accent-cyan/25 disabled:opacity-50"
			>
				{submitting ? 'Signing in...' : 'Sign In'}
			</button>
		</form>

		<div class="mt-6 text-center">
			<a href="/" class="text-sm text-dark-500 hover:text-dark-300 transition-colors">
				&larr; Back to website
			</a>
		</div>
	</div>
</div>
