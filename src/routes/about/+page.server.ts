import { db } from '$lib/server/db';
import { teamMembers } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const team = db
		.select()
		.from(teamMembers)
		.orderBy(asc(teamMembers.sortOrder))
		.all();

	return { team };
};
