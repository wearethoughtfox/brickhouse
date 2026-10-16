<script>
  /** @type {'button'|'submit'|'reset'} */
  export let type = 'button';
  /** @type {'gold'|'grey'} gold block (the old Send button) or grey block (the old See our work button) */
  export let variant = 'gold';
  /** @type {string|undefined} Renders as an <a> when provided */
  export let href = undefined;
</script>

{#if href}
  <a {href} class="button" data-variant={variant} {...$$restProps}><slot /></a>
{:else}
  <button {type} class="button" data-variant={variant} {...$$restProps}><slot /></button>
{/if}

<style>
  /* Square blocks with the Jekyll site's 2px grey drop shadow */
  .button {
    display: inline-block;
    min-width: 12rem;
    padding: 0.8em 1.4em 0.75em;
    border: 0;
    border-radius: 0;
    box-shadow: 0 2px 0 var(--color-logo-grey);
    font: inherit;
    font-size: var(--size-step-1);
    line-height: 1;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
  }

  .button[data-variant='gold'] {
    background: var(--color-gold);
    color: var(--color-ink);
  }

  .button[data-variant='grey'] {
    background: var(--color-grey);
    color: var(--color-white);
  }

  .button:hover {
    background: var(--color-ink);
    color: var(--color-white);
  }

  .button:active {
    box-shadow: none;
    transform: translateY(2px);
  }

  @media (prefers-reduced-motion: no-preference) {
    .button {
      transition: background-color var(--transition-base), color var(--transition-base);
    }
  }
</style>
