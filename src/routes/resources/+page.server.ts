import { db } from '$lib/server/db';
import { resources } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function load() {
	const allResources = await db
		.select()
		.from(resources)
		.where(eq(resources.isPublished, 1))
		.orderBy(asc(resources.sortOrder));

	return {
		resources: allResources
	};
}
