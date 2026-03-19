import { db } from '$lib/server/db';
import { insights } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allInsights = db
		.select()
		.from(insights)
		.where(eq(insights.isPublished, 1))
		.orderBy(asc(insights.sortOrder))
		.all();

	const categories = ['All', ...Array.from(new Set(allInsights.map((i) => i.category)))];

	return { insights: allInsights, categories };
};
