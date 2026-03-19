export interface Service {
	id: number;
	title: string;
	slug: string;
	description: string;
	longDescription: string | null;
	icon: string | null;
	features: string | null;
	sortOrder: number | null;
	isActive: number | null;
}

export interface Industry {
	id: number;
	name: string;
	slug: string;
	description: string;
	longDescription: string | null;
	heroImage: string | null;
	solutions: string | null;
	sortOrder: number | null;
}

export interface TeamMember {
	id: number;
	name: string;
	role: string;
	bio: string | null;
	photoUrl: string | null;
	linkedinUrl: string | null;
	sortOrder: number | null;
}

export interface Contact {
	id: number;
	name: string;
	email: string;
	company: string | null;
	phone: string | null;
	serviceInterest: string | null;
	message: string;
	isRead: number | null;
	createdAt: string | null;
}
