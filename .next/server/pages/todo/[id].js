const CHUNK_PUBLIC_PATH = "server/pages/todo/[id].js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_362ff4._.js");
runtime.loadChunk("server/chunks/ssr/src_93fae2._.js");
runtime.loadChunk("server/chunks/ssr/src_5c4ee2._.css");
runtime.loadChunk("server/chunks/ssr/src_modules_Map_MapImage_tsx_eae9e8._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/todo/[id].tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/src/pages/_document.tsx [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
