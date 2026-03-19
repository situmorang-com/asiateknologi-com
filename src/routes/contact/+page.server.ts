import { db } from '$lib/server/db';
import { contacts, services } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allServices = db
		.select({ id: services.id, title: services.title, slug: services.slug })
		.from(services)
		.where(eq(services.isActive, 1))
		.orderBy(asc(services.sortOrder))
		.all();

	return { services: allServices };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString().trim();
		const email = formData.get('email')?.toString().trim();
		const company = formData.get('company')?.toString().trim() || null;
		const phone = formData.get('phone')?.toString().trim() || null;
		const serviceInterest = formData.get('serviceInterest')?.toString() || null;
		const budget = formData.get('budget')?.toString() || null;
		const timeline = formData.get('timeline')?.toString() || null;
		const message = formData.get('message')?.toString().trim();

		if (!name || !email || !message) {
			return fail(400, {
				error: 'Name, email, and message are required.',
				name,
				email,
				company,
				phone,
				serviceInterest,
				budget,
				timeline,
				message
			});
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, {
				error: 'Please enter a valid email address.',
				name,
				email,
				company,
				phone,
				serviceInterest,
				budget,
				timeline,
				message
			});
		}

		db.insert(contacts)
			.values({ name, email, company, phone, serviceInterest, budget, timeline, message })
			.run();

		return { success: true };
	}
};
