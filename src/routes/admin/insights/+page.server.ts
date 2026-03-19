import { db } from '$lib/server/db';
import { insights } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const allInsights = db
		.select()
		.from(insights)
		.orderBy(desc(insights.publishedAt))
		.all();

	return { insights: allInsights };
};

export const actions: Actions = {
	togglePublish: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const current = Number(data.get('isPublished'));

		if (!id) return fail(400, { message: 'Invalid ID' });

		db.update(insights)
			.set({ isPublished: current ? 0 : 1 })
			.where(eq(insights.id, id))
			.run();

		return { success: true };
	}
};
