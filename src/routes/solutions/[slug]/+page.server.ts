import { db } from '$lib/server/db';
import { industries, services, caseStudies, insights } from '$lib/server/db/schema';
import { eq, asc, or } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const industry = db
		.select()
		.from(industries)
		.where(eq(industries.slug, params.slug))
		.get();

	if (!industry) {
		throw error(404, 'Industry not found');
	}

	const allServices = db
		.select()
		.from(services)
		.where(eq(services.isActive, 1))
		.orderBy(asc(services.sortOrder))
		.all();

	// Related case studies for this industry
	const relatedCaseStudies = db
		.select()
		.from(caseStudies)
		.where(eq(caseStudies.industrySlug, params.slug))
		.orderBy(asc(caseStudies.sortOrder))
		.limit(3)
		.all();

	// Related insights by industry keyword (by category or tags matching industry name)
	const allInsights = db
		.select()
		.from(insights)
		.where(eq(insights.isPublished, 1))
		.orderBy(asc(insights.sortOrder))
		.limit(3)
		.all();

	return { industry, services: allServices, relatedCaseStudies, relatedInsights: allInsights };
};
