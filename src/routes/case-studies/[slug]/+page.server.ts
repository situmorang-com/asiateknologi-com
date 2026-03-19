import { db } from '$lib/server/db';
import { caseStudies } from '$lib/server/db/schema';
import { eq, ne, and, asc } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const caseStudy = db
		.select()
		.from(caseStudies)
		.where(eq(caseStudies.slug, params.slug))
		.get();

	if (!caseStudy) {
		throw error(404, 'Case study not found');
	}

	// Load 2 related case studies from same industry (exclude current)
	const related = db
		.select()
		.from(caseStudies)
		.where(
			and(
				eq(caseStudies.industry, caseStudy.industry),
				ne(caseStudies.id, caseStudy.id)
			)
		)
		.orderBy(asc(caseStudies.sortOrder))
		.limit(2)
		.all();

	// If fewer than 2 related, fill with other case studies
	let relatedCaseStudies = related;
	if (relatedCaseStudies.length < 2) {
		const others = db
			.select()
			.from(caseStudies)
			.where(ne(caseStudies.id, caseStudy.id))
			.orderBy(asc(caseStudies.sortOrder))
			.limit(2 - relatedCaseStudies.length)
			.all();
		relatedCaseStudies = [...relatedCaseStudies, ...others];
	}

	return { caseStudy, related: relatedCaseStudies };
};
