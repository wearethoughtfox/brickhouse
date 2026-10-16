<script>
  /** @type {string} Rendered Markdown */
  export let html = '';
</script>

<div class="prose flow">
  {@html html}
</div>

<style>
  .prose {
    --flow-space: var(--space-s);
    font-size: var(--size-step-1);
    line-height: 1.65;
  }

  .prose :global(:is(p, ul, ol)) {
    max-width: var(--measure);
  }

  .prose :global(h2) {
    --flow-space: var(--space-xl);
    font-size: var(--size-step-4);
  }

  .prose :global(h2 + *) {
    --flow-space: var(--space-xs);
  }

  .prose :global(ul) {
    padding-inline-start: 1.2em;
    list-style: square;
  }

  .prose :global(li + li) {
    margin-block-start: var(--space-2xs);
  }

  .prose :global(li::marker) {
    color: var(--color-logo-grey);
  }

  .prose :global(a) {
    color: var(--color-ink);
    text-decoration-color: var(--color-gold);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.2em;
  }

  .prose :global(a:hover) {
    color: var(--color-gold-deep);
  }

  /* Plates: images mounted at their natural size (most are under 460px wide) */
  .prose :global(:is(.plate, .plates)) {
    --flow-space: var(--space-l);
    margin-block-end: var(--space-s);
  }

  .prose :global(.plate) {
    margin: 0;
    margin-block-start: var(--flow-space);
  }

  .prose :global(.plate .mat) {
    display: inline-block;
    max-width: 100%;
  }

  .prose :global(.plate img) {
    width: auto;
    max-width: 100%;
    max-height: 70vh;
  }

  .prose :global(.plate figcaption) {
    margin-block-start: var(--space-xs);
    font-size: var(--size-step-00);
    color: var(--color-logo-grey);
  }

  .prose :global(.plates) {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: var(--space-m);
  }

  .prose :global(.plates .plate) {
    margin-block-start: 0;
    flex: 0 1 auto;
    max-width: 100%;
  }
</style>
