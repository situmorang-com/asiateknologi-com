import { db } from '$lib/server/db';
import { contacts } from '$lib/server/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') || '1');
	const perPage = 20;
	const offset = (page - 1) * perPage;

	const allContacts = db
		.select()
		.from(contacts)
		.orderBy(desc(contacts.createdAt))
		.limit(perPage)
		.offset(offset)
		.all();

	const totalResult = db
		.select({ count: sql<number>`count(*)` })
		.from(contacts)
		.get();

	const total = totalResult?.count ?? 0;

	return {
		contacts: allContacts,
		page,
		totalPages: Math.ceil(total / perPage),
		total
	};
};

export const actions: Actions = {
	toggleRead: async ({ request }) => {
		const formData = await request.formData();
		const id = parseInt(formData.get('id')?.toString() || '0');
		const currentState = parseInt(formData.get('isRead')?.toString() || '0');

		if (!id) return fail(400, { error: 'Invalid contact ID' });

		db.update(contacts)
			.set({ isRead: currentState ? 0 : 1 })
			.where(eq(contacts.id, id))
			.run();

		return { success: true };
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = parseInt(formData.get('id')?.toString() || '0');

		if (!id) return fail(400, { error: 'Invalid contact ID' });

		db.delete(contacts).where(eq(contacts.id, id)).run();

		return { success: true };
	}
};
