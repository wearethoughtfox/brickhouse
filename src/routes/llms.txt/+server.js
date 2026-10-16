import { site } from '$lib/content/site.js';
import { services } from '$lib/content/services.js';
import { workNewestFirst } from '$lib/content/work.js';

export const prerender = true;

export function GET() {
  const body = `# ${site.name}

> ${site.description}

${site.shortName} is a studio of MA qualified and ICON Accredited painting conservators. They protect, restore and care for paintings and frames for museums, galleries, councils and private clients, covering ${site.areaServed.join(', ')}. Clients have included ${site.clients.join(', ')}.

## Services
${services.map((s) => `- [${s.title}](${site.url}/services/${s.slug}): ${s.excerpt}`).join('\n')}

## Work
${workNewestFirst.map((w) => `- [${w.title}](${site.url}/work/${w.slug}): ${w.excerpt} (${w.year})`).join('\n')}

## Team
${site.conservators.map((c) => `- ${c}`).join('\n')}

## Contact
- Email: ${site.email}
- Contact form: ${site.url}/#contact
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
