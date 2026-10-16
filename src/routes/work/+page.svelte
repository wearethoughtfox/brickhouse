<script>
  import Seo from '$lib/components/blocks/Seo.svelte';
  import MediaCard from '$lib/components/blocks/MediaCard.svelte';
  import { workNewestFirst } from '$lib/content/work.js';
</script>

<Seo
  title="Work"
  description="Painting and frame conservation projects for museums, galleries, councils and private clients, from the Palace of Westminster to Watts Gallery."
/>

<section class="wrapper work-index" aria-labelledby="work-title">
  <header class="work-index__head">
    <h1 id="work-title">Our work</h1>
    <p>We work for a wide range of clients from charitable institutions to private individuals.</p>
  </header>
  <ul role="list" class="work-grid">
    {#each workNewestFirst as item}
      <li>
        <MediaCard
          href="/work/{item.slug}"
          title={item.title}
          image={item.image}
          excerpt={item.excerpt}
          headingLevel="h2"
        />
      </li>
    {/each}
  </ul>
</section>

<style>
  .work-index {
    padding-block: var(--space-xl) var(--space-3xl);
  }

  .work-index__head {
    display: grid;
    gap: var(--space-s);
    padding-block-end: var(--space-l);
    margin-block-end: var(--space-xl);
    border-block-end: 3px solid var(--color-gold);
  }

  .work-index__head p {
    font-size: var(--size-step-2);
    line-height: 1.4;
    max-width: 34ch;
  }

  .work-grid {
    display: grid;
    gap: var(--space-xl) var(--space-l);
  }

  /* Staggered columns: the middle column steps down */
  @media (min-width: 40em) {
    .work-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .work-grid > li:nth-child(even) {
      transform: translateY(var(--space-2xl));
    }

    .work-grid {
      padding-block-end: var(--space-2xl);
    }
  }

  @media (min-width: 64em) {
    .work-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .work-grid > li:nth-child(even) {
      transform: none;
    }

    .work-grid > li:nth-child(3n + 2) {
      transform: translateY(var(--space-3xl));
    }

    .work-grid {
      padding-block-end: var(--space-3xl);
    }
  }

  @media (min-width: 56em) {
    .work-index__head {
      grid-template-columns: 1fr 1fr;
      align-items: end;
    }
  }
</style>
