import { db } from '$lib/server/db';
import { devices } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allDevices = db
		.select()
		.from(devices)
		.where(eq(devices.isActive, 1))
		.orderBy(devices.sortOrder)
		.all();

	// Parse JSON fields
	const parsedDevices = allDevices.map((device) => ({
		...device,
		specs: device.specs ? JSON.parse(device.specs) : {},
		features: device.features ? JSON.parse(device.features) : []
	}));

	// Group by category
	const byCategory = parsedDevices.reduce(
		(acc, device) => {
			if (!acc[device.category]) acc[device.category] = [];
			acc[device.category].push(device);
			return acc;
		},
		{} as Record<string, typeof parsedDevices>
	);

	return {
		devices: parsedDevices,
		byCategory
	};
};
