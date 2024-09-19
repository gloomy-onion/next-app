const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/_095ff0._.js");
runtime.loadChunk("server/chunks/ssr/src_b193de._.css");
runtime.loadChunk("server/chunks/ssr/src_modules_Map_MapImage_tsx_28c8fe._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/src/pages/_app.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
