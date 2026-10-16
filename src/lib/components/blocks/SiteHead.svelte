<script>
  import Nav from './Nav.svelte';
  import Logo from './Logo.svelte';
  import { site } from '$lib/content/site.js';
</script>

<header class="site-head" id="top">
  <div class="wrapper site-head__inner">
    <a href="/" class="brand">
      <Logo size={34} />
      <span class="brand__name">{site.shortName}</span>
    </a>
    <Nav label="Main" links={site.nav} />
  </div>
</header>

<style>
  .site-head__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xs) var(--space-m);
    padding-block: var(--space-s);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--color-ink);
    text-decoration: none;
  }

  .brand__name {
    font-family: var(--font-display);
    font-size: var(--size-step-2);
    letter-spacing: -0.01em;
  }
</style>
