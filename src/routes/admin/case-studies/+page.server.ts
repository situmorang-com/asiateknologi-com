import { db } from '$lib/server/db';
import { caseStudies } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const allCaseStudies = db
		.select()
		.from(caseStudies)
		.orderBy(asc(caseStudies.sortOrder))
		.all();

	return { caseStudies: allCaseStudies };
};

export const actions: Actions = {
	toggleFeatured: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const current = Number(data.get('featured'));

		if (!id) return fail(400, { message: 'Invalid ID' });

		db.update(caseStudies)
			.set({ featured: current ? 0 : 1 })
			.where(eq(caseStudies.id, id))
			.run();

		return { success: true };
	}
};
