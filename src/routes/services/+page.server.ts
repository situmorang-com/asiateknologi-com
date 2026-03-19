import { db } from '$lib/server/db';
import { services } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allServices = db
		.select({
			id: services.id,
			title: services.title,
			slug: services.slug,
			description: services.description,
			longDescription: services.longDescription,
			icon: services.icon,
			features: services.features,
			techStack: services.techStack,
			engagementModels: services.engagementModels,
			category: services.category,
			sortOrder: services.sortOrder,
			isActive: services.isActive
		})
		.from(services)
		.where(eq(services.isActive, 1))
		.orderBy(asc(services.sortOrder))
		.all();

	return { services: allServices };
};
