<script>
  import Seo from '$lib/components/blocks/Seo.svelte';
</script>

<Seo title="Thank you" noindex />

<section class="message stack">
  <p class="eyebrow">Message sent</p>
  <h1>Thank you</h1>
  <p class="message__lede">Your message has been sent. We’ll be in touch soon.</p>
  <p><a href="/">Back to the home page</a></p>
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
