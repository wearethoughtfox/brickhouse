<script>
  import { onMount } from 'svelte';
  import Button from './Button.svelte';
  import { site } from '$lib/content/site.js';

  let showTop = false;

  onMount(() => {
    const update = () => (showTop = window.scrollY > window.innerHeight);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  });
</script>

<!-- Same two halves as the Jekyll footer: the team on the left, the contact form on the right -->
<footer class="site-foot" id="contact">
  <div class="wrapper site-foot__grid">
    <section class="site-foot__team" aria-labelledby="team-title">
      <h2 id="team-title">Fine art conservators</h2>
      <ul role="list">
        {#each site.conservators as person}
          <li>{person}</li>
        {/each}
      </ul>
      <img
        class="site-foot__icon"
        src="/images/icon-logo.jpg"
        alt="Icon accredited member"
        width="564"
        height="203"
        loading="lazy"
      />
    </section>

    <section aria-labelledby="contact-title">
      <h2 id="contact-title" class="site-foot__cta">Get in touch</h2>
      <!-- Netlify Forms: picked up from the prerendered HTML at deploy -->
      <form
        class="contact-form"
        name="contact"
        method="POST"
        action="/thanks"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p class="visually-hidden">
          <label>Don’t fill this out if you're human: <input name="bot-field" tabindex="-1" /></label>
        </p>
        <div class="field">
          <label for="name">Name</label>
          <input id="name" name="name" type="text" autocomplete="name" required />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" autocomplete="email" required />
        </div>
        <div class="field field--wide">
          <label for="comment">Message</label>
          <textarea id="comment" name="comment" rows="5" required></textarea>
        </div>
        <div class="field--wide">
          <Button type="submit">Send</Button>
        </div>
      </form>
    </section>
  </div>

  <div class="wrapper site-foot__base">
    <p>© {new Date().getFullYear()} {site.name}</p>
    <p><a href="mailto:{site.email}">{site.email}</a></p>
  </div>

  <a href="#top" class="back-to-top" class:is-shown={showTop} aria-label="Back to top">
    <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
      <path d="m9 19 7-7 7 7" fill="none" stroke="currentColor" stroke-width="2.5" />
    </svg>
  </a>
</footer>

<style>
  .site-foot {
    background: var(--color-ink);
    color: var(--color-white);
    padding-block-start: var(--space-3xl);
  }

  .site-foot__grid {
    display: grid;
    gap: var(--space-2xl) var(--space-3xl);
    padding-block-end: var(--space-2xl);
  }

  .site-foot h2 {
    color: var(--color-white);
    font-size: var(--size-step-3);
    margin-block-end: var(--space-s);
  }

  .site-foot__cta {
    font-size: var(--size-step-5) !important;
  }

  .site-foot__team ul {
    display: grid;
    gap: var(--space-2xs);
  }

  .site-foot__team li {
    padding-inline-start: var(--space-s);
    border-inline-start: 3px solid var(--color-gold);
  }

  .site-foot__icon {
    width: 8rem;
    height: auto;
    margin-block-start: var(--space-l);
    padding: var(--space-xs);
    background: var(--color-white);
  }

  .contact-form {
    display: grid;
    gap: var(--space-s);
  }

  .field label {
    display: block;
    margin-block-end: var(--space-2xs);
    font-weight: var(--font-weight-bold);
  }

  .field input,
  .field textarea {
    display: block;
    width: 100%;
    padding: 0.6em 0.7em;
    font: inherit;
    color: var(--color-ink);
    background: var(--color-white);
    border: 2px solid var(--color-white);
    border-radius: 0;
    appearance: none;
  }

  .field textarea {
    resize: vertical;
    min-height: 8rem;
  }

  .field input:focus-visible,
  .field textarea:focus-visible {
    outline: none;
    border-color: var(--color-gold);
    box-shadow: 0 0 0 3px var(--color-gold);
  }

  .site-foot__base {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-xs) var(--space-l);
    padding-block: var(--space-m);
    border-block-start: 1px solid #333;
    font-size: var(--size-step-00);
    color: #bdbdbd;
  }

  .site-foot__base a {
    color: var(--color-white);
    text-decoration-color: var(--color-gold);
    text-underline-offset: 0.2em;
  }

  .back-to-top {
    position: fixed;
    inset-block-end: calc(var(--frame-width) + var(--space-s));
    inset-inline-end: calc(var(--frame-width) + var(--space-s));
    z-index: 60;
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    color: var(--color-ink);
    background: var(--color-white);
    border: 2px solid var(--color-ink);
    opacity: 0;
    pointer-events: none;
  }

  .back-to-top.is-shown,
  .back-to-top:focus-visible {
    opacity: 1;
    pointer-events: auto;
  }

  @media (min-width: 40em) {
    .contact-form {
      grid-template-columns: 1fr 1fr;
    }

    .field--wide {
      grid-column: 1 / -1;
    }
  }

  @media (min-width: 56em) {
    .site-foot__grid {
      grid-template-columns: 2fr 3fr;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .back-to-top {
      transition: opacity var(--transition-fade);
    }
  }
</style>
