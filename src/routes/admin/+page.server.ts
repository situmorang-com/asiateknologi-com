import { db } from '$lib/server/db';
import { contacts, insights, caseStudies, careers } from '$lib/server/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const totalContacts = db
		.select({ count: sql<number>`count(*)` })
		.from(contacts)
		.get();

	const unreadContacts = db
		.select({ count: sql<number>`count(*)` })
		.from(contacts)
		.where(eq(contacts.isRead, 0))
		.get();

	const thisMonth = new Date();
	thisMonth.setDate(1);
	const monthlyContacts = db
		.select({ count: sql<number>`count(*)` })
		.from(contacts)
		.where(sql`${contacts.createdAt} >= ${thisMonth.toISOString()}`)
		.get();

	const totalInsights = db
		.select({ count: sql<number>`count(*)` })
		.from(insights)
		.where(eq(insights.isPublished, 1))
		.get();

	const totalCaseStudies = db
		.select({ count: sql<number>`count(*)` })
		.from(caseStudies)
		.get();

	const totalCareers = db
		.select({ count: sql<number>`count(*)` })
		.from(careers)
		.where(eq(careers.isActive, 1))
		.get();

	const recentContacts = db
		.select()
		.from(contacts)
		.orderBy(desc(contacts.createdAt))
		.limit(8)
		.all();

	return {
		stats: {
			total: totalContacts?.count ?? 0,
			unread: unreadContacts?.count ?? 0,
			monthly: monthlyContacts?.count ?? 0,
			insights: totalInsights?.count ?? 0,
			caseStudies: totalCaseStudies?.count ?? 0,
			careers: totalCareers?.count ?? 0
		},
		recentContacts
	};
};
