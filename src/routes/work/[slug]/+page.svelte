<script>
  import Seo from '$lib/components/blocks/Seo.svelte';
  import Prose from '$lib/components/blocks/Prose.svelte';
  import { site } from '$lib/content/site.js';

  export let data;
  $: ({ item, newer, older } = data);
</script>

<Seo
  title={item.title}
  description={item.excerpt}
  image={item.image}
  type="article"
  jsonLd={{
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    description: item.excerpt,
    image: `${site.url}${item.image}`,
    dateCreated: item.date.toISOString().slice(0, 10),
    creator: { '@id': `${site.url}/#organization` }
  }}
/>

<!-- Title | year | content, the Jekyll work layout -->
<article class="wrapper work-item">
  <header class="work-item__head">
    <p class="eyebrow"><a href="/work">Our work</a></p>
    <h1>{item.title}</h1>
    <p class="work-item__year">{item.year}</p>
  </header>

  <div class="work-item__body">
    {#if item.excerpt}
      <p class="work-item__excerpt">{item.excerpt}</p>
    {/if}
    <Prose html={item.html} />
  </div>
</article>

<nav class="wrapper pager" aria-label="More projects">
  <ul role="list">
    <li class="pager__prev">
      {#if newer}
        <a href="/work/{newer.slug}"><span class="eyebrow">Previous</span>{newer.title}</a>
      {/if}
    </li>
    <li class="pager__next">
      {#if older}
        <a href="/work/{older.slug}"><span class="eyebrow">Next</span>{older.title}</a>
      {/if}
    </li>
  </ul>
</nav>

<style>
  .work-item {
    display: grid;
    gap: var(--space-l) var(--space-3xl);
    padding-block: var(--space-xl) var(--space-2xl);
  }

  .work-item__head .eyebrow a {
    color: var(--color-logo-grey);
    text-decoration-color: var(--color-gold);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.3em;
  }

  .work-item__head h1 {
    margin-block-start: var(--space-s);
    font-size: var(--size-step-5);
  }

  .work-item__year {
    display: inline-block;
    margin-block-start: var(--space-s);
    padding-block-start: var(--space-2xs);
    border-block-start: 3px solid var(--color-gold);
    color: var(--color-logo-grey);
  }

  .work-item__excerpt {
    margin-block-end: var(--space-m);
    font-family: var(--font-display);
    font-size: var(--size-step-3);
    line-height: 1.3;
    color: var(--color-ink);
  }

  .pager {
    padding-block: var(--space-l) var(--space-3xl);
  }

  .pager ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-l);
    padding-block-start: var(--space-m);
    border-block-start: 1px solid var(--color-rule);
  }

  .pager a {
    display: grid;
    gap: var(--space-2xs);
    font-family: var(--font-display);
    font-size: var(--size-step-2);
    line-height: 1.2;
    color: var(--color-ink);
    text-decoration: none;
  }

  .pager a:hover {
    text-decoration: underline;
    text-decoration-color: var(--color-gold);
    text-decoration-thickness: 3px;
    text-underline-offset: 0.2em;
  }

  .pager .eyebrow {
    font-family: var(--font-base);
    color: var(--color-logo-grey);
  }

  .pager__next {
    text-align: end;
  }

  @media (min-width: 60em) {
    .work-item {
      grid-template-columns: 1fr 2fr;
    }

    .work-item__head {
      position: sticky;
      top: var(--space-l);
      align-self: start;
    }
  }
</style>
