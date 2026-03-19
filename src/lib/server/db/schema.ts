import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ─── CONTACTS ────────────────────────────────────────────────────────────────
export const contacts = sqliteTable('contacts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	email: text('email').notNull(),
	company: text('company'),
	phone: text('phone'),
	serviceInterest: text('service_interest'),
	budget: text('budget'),
	timeline: text('timeline'),
	message: text('message').notNull(),
	isRead: integer('is_read').default(0),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// ─── SERVICES ─────────────────────────────────────────────────────────────────
export const services = sqliteTable('services', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	description: text('description').notNull(),
	longDescription: text('long_description'),
	icon: text('icon'),
	features: text('features'),
	techStack: text('tech_stack'),
	engagementModels: text('engagement_models'),
	category: text('category'),
	sortOrder: integer('sort_order').default(0),
	isActive: integer('is_active').default(1)
});

// ─── INDUSTRIES ──────────────────────────────────────────────────────────────
export const industries = sqliteTable('industries', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	description: text('description').notNull(),
	longDescription: text('long_description'),
	heroImage: text('hero_image'),
	solutions: text('solutions'),
	metrics: text('metrics'),
	sortOrder: integer('sort_order').default(0)
});

// ─── CASE STUDIES ─────────────────────────────────────────────────────────────
export const caseStudies = sqliteTable('case_studies', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	client: text('client').notNull(),
	clientLogo: text('client_logo'),
	industry: text('industry').notNull(),
	industrySlug: text('industry_slug'),
	serviceSlug: text('service_slug'),
	challenge: text('challenge').notNull(),
	solution: text('solution').notNull(),
	results: text('results').notNull(),
	metrics: text('metrics'),
	technologies: text('technologies'),
	testimonialQuote: text('testimonial_quote'),
	testimonialAuthor: text('testimonial_author'),
	testimonialTitle: text('testimonial_title'),
	coverGradient: text('cover_gradient'),
	featured: integer('featured').default(0),
	sortOrder: integer('sort_order').default(0),
	publishedAt: text('published_at').default(sql`CURRENT_TIMESTAMP`)
});

// ─── INSIGHTS (BLOG) ──────────────────────────────────────────────────────────
export const insights = sqliteTable('insights', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	excerpt: text('excerpt').notNull(),
	content: text('content').notNull(),
	author: text('author').notNull(),
	authorRole: text('author_role'),
	category: text('category').notNull(),
	tags: text('tags'),
	readTime: integer('read_time').default(5),
	coverGradient: text('cover_gradient'),
	isPublished: integer('is_published').default(1),
	sortOrder: integer('sort_order').default(0),
	publishedAt: text('published_at').default(sql`CURRENT_TIMESTAMP`)
});

// ─── PARTNERS & CERTIFICATIONS ───────────────────────────────────────────────
export const partners = sqliteTable('partners', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	logoSvg: text('logo_svg'),
	partnerType: text('partner_type').notNull(),
	tier: text('tier'),
	description: text('description'),
	url: text('url'),
	sortOrder: integer('sort_order').default(0),
	isActive: integer('is_active').default(1)
});

// ─── CAREERS ──────────────────────────────────────────────────────────────────
export const careers = sqliteTable('careers', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	department: text('department').notNull(),
	location: text('location').notNull(),
	type: text('type').notNull(),
	experience: text('experience'),
	description: text('description').notNull(),
	requirements: text('requirements'),
	niceToHave: text('nice_to_have'),
	benefits: text('benefits'),
	isActive: integer('is_active').default(1),
	publishedAt: text('published_at').default(sql`CURRENT_TIMESTAMP`)
});

// ─── RESOURCES (DOWNLOADS) ────────────────────────────────────────────────────
export const resources = sqliteTable('resources', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	type: text('type').notNull(),
	description: text('description').notNull(),
	industry: text('industry'),
	pages: integer('pages'),
	gated: integer('gated').default(1),
	downloadUrl: text('download_url'),
	coverGradient: text('cover_gradient'),
	sortOrder: integer('sort_order').default(0),
	isPublished: integer('is_published').default(1),
	publishedAt: text('published_at').default(sql`CURRENT_TIMESTAMP`)
});

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export const testimonials = sqliteTable('testimonials', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	quote: text('quote').notNull(),
	authorName: text('author_name').notNull(),
	authorTitle: text('author_title').notNull(),
	authorCompany: text('author_company').notNull(),
	industry: text('industry'),
	serviceSlug: text('service_slug'),
	rating: integer('rating').default(5),
	sortOrder: integer('sort_order').default(0),
	isActive: integer('is_active').default(1)
});

// ─── CLIENT LOGOS ─────────────────────────────────────────────────────────────
export const clientLogos = sqliteTable('client_logos', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	logoSvg: text('logo_svg'),
	logoAlt: text('logo_alt'),
	website: text('website'),
	industry: text('industry'),
	sortOrder: integer('sort_order').default(0),
	isActive: integer('is_active').default(1)
});

// ─── TEAM MEMBERS ────────────────────────────────────────────────────────────
export const teamMembers = sqliteTable('team_members', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	role: text('role').notNull(),
	bio: text('bio'),
	photoUrl: text('photo_url'),
	linkedinUrl: text('linkedin_url'),
	sortOrder: integer('sort_order').default(0)
});

// ─── ADMIN SESSIONS ──────────────────────────────────────────────────────────
export const adminSessions = sqliteTable('admin_sessions', {
	id: text('id').primaryKey(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	expiresAt: text('expires_at').notNull()
});
