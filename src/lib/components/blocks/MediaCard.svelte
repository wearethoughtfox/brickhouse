<script>
  import { reveal } from '$lib/actions/reveal.js';

  /** @type {string} */
  export let href;
  /** @type {string} */
  export let title;
  /** @type {string|undefined} */
  export let image = undefined;
  /** @type {string} Optional summary under the title */
  export let excerpt = '';
  /** @type {'white'|'grey'} The background the card sits on */
  export let tone = 'white';
  /** @type {'h2'|'h3'} */
  export let headingLevel = 'h3';

  let shown = false;
</script>

<!-- Title style is the Jekyll card's: sans, uppercase, tracked -->
<article
  class="card reveal"
  data-tone={tone}
  class:is-revealed={shown}
  use:reveal
  on:reveal={() => (shown = true)}
>
  {#if image}
    <div class="frame card__image">
      <img src={image} alt="" loading="lazy" decoding="async" />
    </div>
  {/if}
  <svelte:element this={headingLevel} class="card__title">
    <a {href} class="card__link">{title}</a>
  </svelte:element>
  {#if excerpt}
    <p class="card__excerpt">{excerpt}</p>
  {/if}
</article>

<style>
  .card {
    --frame-ratio: 3 / 2;
    position: relative;
  }

  .card__image {
    background: var(--color-rule);
    margin-block-end: var(--space-s);
  }

  .card__title {
    font-family: var(--font-base);
    font-size: var(--size-step-1);
    font-weight: var(--font-weight-regular);
    text-transform: uppercase;
    letter-spacing: var(--tracking);
    line-height: 1.25;
    color: var(--color-ink);
  }

  .card__link {
    color: inherit;
    text-decoration: none;
    background-image: linear-gradient(var(--color-gold), var(--color-gold));
    background-size: 0 3px;
    background-position: 0 100%;
    background-repeat: no-repeat;
  }

  /* Whole card clickable */
  .card__link::after {
    content: '';
    position: absolute;
    inset: 0;
  }

  .card:hover .card__link,
  .card__link:focus-visible {
    background-size: 100% 3px;
  }

  .card__excerpt {
    margin-block-start: var(--space-xs);
    line-height: var(--leading-standard);
  }

  .card[data-tone='grey'] .card__title {
    color: var(--color-gold);
  }

  .card[data-tone='grey'] .card__excerpt {
    color: var(--color-white);
  }

  @media (prefers-reduced-motion: no-preference) {
    .card__link {
      transition: background-size var(--transition-base);
    }

    .card__image img {
      transition: opacity var(--transition-base);
    }

    .card:hover .card__image img {
      opacity: 0.85;
    }
  }
</style>
