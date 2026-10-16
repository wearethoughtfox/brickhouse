import { site } from '$lib/content/site.js';
import { services } from '$lib/content/services.js';
import { work } from '$lib/content/work.js';

export const prerender = true;

export function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: '/', lastmod: today, priority: '1.0' },
    ...services.map((s) => ({ loc: `/services/${s.slug}`, lastmod: today, priority: '0.9' })),
    { loc: '/work', lastmod: today, priority: '0.8' },
    ...work.map((w) => ({ loc: `/work/${w.slug}`, lastmod: w.date.toISOString().slice(0, 10), priority: '0.6' }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${site.url}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
