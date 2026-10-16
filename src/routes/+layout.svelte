<script>
  import '../app.css';
  import { afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import SkipLink from '$lib/components/blocks/SkipLink.svelte';
  import SiteHead from '$lib/components/blocks/SiteHead.svelte';
  import SiteFoot from '$lib/components/blocks/SiteFoot.svelte';

  onMount(() => {
    afterNavigate(({ from, to }) => {
      // Leave the first load and in-page anchors (/#about, /#contact) to the browser
      if (!from || to?.url.hash) return;
      const heading = document.querySelector('main h1');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: false });
      }
    });
  });
</script>

<SkipLink />
<SiteHead />

<main id="main-content" tabindex="-1">
  <slot />
</main>

<SiteFoot />

<style>
  :global(body) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
  }

  main:focus {
    outline: none;
  }

  /* One gold rule down the left margin, through every section, on wide screens */
  @media (min-width: 64em) {
    main {
      position: relative;
    }

    main::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: max(
        calc(var(--gutter) / 2),
        calc((100% - var(--wrapper-max-width)) / 2 + var(--gutter) / 2)
      );
      z-index: 2;
      width: 2px;
      background: var(--color-gold);
      pointer-events: none;
    }
  }
</style>
