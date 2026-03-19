import { db } from '$lib/server/db';
import { services, caseStudies, testimonials } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const service = db
		.select()
		.from(services)
		.where(eq(services.slug, params.slug))
		.get();

	if (!service || !service.isActive) {
		throw error(404, 'Service not found');
	}

	// All other active services for the "Other Services" section
	const otherServices = db
		.select()
		.from(services)
		.where(eq(services.isActive, 1))
		.orderBy(asc(services.sortOrder))
		.all()
		.filter((s) => s.slug !== params.slug)
		.slice(0, 4);

	// Related case studies
	const relatedCaseStudies = db
		.select()
		.from(caseStudies)
		.where(eq(caseStudies.serviceSlug, params.slug))
		.limit(3)
		.all();

	// Related testimonials
	const relatedTestimonials = db
		.select()
		.from(testimonials)
		.where(eq(testimonials.serviceSlug, params.slug))
		.limit(2)
		.all();

	// Fall back to general testimonials if none specific
	const displayTestimonials =
		relatedTestimonials.length > 0
			? relatedTestimonials
			: db
					.select()
					.from(testimonials)
					.where(eq(testimonials.isActive, 1))
					.limit(2)
					.all();

	return { service, otherServices, relatedCaseStudies, testimonials: displayTestimonials };
};
