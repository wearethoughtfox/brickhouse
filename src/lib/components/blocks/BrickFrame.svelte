<script>
  /** @type {boolean} Show the grey brick in the top-right corner, as in the logo */
  export let brick = true;
  /** @type {boolean} Gold border round the image. Off by default: the whole site already sits in the gold frame */
  export let framed = false;
</script>

<!--
  The logo's grey brick set into the top-right corner of a photograph,
  optionally with the logo's thick gold border round it.
-->
<div class="brick-frame" class:brick-frame--framed={framed}>
  <slot />
  {#if brick}<span class="brick-frame__brick" aria-hidden="true"></span>{/if}
</div>

<style>
  .brick-frame {
    position: relative;
    line-height: 0;
  }

  .brick-frame--framed {
    border: var(--frame-width) solid var(--color-gold);
  }

  .brick-frame :global(img) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .brick-frame__brick {
    position: absolute;
    top: var(--frame-width);
    right: var(--frame-width);
    width: clamp(2.5rem, 16%, 7rem);
    aspect-ratio: 1;
    background: var(--color-logo-grey);
  }
</style>
