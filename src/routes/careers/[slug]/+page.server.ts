import { db } from '$lib/server/db';
import { careers } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [career] = await db
		.select()
		.from(careers)
		.where(and(eq(careers.slug, params.slug), eq(careers.isActive, 1)))
		.limit(1);

	if (!career) {
		error(404, 'Job posting not found');
	}

	return { career };
};

