const CHUNK_PUBLIC_PATH = "server/pages/_document.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/_abb5d7._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/src/pages/_document.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
