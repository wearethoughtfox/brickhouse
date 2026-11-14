import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { tokensPlugin } from '@thoughtfox/toolkit/tokens/vite-plugin.js';
import { tokenOptions } from './tokens.config.js';

export default defineConfig({
  plugins: [tokensPlugin(tokenOptions), sveltekit()]
});
