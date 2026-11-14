<script>
  // The head tags come from the toolkit. This keeps the site's own policy:
  // URLs have no trailing slash, and the home title carries the description.
  import Head from '@thoughtfox/toolkit/seo/Head.svelte';
  import { site } from '$lib/content/site.js';

  /**
   * Search engines may only index Netlify production builds. Branch deploys,
   * deploy previews and local builds get noindex. INDEXABLE=true forces it on.
   * robots.txt still says Allow: / on purpose — a crawler has to fetch the
   * page to see the noindex, so blocking it there would do the opposite.
   */
  const indexable = __INDEXABLE__;

  const titles = {
    document: (title) => (title ? `${title} | ${site.name}` : `${site.name} | ${site.description}`),
    social: (title) => title ?? site.name
  };

  /** title, description, image, type, jsonLd, noindex: see buildHead() in the toolkit */
  let props = $props();
</script>

<Head {site} {titles} {indexable} trailingSlash="never" {...props} />
