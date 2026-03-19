import type { RequestHandler } from '@sveltejs/kit';

const BASE_URL = 'https://asiateknologi.com';

interface SitemapEntry {
	url: string;
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
}

const staticPages: SitemapEntry[] = [
	// Core pages — high priority, weekly change
	{ url: '/', changefreq: 'weekly', priority: 1.0 },
	{ url: '/services', changefreq: 'weekly', priority: 0.9 },
	{ url: '/solutions', changefreq: 'weekly', priority: 0.9 },
	{ url: '/case-studies', changefreq: 'weekly', priority: 0.8 },
	{ url: '/insights', changefreq: 'weekly', priority: 0.8 },
	{ url: '/partners', changefreq: 'monthly', priority: 0.7 },
	{ url: '/careers', changefreq: 'weekly', priority: 0.7 },
	{ url: '/resources', changefreq: 'weekly', priority: 0.7 },
	{ url: '/about', changefreq: 'monthly', priority: 0.7 },
	{ url: '/contact', changefreq: 'monthly', priority: 0.8 },

	// Industry solution pages
	{ url: '/solutions/mining', changefreq: 'monthly', priority: 0.6 },
	{ url: '/solutions/financial-services', changefreq: 'monthly', priority: 0.6 },
	{ url: '/solutions/healthcare', changefreq: 'monthly', priority: 0.6 },
	{ url: '/solutions/manufacturing', changefreq: 'monthly', priority: 0.6 },
	{ url: '/solutions/smart-city', changefreq: 'monthly', priority: 0.6 },
	{ url: '/solutions/energy', changefreq: 'monthly', priority: 0.6 },
	{ url: '/solutions/logistics', changefreq: 'monthly', priority: 0.6 },
	{ url: '/solutions/telecommunications', changefreq: 'monthly', priority: 0.6 }
];

function buildSitemap(entries: SitemapEntry[]): string {
	const today = new Date().toISOString().split('T')[0];

	const urlElements = entries
		.map(({ url, lastmod, changefreq, priority }) => {
			const loc = `${BASE_URL}${url}`;
			const lastmodTag = `\t\t<lastmod>${lastmod ?? today}</lastmod>`;
			const changefreqTag = changefreq ? `\t\t<changefreq>${changefreq}</changefreq>` : '';
			const priorityTag = priority !== undefined ? `\t\t<priority>${priority.toFixed(1)}</priority>` : '';

			return [
				'\t<url>',
				`\t\t<loc>${loc}</loc>`,
				lastmodTag,
				changefreqTag,
				priorityTag,
				'\t</url>'
			]
				.filter(Boolean)
				.join('\n');
		})
		.join('\n');

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		urlElements,
		'</urlset>'
	].join('\n');
}

export const GET: RequestHandler = () => {
	const body = buildSitemap(staticPages);

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
