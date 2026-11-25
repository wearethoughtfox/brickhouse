import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { tokensPlugin } from '@thoughtfox/toolkit/tokens/vite-plugin.js';
import { tokenOptions } from './tokens.config.js';

// Netlify sets CONTEXT to 'production', 'deploy-preview' or 'branch-deploy'.
// Only the production build may be indexed; everything else gets noindex.
const indexable = process.env.CONTEXT === 'production' || process.env.INDEXABLE === 'true';

export default defineConfig({
  define: {
    __INDEXABLE__: JSON.stringify(indexable)
  },
  plugins: [tokensPlugin(tokenOptions), sveltekit()]
});
