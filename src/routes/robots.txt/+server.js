import { site } from '$lib/content/site.js';

export const prerender = true;

export function GET() {
  return new Response(`User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${site.url}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
