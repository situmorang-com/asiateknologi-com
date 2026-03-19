import { db } from '$lib/server/db';
import { partners } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function load() {
	const allPartners = await db
		.select()
		.from(partners)
		.where(eq(partners.isActive, 1))
		.orderBy(asc(partners.sortOrder));

	const technologyPartners = allPartners.filter((p) => p.partnerType === 'technology');
	const certificationPartners = allPartners.filter((p) => p.partnerType === 'certification');
	const alliancePartners = allPartners.filter((p) => p.partnerType === 'alliance');

	return {
		technologyPartners,
		certificationPartners,
		alliancePartners
	};
}
