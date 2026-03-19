import { db } from '$lib/server/db';
import { caseStudies } from '$lib/server/db/schema';
import { desc, asc, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allCaseStudies = db
		.select()
		.from(caseStudies)
		.orderBy(desc(caseStudies.featured), asc(caseStudies.sortOrder))
		.all();

	// Count grouped by industry
	const industryCounts = db
		.select({
			industry: caseStudies.industry,
			industrySlug: caseStudies.industrySlug,
			count: sql<number>`count(*)`.as('count')
		})
		.from(caseStudies)
		.groupBy(caseStudies.industry)
		.all();

	return {
		caseStudies: allCaseStudies,
		industryCounts
	};
};
