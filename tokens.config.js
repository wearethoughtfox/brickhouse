/**
 * The site's token options, used by both vite.config.js and `npm run tokens`.
 *
 * clampPrecision: 4 is not cosmetic. The toolkit defaults to 2, which leaves
 * each fluid value slightly short of its stated min and max at the two
 * viewports; at 2 decimals, 22 of this site's --space-* and --size-step-*
 * values come out different. Keep both callers reading from here, so the
 * generator can never be run at the default by accident.
 */
export const tokenOptions = { clampPrecision: 4 };
