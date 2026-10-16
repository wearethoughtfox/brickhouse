<script>
  import Seo from '$lib/components/blocks/Seo.svelte';
  import Prose from '$lib/components/blocks/Prose.svelte';
  import Button from '$lib/components/blocks/Button.svelte';
  import Marks from '$lib/components/blocks/Marks.svelte';
  import { site } from '$lib/content/site.js';
  import { services } from '$lib/content/services.js';

  export let data;
  $: ({ service } = data);
</script>

<Seo
  title={service.title}
  description={service.excerpt}
  image={service.image}
  jsonLd={{
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.excerpt,
    image: `${site.url}${service.image}`,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: site.areaServed
  }}
/>

<!-- Grey title band, as on the Jekyll service pages -->
<header class="banner">
  <div class="wrapper banner__inner">
    <div>
      <p class="eyebrow"><a href="/#service">Services</a></p>
      <h1>{service.title}</h1>
      <p class="banner__lede">{service.excerpt}</p>
    </div>
    {#if service.image}
      <div class="banner__image">
        <Marks h="bottom" v="right">
          <img src={service.image} alt="" />
        </Marks>
      </div>
    {/if}
  </div>
</header>

<div class="wrapper service">
  <div class="service__body">
    <Prose html={service.html} />
  </div>

  <aside class="service__aside" aria-label="More services">
    <h2 class="eyebrow">Services</h2>
    <ul role="list" class="aside-nav">
      {#each services as s}
        <li>
          <a href="/services/{s.slug}" aria-current={s.slug === service.slug ? 'page' : undefined}>
            {s.title}
          </a>
        </li>
      {/each}
    </ul>
    <div class="aside-cta">
      <Button href="#contact">Get in touch</Button>
    </div>
  </aside>
</div>

<style>
  .banner {
    background: var(--color-grey);
    color: var(--color-white);
    padding-block: var(--space-2xl);
  }

  .banner__inner {
    display: grid;
    gap: var(--space-l);
    align-items: end;
  }

  .banner .eyebrow a {
    color: var(--color-white);
    text-decoration-color: var(--color-gold);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.3em;
  }

  .banner h1 {
    margin-block-start: var(--space-s);
    color: var(--color-white);
    max-width: 16ch;
  }

  .banner__lede {
    font-weight: 300;
    margin-block-start: var(--space-s);
    font-size: var(--size-step-2);
    line-height: 1.4;
    max-width: 36ch;
  }

  .banner__image {
    width: fit-content;
    max-width: min(100%, 22rem);
  }

  .banner__image img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
    border: 6px solid var(--color-white);
  }

  .service {
    display: grid;
    gap: var(--space-2xl);
    padding-block: var(--space-3xl) var(--space-3xl);
  }

  .aside-nav {
    margin-block: var(--space-s) var(--space-l);
    border-block-start: 1px solid var(--color-rule);
  }

  .aside-nav a {
    display: block;
    padding: var(--space-xs) 0 var(--space-xs) var(--space-s);
    border-block-end: 1px solid var(--color-rule);
    border-inline-start: 3px solid transparent;
    color: var(--color-ink);
    text-decoration: none;
  }

  .aside-nav a:hover,
  .aside-nav a[aria-current='page'] {
    border-inline-start-color: var(--color-gold);
  }

  .aside-nav a[aria-current='page'] {
    font-weight: var(--font-weight-bold);
  }

  @media (min-width: 48em) {
    .banner__inner {
      grid-template-columns: 1fr auto;
    }

    /* The image hangs below the grey band into the page */
    .banner__image {
      margin-block-end: calc(var(--space-2xl) * -2);
    }
  }

  @media (min-width: 60em) {
    .service {
      grid-template-columns: minmax(0, 1fr) 17rem;
      gap: var(--space-3xl);
    }

    .service__aside {
      position: sticky;
      top: var(--space-l);
      align-self: start;
    }
  }
</style>
