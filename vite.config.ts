import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin';

export default defineConfig(({ mode }) => ({
	plugins: mode === 'development' ? [nodeLoaderPlugin(), tailwindcss(), sveltekit()] : [tailwindcss(), sveltekit()]
}));
