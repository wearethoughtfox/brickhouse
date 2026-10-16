import { parseFrontMatter, renderMarkdown, resolveDate, filenameSlug, cleanSlug } from './parse.js';

const files = import.meta.glob('./work/*.md', { query: '?raw', import: 'default', eager: true });

/** Projects in collection order (oldest first), as Jekyll ordered them */
export const work = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontMatter(raw);
    const date = resolveDate(data, path);
    return {
      path,
      slug: data.slug ? cleanSlug(data.slug) : filenameSlug(path),
      title: data.title,
      date,
      year: date.getUTCFullYear(),
      excerpt: data.excerpt || '',
      image: data.image,
      legacyUrl: data.link,
      html: renderMarkdown(body)
    };
  })
  .sort((a, b) => a.date - b.date || a.path.localeCompare(b.path));

/** The /work page lists `site.work reversed` */
export const workNewestFirst = [...work].reverse();

export function getWork(slug) {
  const i = workNewestFirst.findIndex((w) => w.slug === slug);
  if (i === -1) return null;
  return {
    item: workNewestFirst[i],
    newer: workNewestFirst[i - 1] || null,
    older: workNewestFirst[i + 1] || null
  };
}
