import type Database from 'better-sqlite3';

export function migrate(sqlite: Database.Database) {
	// Core tables
	sqlite.exec(`
		CREATE TABLE IF NOT EXISTS contacts (
			id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL,
			company TEXT, phone TEXT, service_interest TEXT, budget TEXT, timeline TEXT,
			message TEXT NOT NULL, is_read INTEGER DEFAULT 0,
			created_at TEXT DEFAULT CURRENT_TIMESTAMP
		);
		CREATE TABLE IF NOT EXISTS services (
			id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
			description TEXT NOT NULL, long_description TEXT, icon TEXT, features TEXT,
			tech_stack TEXT, engagement_models TEXT, category TEXT,
			sort_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1
		);
		CREATE TABLE IF NOT EXISTS industries (
			id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
			description TEXT NOT NULL, long_description TEXT, hero_image TEXT,
			solutions TEXT, metrics TEXT, sort_order INTEGER DEFAULT 0
		);
		CREATE TABLE IF NOT EXISTS case_studies (
			id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
			client TEXT NOT NULL, client_logo TEXT, industry TEXT NOT NULL,
			industry_slug TEXT, service_slug TEXT,
			challenge TEXT NOT NULL, solution TEXT NOT NULL, results TEXT NOT NULL,
			metrics TEXT, technologies TEXT,
			testimonial_quote TEXT, testimonial_author TEXT, testimonial_title TEXT,
			cover_gradient TEXT, featured INTEGER DEFAULT 0, sort_order INTEGER DEFAULT 0,
			published_at TEXT DEFAULT CURRENT_TIMESTAMP
		);
		CREATE TABLE IF NOT EXISTS insights (
			id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
			excerpt TEXT NOT NULL, content TEXT NOT NULL, author TEXT NOT NULL, author_role TEXT,
			category TEXT NOT NULL, tags TEXT, read_time INTEGER DEFAULT 5, cover_gradient TEXT,
			is_published INTEGER DEFAULT 1, sort_order INTEGER DEFAULT 0,
			published_at TEXT DEFAULT CURRENT_TIMESTAMP
		);
		CREATE TABLE IF NOT EXISTS partners (
			id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, logo_svg TEXT,
			partner_type TEXT NOT NULL, tier TEXT, description TEXT, url TEXT,
			sort_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1
		);
		CREATE TABLE IF NOT EXISTS careers (
			id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
			department TEXT NOT NULL, location TEXT NOT NULL, type TEXT NOT NULL,
			experience TEXT, description TEXT NOT NULL, requirements TEXT,
			nice_to_have TEXT, benefits TEXT, is_active INTEGER DEFAULT 1,
			published_at TEXT DEFAULT CURRENT_TIMESTAMP
		);
		CREATE TABLE IF NOT EXISTS resources (
			id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
			type TEXT NOT NULL, description TEXT NOT NULL, industry TEXT, pages INTEGER,
			gated INTEGER DEFAULT 1, download_url TEXT, cover_gradient TEXT,
			sort_order INTEGER DEFAULT 0, is_published INTEGER DEFAULT 1,
			published_at TEXT DEFAULT CURRENT_TIMESTAMP
		);
		CREATE TABLE IF NOT EXISTS testimonials (
			id INTEGER PRIMARY KEY AUTOINCREMENT, quote TEXT NOT NULL,
			author_name TEXT NOT NULL, author_title TEXT NOT NULL, author_company TEXT NOT NULL,
			industry TEXT, service_slug TEXT, rating INTEGER DEFAULT 5,
			sort_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1
		);
		CREATE TABLE IF NOT EXISTS client_logos (
			id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, logo_svg TEXT,
			logo_alt TEXT, website TEXT, industry TEXT,
			sort_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1
		);
		CREATE TABLE IF NOT EXISTS team_members (
			id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, role TEXT NOT NULL,
			bio TEXT, photo_url TEXT, linkedin_url TEXT, sort_order INTEGER DEFAULT 0
		);
		CREATE TABLE IF NOT EXISTS devices (
			id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
			category TEXT NOT NULL, description TEXT, specs TEXT,
			buy_price TEXT, rent_price_monthly TEXT, rent_price_daily TEXT,
			availability TEXT, stock_quantity INTEGER DEFAULT 0, image TEXT,
			features TEXT, cover_gradient TEXT,
			sort_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1,
			created_at TEXT DEFAULT CURRENT_TIMESTAMP
		);
		CREATE TABLE IF NOT EXISTS admin_sessions (
			id TEXT PRIMARY KEY,
			created_at TEXT DEFAULT CURRENT_TIMESTAMP,
			expires_at TEXT NOT NULL
		);
	`);
}
