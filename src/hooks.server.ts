import { redirect, type Handle } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;

	if (path.startsWith('/admin') && path !== '/admin/login') {
		const sessionId = event.cookies.get('admin_session');
		if (!sessionId || !validateSession(sessionId)) {
			throw redirect(303, '/admin/login');
		}
		event.locals.admin = true;
	}

	return resolve(event);
};
