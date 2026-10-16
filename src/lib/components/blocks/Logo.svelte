<script>
  /** @type {number} Rendered size in px */
  export let size = 32;
  /** @type {string} Accessible name; empty makes it decorative */
  export let label = '';
</script>

<!-- The Brick House mark: a thick gold square with a grey "brick" in the top-right corner -->
<svg
  viewBox="0 0 678 678"
  width={size}
  height={size}
  role={label ? 'img' : undefined}
  aria-label={label || undefined}
  aria-hidden={label ? undefined : 'true'}
>
  <rect x="22" y="22" width="634" height="634" fill="#fff" stroke="#FFC843" stroke-width="44" />
  <rect x="357" y="84" width="240" height="240" fill="#6C6C6C" />
</svg>
