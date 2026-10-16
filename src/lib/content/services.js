import { parseFrontMatter, renderMarkdown, resolveDate, filenameSlug, cleanSlug } from './parse.js';

const files = import.meta.glob('./services/*.md', { query: '?raw', import: 'default', eager: true });

/** Services in Jekyll's collection order: by date, then filename */
export const services = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontMatter(raw);
    return {
      path,
      slug: data.slug ? cleanSlug(data.slug) : filenameSlug(path),
      title: data.title,
      date: resolveDate(data, path),
      excerpt: data.excerpt || '',
      image: data.image,
      legacyUrl: data.link,
      html: renderMarkdown(body)
    };
  })
  .sort((a, b) => a.date - b.date || a.path.localeCompare(b.path));

export function getService(slug) {
  return services.find((s) => s.slug === slug) || null;
}
