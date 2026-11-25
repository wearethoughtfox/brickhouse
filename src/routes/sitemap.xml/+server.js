import { sitemapXml } from '@thoughtfox/toolkit/seo';
import { site } from '$lib/content/site.js';
import { services } from '$lib/content/services.js';
import { work } from '$lib/content/work.js';

export const prerender = true;

// lastmod only where the page has a real date (a project); the rest say nothing.
export function GET() {
  const entries = [
    { path: '/', priority: 1 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.9 })),
    { path: '/work', priority: 0.8 },
    ...work.map((w) => ({ path: `/work/${w.slug}`, lastmod: w.date, priority: 0.6 }))
  ];

  return new Response(sitemapXml({ siteUrl: site.url, entries, trailingSlash: 'never' }), {
    headers: { 'Content-Type': 'application/xml' }
  });
}
