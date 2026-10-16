<script>
  export let href = '#main-content';
</script>

<a {href} class="skip-link visually-hidden visually-hidden--focusable">
  Skip to main content
</a>

<style>
  .skip-link {
    position: fixed;
    top: var(--space-s);
    left: var(--space-s);
    z-index: 1000;
    background: var(--color-gold);
    color: var(--color-ink);
    padding: var(--space-xs) var(--space-s);
    font-weight: var(--font-weight-bold);
    text-decoration: none;
  }
</style>
