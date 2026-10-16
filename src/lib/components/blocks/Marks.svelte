<script>
  /** @type {'top'|'bottom'|'none'} Where the horizontal line crosses the image */
  export let h = 'bottom';
  /** @type {'left'|'right'|'none'} Which side the vertical line runs down */
  export let v = 'right';
</script>

<!--
  Corner marks: thin gold lines that run past the edges of an image, like a
  frame-maker's measuring marks. Purely decorative.
-->
<div class="marks" data-h={h} data-v={v}>
  <slot />
</div>

<style>
  .marks {
    --mark-overhang: clamp(0.75rem, 3vw, 2.5rem);
    --mark-inset: clamp(1rem, 8%, 4rem);
    position: relative;
  }

  .marks::before,
  .marks::after {
    content: '';
    position: absolute;
    z-index: 1;
    background: var(--color-gold);
    pointer-events: none;
  }

  /* Horizontal line, overhanging both sides */
  .marks::before {
    height: 2px;
    left: calc(var(--mark-overhang) * -1);
    right: calc(var(--mark-overhang) * -1);
  }

  .marks[data-h='bottom']::before {
    bottom: var(--mark-inset);
  }

  .marks[data-h='top']::before {
    top: var(--mark-inset);
  }

  .marks[data-h='none']::before {
    display: none;
  }

  /* Vertical line, overhanging top and bottom */
  .marks::after {
    width: 2px;
    top: calc(var(--mark-overhang) * -1);
    bottom: calc(var(--mark-overhang) * -1);
  }

  .marks[data-v='right']::after {
    right: var(--mark-inset);
  }

  .marks[data-v='left']::after {
    left: var(--mark-inset);
  }

  .marks[data-v='none']::after {
    display: none;
  }
</style>
