import { fail, redirect } from '@sveltejs/kit';
import { createSession } from '$lib/server/auth';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('admin_session');
	if (sessionId) {
		const { validateSession } = await import('$lib/server/auth');
		if (validateSession(sessionId)) {
			throw redirect(303, '/admin');
		}
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const password = formData.get('password')?.toString();

		if (!password || password !== (env.ADMIN_PASSWORD || 'admin')) {
			return fail(401, { error: 'Invalid password' });
		}

		const sessionId = createSession();
		cookies.set('admin_session', sessionId, {
			path: '/admin',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24
		});

		throw redirect(303, '/admin');
	}
};
