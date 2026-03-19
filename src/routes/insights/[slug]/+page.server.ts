import { db } from '$lib/server/db';
import { insights } from '$lib/server/db/schema';
import { eq, ne, and, asc } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const insight = db
		.select()
		.from(insights)
		.where(and(eq(insights.slug, params.slug), eq(insights.isPublished, 1)))
		.get();

	if (!insight) {
		throw error(404, 'Insight not found');
	}

	const related = db
		.select()
		.from(insights)
		.where(
			and(
				eq(insights.category, insight.category),
				ne(insights.id, insight.id),
				eq(insights.isPublished, 1)
			)
		)
		.orderBy(asc(insights.sortOrder))
		.limit(3)
		.all();

	return { insight, related };
};
