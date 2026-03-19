import { db } from '$lib/server/db';
import { careers } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const allCareers = db
		.select()
		.from(careers)
		.orderBy(asc(careers.publishedAt))
		.all();

	return { careers: allCareers };
};

export const actions: Actions = {
	toggleActive: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const current = Number(data.get('isActive'));

		if (!id) return fail(400, { message: 'Invalid ID' });

		db.update(careers)
			.set({ isActive: current ? 0 : 1 })
			.where(eq(careers.id, id))
			.run();

		return { success: true };
	}
};
