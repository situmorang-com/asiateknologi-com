import { db } from '$lib/server/db';
import { services, industries, testimonials, clientLogos, partners, insights, caseStudies, devices } from '$lib/server/db/schema';
import { eq, asc, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allServices = db
		.select()
		.from(services)
		.where(eq(services.isActive, 1))
		.orderBy(asc(services.sortOrder))
		.all();

	const allIndustries = db
		.select()
		.from(industries)
		.orderBy(asc(industries.sortOrder))
		.all();

	const allTestimonials = db
		.select()
		.from(testimonials)
		.where(eq(testimonials.isActive, 1))
		.orderBy(asc(testimonials.sortOrder))
		.all();

	const allClientLogos = db
		.select()
		.from(clientLogos)
		.where(eq(clientLogos.isActive, 1))
		.orderBy(asc(clientLogos.sortOrder))
		.all();

	const technologyPartners = db
		.select()
		.from(partners)
		.where(eq(partners.partnerType, 'technology'))
		.orderBy(asc(partners.sortOrder))
		.limit(6)
		.all();

	const recentInsights = db
		.select()
		.from(insights)
		.where(eq(insights.isPublished, 1))
		.orderBy(asc(insights.sortOrder))
		.limit(3)
		.all();

	const featuredCaseStudies = db
		.select()
		.from(caseStudies)
		.where(eq(caseStudies.featured, 1))
		.limit(3)
		.all();

	const allDevices = db
		.select()
		.from(devices)
		.where(eq(devices.isActive, 1))
		.orderBy(asc(devices.sortOrder))
		.all();

	return {
		services: allServices,
		industries: allIndustries,
		testimonials: allTestimonials,
		clientLogos: allClientLogos,
		technologyPartners,
		recentInsights,
		featuredCaseStudies,
		devices: allDevices
	};
};
