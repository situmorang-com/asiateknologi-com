import { db } from '$lib/server/db';
import { industries } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allIndustries = db
		.select()
		.from(industries)
		.orderBy(asc(industries.sortOrder))
		.all();

	return { industries: allIndustries };
};
