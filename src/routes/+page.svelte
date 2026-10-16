<script>
  import Seo from '$lib/components/blocks/Seo.svelte';
  import Button from '$lib/components/blocks/Button.svelte';
  import BrickFrame from '$lib/components/blocks/BrickFrame.svelte';
  import Marks from '$lib/components/blocks/Marks.svelte';
  import MediaCard from '$lib/components/blocks/MediaCard.svelte';
  import { site, organizationSchema } from '$lib/content/site.js';
  import { services } from '$lib/content/services.js';
  import { workNewestFirst } from '$lib/content/work.js';

  const featured = workNewestFirst.slice(0, 3);
</script>

<Seo jsonLd={organizationSchema()} />

<!-- Hero: photograph left, name right, as on the Jekyll site -->
<section class="wrapper hero">
  <div class="hero__image">
    <Marks h="bottom" v="left">
    <BrickFrame>
      <img
        src="/images/hand-1600.webp"
        srcset="/images/hand-900.webp 900w, /images/hand-1600.webp 1600w"
        sizes="(min-width: 48em) 55vw, 100vw"
        alt="A conservator's hand cleaning the surface of an oil painting with a cotton swab"
        width="1600"
        height="1067"
        fetchpriority="high"
      />
    </BrickFrame>
    </Marks>
  </div>
  <div class="hero__text">
    <h1>The Brick House</h1>
    <p class="hero__tagline">{site.tagline}</p>
    <div class="hero__actions">
      <Button href="#contact">Get in touch</Button>
      <Button href="/work" variant="grey">See our work</Button>
    </div>
  </div>
</section>

<!-- What we do + services: one grey band, as on the Jekyll site -->
<section class="band" id="about" aria-labelledby="about-title">
  <div class="wrapper about">
    <div class="about__text">
      <p class="eyebrow">What we do</p>
      <h2 id="about-title">{site.about.heading}</h2>
      <p class="about__lede">{site.about.text}</p>
    </div>
    <figure class="about__image">
      <Marks h="top" v="right">
      <img
        src="/images/on-site-1400.webp"
        srcset="/images/on-site-800.webp 800w, /images/on-site-1400.webp 1400w"
        sizes="(min-width: 56em) 40vw, 100vw"
        alt="A Brick House conservator repairing a painting laid flat on a table in a historic gallery"
        width="1400"
        height="933"
        loading="lazy"
      />
      </Marks>
    </figure>
  </div>

  <div class="wrapper" id="service">
    <h2 class="visually-hidden">Services</h2>
    <ul role="list" class="services">
      {#each services as service}
        <li>
          <MediaCard
            href="/services/{service.slug}"
            title={service.title}
            image={service.image}
            excerpt={service.excerpt}
            tone="grey"
          />
        </li>
      {/each}
    </ul>
  </div>
</section>

<!-- Our work -->
<section class="wrapper work" id="work" aria-labelledby="work-title">
  <div class="work__intro">
    <p class="eyebrow">Our work</p>
    <h2 id="work-title">{site.clientsHeading}</h2>
  </div>

  <ul role="list" class="clients">
    {#each site.clients as client}
      <li>{client}</li>
    {/each}
  </ul>

  <ul role="list" class="work__grid">
    {#each featured as item}
      <li>
        <MediaCard href="/work/{item.slug}" title={item.title} image={item.image} excerpt={item.excerpt} />
      </li>
    {/each}
  </ul>

  <div class="work__more">
    <Button href="/work" variant="grey">See our work</Button>
  </div>
</section>

<style>
  /* ── Hero ── */
  .hero {
    display: grid;
    gap: var(--space-l);
    padding-block: var(--space-s) var(--space-2xl);
  }

  .hero__image :global(img) {
    aspect-ratio: 3 / 2;
  }

  .hero h1 {
    font-size: var(--size-step-7);
    line-height: 0.95;
    letter-spacing: -0.03em;
  }

  .hero__tagline {
    margin-block-start: var(--space-s);
    font-size: var(--size-step-3);
    line-height: 1.3;
    max-width: 20em;
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-s);
    margin-block-start: var(--space-l);
  }

  @media (min-width: 48em) {
    .hero {
      grid-template-columns: 7fr 5fr;
      align-items: center;
      gap: var(--space-2xl);
      min-height: calc(100vh - 6rem);
      padding-block: var(--space-m) var(--space-3xl);
    }

    .hero__image :global(img) {
      aspect-ratio: 4 / 3;
    }
  }

  /* ── Grey band ── */
  .band {
    background: var(--color-grey);
    color: var(--color-white);
    padding-block: var(--space-3xl);
  }

  .band .eyebrow,
  .band h2 {
    color: var(--color-white);
  }

  .about {
    display: grid;
    gap: var(--space-xl) var(--space-3xl);
    align-items: start;
    padding-block-end: var(--space-3xl);
  }

  .about h2 {
    margin-block-start: var(--space-s);
    max-width: 16ch;
  }

  .about__lede {
    margin-block-start: var(--space-m);
    font-size: var(--size-step-2);
    line-height: 1.45;
  }

  .about__image {
    margin: 0;
  }

  .about__image img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }

  .services {
    display: grid;
    gap: var(--space-xl) var(--space-l);
    padding-block-start: var(--space-xl);
    border-block-start: 1px solid rgb(255 255 255 / 0.25);
  }

  /* Staggered: every other card steps down */
  @media (min-width: 36em) {
    .services {
      grid-template-columns: repeat(2, 1fr);
    }

    .services > li:nth-child(even) {
      margin-block-start: var(--space-4xl);
    }
  }

  @media (min-width: 64em) {
    .services {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 56em) {
    .about {
      grid-template-columns: 1fr 1fr;
    }

    /* Image sits lower than the text, overlapping into the services row */
    .about__image {
      margin-block: var(--space-3xl) calc(var(--space-2xl) * -1);
      position: relative;
      z-index: 1;
    }
  }

  /* ── Our work ── */
  .work {
    padding-block: var(--space-3xl);
  }

  .work__intro h2 {
    margin-block-start: var(--space-s);
    max-width: 22ch;
  }

  .clients {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(11rem, 100%), 1fr));
    gap: var(--space-m) var(--space-l);
    margin-block: var(--space-2xl);
    font-size: var(--size-step-1);
    line-height: 1.35;
    color: var(--color-ink);
  }

  .clients li {
    padding-block-start: var(--space-xs);
    border-block-start: 3px solid var(--color-gold);
  }

  .work__grid {
    display: grid;
    gap: var(--space-xl) var(--space-l);
  }

  @media (min-width: 48em) {
    .work__grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .work__grid > li:nth-child(2) {
      margin-block-start: var(--space-3xl);
    }
  }

  .work__more {
    margin-block-start: var(--space-2xl);
  }

  @media (min-width: 64em) {
    .work__intro,
    .clients,
    .work__grid,
    .work__more {
      margin-inline-start: 20%;
    }
  }
</style>
