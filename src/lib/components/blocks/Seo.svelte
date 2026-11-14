<script>
  // The head tags come from the toolkit. This keeps the site's own policy:
  // URLs have no trailing slash, and the home title carries the description.
  import Head from '@thoughtfox/toolkit/seo/Head.svelte';
  import { site } from '$lib/content/site.js';

  const titles = {
    document: (title) => (title ? `${title} | ${site.name}` : `${site.name} | ${site.description}`),
    social: (title) => title ?? site.name
  };

  /** title, description, image, type, jsonLd, noindex: see buildHead() in the toolkit */
  let props = $props();
</script>

<Head {site} {titles} trailingSlash="never" {...props} />
