<script>
  import { page } from '$app/stores';
  import Seo from '$lib/components/blocks/Seo.svelte';
</script>

<Seo title={$page.status === 404 ? 'Page not found' : 'Something went wrong'} noindex />

<section class="message stack">
  <p class="eyebrow">Error {$page.status}</p>
  <h1>{$page.status === 404 ? 'Page not found' : 'Something went wrong'}</h1>
  <p class="message__lede">The page you were looking for could not be found.</p>
  <p>
    Try <a href="/#service">our services</a>, <a href="/work">our work</a> or
    <a href="/">the home page</a>.
  </p>
</section>

<style>
  .message {
    --stack-space: var(--space-s);
    max-width: 40rem;
    margin-inline: auto;
    padding: var(--space-3xl) var(--gutter);
    text-align: center;
  }

  .message :global(p) {
    margin-inline: auto;
  }

  .message__lede {
    font-size: var(--size-step-2);
  }
</style>
