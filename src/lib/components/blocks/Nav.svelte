<script>
  import { page } from '$app/stores';

  /** @type {string} Accessible label (required — every nav needs one) */
  export let label = 'Main';
  /** @type {{ href: string, label: string }[]} */
  export let links = [];

  $: path = $page.url.pathname;
  // Hash links point into the home page, so only real paths can be current
  const isCurrent = (href, path) =>
    !href.includes('#') && (path === href || path.startsWith(`${href}/`));
</script>

<nav aria-label={label}>
  <ul role="list" class="nav__list">
    {#each links as link}
      <li>
        <a
          href={link.href}
          class="nav__link"
          aria-current={isCurrent(link.href, path) ? 'page' : undefined}
        >
          {link.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .nav__list {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--space-m);
  }

  .nav__link {
    display: inline-block;
    padding-block: var(--space-xs);
    color: var(--color-logo-grey);
    font-size: var(--size-step-00);
    text-transform: uppercase;
    letter-spacing: var(--tracking);
    text-decoration: none;
    border-block-end: 3px solid transparent;
  }

  .nav__link:hover,
  .nav__link[aria-current='page'] {
    color: var(--color-ink);
    border-block-end-color: var(--color-gold);
  }
</style>
