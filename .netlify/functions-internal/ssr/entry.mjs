import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_h3vCnK1w.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/technologies/sync.astro.mjs');
const _page2 = () => import('./pages/api/technologies/_id_.astro.mjs');
const _page3 = () => import('./pages/api/technologies.astro.mjs');
const _page4 = () => import('./pages/demo.astro.mjs');
const _page5 = () => import('./pages/test.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/technologies/sync.ts", _page1],
    ["src/pages/api/technologies/[id].ts", _page2],
    ["src/pages/api/technologies/index.ts", _page3],
    ["src/pages/demo.astro", _page4],
    ["src/pages/test.astro", _page5],
    ["src/pages/index.astro", _page6]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
