import { marked } from 'marked';
import { parse } from 'yaml';

marked.use({ gfm: true, breaks: false });

/** Decode the few HTML entities that appear in front matter strings */
export function decodeEntities(s) {
  if (typeof s !== 'string') return s;
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&nbsp;/g, ' ');
}

/**
 * Front matter is real YAML now: Sveltia CMS rewrites these files, so the
 * parser has to cope with anything its YAML output can produce.
 */
export function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };
  const parsed = parse(m[1]) ?? {};
  const data = {};
  for (const [key, value] of Object.entries(parsed)) {
    data[key] = Array.isArray(value) ? value.map(decodeEntities) : decodeEntities(value);
  }
  return { data, body: raw.slice(m[0].length) };
}

/** Render Markdown (with the odd bit of raw HTML) to an HTML string */
export function renderMarkdown(md) {
  const cleaned = md
    // Jekyll's {{ site.baseurl }} is always empty on this site
    .replace(/\{\{\s*site\.baseurl\s*\}\}/g, '')
    // kramdown inline attribute lists such as {:.strike} → plain class span is lost; apply as class on preceding link
    .replace(/\]\(([^)]+)\)\{:\.([a-z-]+)\}/g, '](<$1> "class:$2")')
    .replace(/\{:[^}]*\}/g, '');
  let html = marked.parse(cleaned);
  // Turn our class marker into a real class attribute
  html = html.replace(/<a href="([^"]+)" title="class:([a-z-]+)">/g, '<a href="$1" class="$2">');
  html = html.replace(/<img /g, '<img loading="lazy" decoding="async" ');
  return framePlates(html);
}

/** Date from front matter, falling back to the YYYY-MM-DD filename prefix */
export function resolveDate(data, filename) {
  if (data.date instanceof Date && !isNaN(data.date)) return data.date;
  if (data.date) {
    // Jekyll wrote "2012-02-06 16:12:08+00:00"; the CMS writes "2012-02-06T16:12:08"
    const d = new Date(String(data.date).trim().replace(' ', 'T'));
    if (!isNaN(d)) return d;
  }
  const m = filename.match(/(\d{4}-\d{2}-\d{2})/);
  return m ? new Date(m[1]) : new Date(0);
}

/** Slug from filename, minus the date prefix and extension */
export function filenameSlug(path) {
  const base = path.split('/').pop().replace(/\.(md|markdown)$/, '');
  return base.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

/** Last path segment, slugified the way Jekyll's :slug placeholder does it */
export function cleanSlug(s) {
  return String(s)
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .pop()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Paragraphs that only hold an image become mounted "plates": <figure class="plate">.
 * The image title (not the alt, which is often a filename) becomes the caption.
 * Runs of two or more plates are grouped in <div class="plates"> so before/after
 * pairs sit side by side.
 */
function framePlates(html) {
  const figure = (img) => {
    const title = img.match(/ title="([^"]*)"/);
    const clean = img.replace(/ title="[^"]*"/, '');
    const caption = title ? `<figcaption>${title[1]}</figcaption>` : '';
    return `<figure class="plate"><span class="mat">${clean}</span>${caption}</figure>`;
  };
  let out = html.replace(/<p>\s*((?:<img[^>]*>\s*)+)<\/p>/g, (_, imgs) =>
    imgs.match(/<img[^>]*>/g).map(figure).join('\n')
  );
  const one = '<figure class="plate">(?:(?!<\\/figure>)[\\s\\S])*<\\/figure>';
  out = out.replace(new RegExp(`(?:${one}\\s*){2,}`, 'g'), (run) => `<div class="plates">${run.trim()}</div>\n`);
  return out;
}
