import { llmsTxt } from '@thoughtfox/toolkit/seo';
import { site } from '$lib/content/site.js';
import { services } from '$lib/content/services.js';
import { workNewestFirst } from '$lib/content/work.js';

export const prerender = true;

export function GET() {
  const body = llmsTxt({
    siteUrl: site.url,
    name: site.name,
    summary: site.description,
    intro: `${site.shortName} is a studio of MA qualified and ICON Accredited painting conservators. They protect, restore and care for paintings and frames for museums, galleries, councils and private clients, covering ${site.areaServed.join(', ')}. Clients have included ${site.clients.join(', ')}.`,
    sections: [
      {
        title: 'Services',
        items: services.map((s) => ({ title: s.title, path: `/services/${s.slug}`, description: s.excerpt }))
      },
      {
        title: 'Work',
        items: workNewestFirst.map((w) => ({
          title: w.title,
          path: `/work/${w.slug}`,
          description: `${w.excerpt} (${w.year})`
        }))
      },
      { title: 'Team', items: site.conservators.map((c) => ({ text: c })) },
      {
        title: 'Contact',
        items: [{ text: `Email: ${site.email}` }, { text: `Contact form: ${site.url}/#contact` }]
      }
    ]
  });
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
