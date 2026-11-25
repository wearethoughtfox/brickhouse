// `npm run tokens`. The toolkit's generator cannot take options from the
// command line, and its clampPrecision default would rewrite this site's
// fluid values, so the options come from tokens.config.js instead.
import { generateTokens } from '@thoughtfox/toolkit/tokens/generate-tokens.js';
import { tokenOptions } from '../tokens.config.js';

generateTokens(tokenOptions);
