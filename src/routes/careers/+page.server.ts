import { db } from '$lib/server/db';
import { careers } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function load() {
	const allCareers = await db
		.select()
		.from(careers)
		.where(eq(careers.isActive, 1))
		.orderBy(desc(careers.publishedAt));

	return {
		careers: allCareers
	};
}
