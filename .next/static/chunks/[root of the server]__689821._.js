(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__689821._.js", {

"[turbopack]/dev/client/websocket.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

// Adapted from https://github.com/vercel/next.js/blob/canary/packages/next/client/dev/error-overlay/websocket.ts
__turbopack_esm__({
    "addMessageListener": ()=>addMessageListener,
    "connectHMR": ()=>connectHMR,
    "sendMessage": ()=>sendMessage
});
let source;
const eventCallbacks = [];
// TODO: add timeout again
// let lastActivity = Date.now()
function getSocketProtocol(assetPrefix) {
    let protocol = location.protocol;
    try {
        // assetPrefix is a url
        protocol = new URL(assetPrefix).protocol;
    } catch (_) {}
    return protocol === "http:" ? "ws" : "wss";
}
function addMessageListener(cb) {
    eventCallbacks.push(cb);
}
function sendMessage(data) {
    if (!source || source.readyState !== source.OPEN) return;
    return source.send(data);
}
function connectHMR(options) {
    const { timeout = 5 * 1000 } = options;
    function init() {
        if (source) source.close();
        console.log("[HMR] connecting...");
        function handleOnline() {
            const connected = {
                type: "turbopack-connected"
            };
            eventCallbacks.forEach((cb)=>{
                cb(connected);
            });
            if (options.log) console.log("[HMR] connected");
        // lastActivity = Date.now()
        }
        function handleMessage(event) {
            // lastActivity = Date.now()
            const message = {
                type: "turbopack-message",
                data: JSON.parse(event.data)
            };
            eventCallbacks.forEach((cb)=>{
                cb(message);
            });
        }
        // let timer: NodeJS.Timeout
        function handleDisconnect() {
            source.close();
            setTimeout(init, timeout);
        }
        const { hostname, port } = location;
        const protocol = getSocketProtocol(options.assetPrefix || "");
        const assetPrefix = options.assetPrefix.replace(/^\/+/, "");
        let url = `${protocol}://${hostname}:${port}${assetPrefix ? `/${assetPrefix}` : ""}`;
        if (assetPrefix.startsWith("http")) {
            url = `${protocol}://${assetPrefix.split("://")[1]}`;
        }
        source = new window.WebSocket(`${url}${options.path}`);
        source.onopen = handleOnline;
        source.onerror = handleDisconnect;
        source.onmessage = handleMessage;
    }
    init();
}

})()),
"[turbopack]/dev/client/hmr-client.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

/// <reference path="../../shared/runtime-types.d.ts" />
/// <reference path="../runtime/base/globals.d.ts" />
/// <reference path="../runtime/base/protocol.d.ts" />
/// <reference path="../runtime/base/extensions.d.ts" />
__turbopack_esm__({
    "connect": ()=>connect,
    "setHooks": ()=>setHooks,
    "subscribeToUpdate": ()=>subscribeToUpdate
});
var __TURBOPACK__imported__module__$5b$turbopack$5d2f$dev$2f$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack]/dev/client/websocket.ts [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function connect({ // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
addMessageListener = __TURBOPACK__imported__module__$5b$turbopack$5d2f$dev$2f$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["addMessageListener"], // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$dev$2f$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"], onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    // TODO(WEB-1465) Remove this backwards compat fallback once
    // vercel/next.js#54586 is merged.
    if (callback === undefined) {
        callback = sendMessage;
        sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$dev$2f$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"];
    }
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}

})()),
"[project]/src/shared/lib/hooks/useResizeObserver.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "useResizeObserver": ()=>useResizeObserver
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
var _s = __turbopack_refresh__.signature();
;
const useResizeObserver = ()=>{
    _s();
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    const observedElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!observedElementRef.current) {
            return;
        }
        const observer = new ResizeObserver((entries)=>{
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                setSize({
                    width,
                    height
                });
            }
        });
        observer.observe(observedElementRef.current);
        return ()=>{
            observer.disconnect();
        };
    }, [
        observedElementRef
    ]);
    return {
        observedElementRef,
        size
    };
};
_s(useResizeObserver, "ROJSXfBm31rHjor0sLQszVQZBis=");

})()),
"[project]/src/shared/lib/hooks/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/shared/lib/hooks/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$hooks$2f$useResizeObserver$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/lib/hooks/useResizeObserver.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$hooks$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/shared/lib/hooks/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/modules/Item/TodoItem.module.scss.module.css [client] (css module)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {

__turbopack_export_value__({
  "todoIcons": "TodoItem-module-scss-module__V6iBEq__todoIcons",
  "todoItem": "TodoItem-module-scss-module__V6iBEq__todoItem",
  "todoItemButtons": "TodoItem-module-scss-module__V6iBEq__todoItemButtons",
  "todoItemDone": "TodoItem-module-scss-module__V6iBEq__todoItemDone",
  "todoItemLabel": "TodoItem-module-scss-module__V6iBEq__todoItemLabel",
  "todoItemText": "TodoItem-module-scss-module__V6iBEq__todoItemText",
});

})()),
"[project]/src/shared/lib/services/broadcastService.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "listenToMessages": ()=>listenToMessages,
    "sendMessage": ()=>sendMessage
});
const channelName = 'theme_channel';
const channel = new BroadcastChannel(channelName);
const sendMessage = (message)=>{
    if (channel) {
        // eslint-disable-next-line unicorn/require-post-message-target-origin
        channel.postMessage(message);
    }
};
const listenToMessages = (callback)=>{
    if (channel) {
        const handleMessage = (event)=>{
            callback(event.data);
        };
        channel.addEventListener('message', handleMessage);
    }
};

})()),
"[project]/src/context/ThemeContext.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ThemeProvider": ()=>ThemeProvider,
    "useThemeContext": ()=>useThemeContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$services$2f$broadcastService$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/lib/services/broadcastService.ts [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])({
    currentTheme: 'light'
});
const ThemeProvider = ({ children })=>{
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('light');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$services$2f$broadcastService$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["listenToMessages"])((message)=>{
            if (message.type === 'theme_change') {
                setTheme(message.data);
            }
        });
    }, []);
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setTheme((prevTheme)=>prevTheme === 'light' ? 'dark' : 'light');
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$services$2f$broadcastService$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"])({
            type: 'theme_change',
            data: theme
        });
    }, [
        theme
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            toggleTheme,
            currentTheme: theme
        }), [
        toggleTheme,
        theme
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/ThemeContext.tsx",
        lineNumber: 48,
        columnNumber: 12
    }, this);
};
_s(ThemeProvider, "RKcPt0cnROgW1ihA9RocZbPBGxc=");
_c = ThemeProvider;
const useThemeContext = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext should be inside ThemeProvider');
    }
    return context;
};
_s1(useThemeContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_refresh__.register(_c, "ThemeProvider");

})()),
"[project]/src/shared/lib/utils/themeUtils.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getBackgroundColor": ()=>getBackgroundColor,
    "getButtonType": ()=>getButtonType,
    "getTabColor": ()=>getTabColor,
    "getTextColor": ()=>getTextColor
});
const getButtonType = (currentTheme)=>currentTheme === 'light' ? 'primary' : 'default';
const getTextColor = (currentTheme)=>currentTheme === 'dark' ? 'typographyDark' : '';
const getBackgroundColor = (currentTheme)=>currentTheme === 'dark' ? 'backgroundDark' : '';
const getTabColor = (currentTheme)=>currentTheme === 'dark' ? 'darkTab' : '';

})()),
"[project]/src/shared/lib/styles/Theme.module.scss.module.css [client] (css module)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {

__turbopack_export_value__({
  "backgroundDark": "Theme-module-scss-module__tP3sLG__backgroundDark",
  "darkTab": "Theme-module-scss-module__tP3sLG__darkTab",
  "typographyDark": "Theme-module-scss-module__tP3sLG__typographyDark",
});

})()),
"[project]/src/shared/lib/i18n/translations.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "i18n": ()=>i18n
});
const i18n = {
    title: {
        ru: 'Список дел',
        en: 'Todo list'
    },
    addTask: {
        ru: 'Добавить',
        en: 'Add'
    },
    changeTheme: {
        ru: 'Изменить тему',
        en: 'Change theme'
    },
    changeLanguage: {
        ru: 'Изменить язык',
        en: 'Change language'
    },
    headerCounterDone: {
        ru: 'выполнено',
        en: 'done'
    },
    headerCounterToDo: {
        ru: 'осталось',
        en: 'more to do'
    },
    all: {
        ru: 'Все',
        en: 'All'
    },
    active: {
        ru: 'Активные',
        en: 'Active'
    },
    done: {
        ru: 'Выполненные',
        en: 'Done'
    },
    confirmDelete: {
        ru: 'Вы действительно хотите удалить задачу?',
        en: 'Are you sure you want to delete the task?'
    },
    confirmDeleteTitle: {
        ru: 'Подтвердите удаление',
        en: 'Confirm delete'
    },
    confirm: {
        ru: 'Подтвердить',
        en: 'Confirm'
    },
    cancel: {
        ru: 'Отмена',
        en: 'Cancel'
    },
    importantTooltip: {
        ru: 'Добавить в важные',
        en: 'Add to important'
    },
    openMap: {
        ru: 'Открыть карту',
        en: 'Open map'
    },
    map: {
        ru: 'Я карта',
        en: 'Map'
    },
    back: {
        ru: 'Назад',
        en: 'Back'
    }
};

})()),
"[project]/src/context/LocalizationContext.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LocalizationProvider": ()=>LocalizationProvider,
    "useLocalizationContext": ()=>useLocalizationContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$i18n$2f$translations$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/lib/i18n/translations.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$services$2f$broadcastService$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/lib/services/broadcastService.ts [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
;
;
;
const LocalizationContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const LocalizationProvider = ({ children })=>{
    _s();
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$services$2f$broadcastService$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["listenToMessages"])((message)=>{
            if (message.type === 'language_change') {
                setLanguage(message.data);
            }
        });
    }, []);
    const toggleLanguage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setLanguage((prevLanguage)=>prevLanguage === 'en' ? 'ru' : 'en');
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$services$2f$broadcastService$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"])({
            type: 'language_change',
            data: language
        });
    }, [
        language
    ]);
    const translate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])((key)=>{
        const translation = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$i18n$2f$translations$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["i18n"][key];
        if (translation) {
            return translation[language] || key;
        }
        return key;
    }, [
        language
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            toggleLanguage,
            language,
            translate
        }), [
        language,
        translate,
        toggleLanguage
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LocalizationContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/LocalizationContext.tsx",
        lineNumber: 61,
        columnNumber: 12
    }, this);
};
_s(LocalizationProvider, "X1eiO9lxv+zD0+4QTAjXi0NRbkE=");
_c = LocalizationProvider;
const useLocalizationContext = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(LocalizationContext);
    if (!context) {
        throw new Error('useLocalizationContext must be used within a LocalizationProvider');
    }
    return context;
};
_s1(useLocalizationContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_refresh__.register(_c, "LocalizationProvider");

})()),
"[project]/src/modules/ConfirmDelete/ConfirmDelete.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ConfirmDelete": ()=>ConfirmDelete
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/button/index.js [client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/modal/index.js [client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/typography/index.js [client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/LocalizationContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2f$themeUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/lib/utils/themeUtils.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/ThemeContext.tsx [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
const ConfirmDelete = ({ open, handleOk, handleCancel })=>{
    _s();
    const { translate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLocalizationContext"])();
    const { currentTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useThemeContext"])();
    const buttonType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2f$themeUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getButtonType"])(currentTheme);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
        open: open,
        title: translate('confirmDeleteTitle'),
        onCancel: handleCancel,
        footer: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                type: "default",
                size: "large",
                onClick: handleCancel,
                children: translate('cancel')
            }, "cancel", false, {
                fileName: "[project]/src/modules/ConfirmDelete/ConfirmDelete.tsx",
                lineNumber: 24,
                columnNumber: 17
            }, void 0),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                type: buttonType,
                size: "large",
                onClick: handleOk,
                children: translate('confirm')
            }, "confirm", false, {
                fileName: "[project]/src/modules/ConfirmDelete/ConfirmDelete.tsx",
                lineNumber: 27,
                columnNumber: 17
            }, void 0)
        ],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"].Text, {
            children: translate('confirmDelete')
        }, void 0, false, {
            fileName: "[project]/src/modules/ConfirmDelete/ConfirmDelete.tsx",
            lineNumber: 32,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/modules/ConfirmDelete/ConfirmDelete.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, this);
};
_s(ConfirmDelete, "CuvUkg71cXoUi9fwdZ875LISL9g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLocalizationContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useThemeContext"]
    ];
});
_c = ConfirmDelete;
var _c;
__turbopack_refresh__.register(_c, "ConfirmDelete");

})()),
"[project]/src/modules/ConfirmDelete/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/modules/ConfirmDelete/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$ConfirmDelete$2f$ConfirmDelete$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/ConfirmDelete/ConfirmDelete.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$ConfirmDelete$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/modules/ConfirmDelete/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/modules/Tooltip/ImportantTooltip.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ImportantTooltip": ()=>ImportantTooltip
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/tooltip/index.js [client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/LocalizationContext.tsx [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
;
;
const ImportantTooltip = ({ children })=>{
    _s();
    const { translate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLocalizationContext"])();
    const text = translate('importantTooltip');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
        title: text,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/modules/Tooltip/ImportantTooltip.tsx",
        lineNumber: 14,
        columnNumber: 12
    }, this);
};
_s(ImportantTooltip, "IZWx/TZTsNTjCtzW33qOoTQHAuI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLocalizationContext"]
    ];
});
_c = ImportantTooltip;
var _c;
__turbopack_refresh__.register(_c, "ImportantTooltip");

})()),
"[project]/src/modules/Tooltip/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/modules/Tooltip/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Tooltip$2f$ImportantTooltip$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/Tooltip/ImportantTooltip.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Tooltip$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/modules/Tooltip/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/modules/Item/TodoItem.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "TodoItem": ()=>TodoItem
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$checkbox$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/checkbox/index.js [client] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/typography/index.js [client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteTwoTone$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteTwoTone$3e$__ = __turbopack_import__("[project]/node_modules/@ant-design/icons/es/icons/DeleteTwoTone.js [client] (ecmascript) <export default as DeleteTwoTone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$FireTwoTone$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FireTwoTone$3e$__ = __turbopack_import__("[project]/node_modules/@ant-design/icons/es/icons/FireTwoTone.js [client] (ecmascript) <export default as FireTwoTone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$dom$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-dom/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/modules/Item/TodoItem.module.scss.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/ThemeContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2f$themeUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/lib/utils/themeUtils.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$styles$2f$Theme$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/shared/lib/styles/Theme.module.scss.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$ConfirmDelete$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/ConfirmDelete/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$ConfirmDelete$2f$ConfirmDelete$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/ConfirmDelete/ConfirmDelete.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Tooltip$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/Tooltip/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Tooltip$2f$ImportantTooltip$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/Tooltip/ImportantTooltip.tsx [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
;
;
;
;
;
const TodoItem = ({ itemLabel, isImportant, isDone, onToggleDone, onToggleImportant, onDelete, id })=>{
    _s();
    const { currentTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useThemeContext"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const showModal = ()=>setOpen(true);
    const handleCancel = ()=>setOpen(false);
    const handleDelete = ()=>{
        onDelete(id);
        setOpen(false);
    };
    const typographyColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2f$themeUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getTextColor"])(currentTheme);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].todoItem,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$checkbox$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                checked: isDone,
                onChange: ()=>onToggleDone(id)
            }, void 0, false, {
                fileName: "[project]/src/modules/Item/TodoItem.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"].Text, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])({
                    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].todoItemDone]: isDone
                }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$styles$2f$Theme$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"][typographyColor], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].todoItemText),
                onClick: ()=>onToggleDone(id),
                children: itemLabel
            }, void 0, false, {
                fileName: "[project]/src/modules/Item/TodoItem.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].todoItemButtons,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Tooltip$2f$ImportantTooltip$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ImportantTooltip"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$FireTwoTone$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FireTwoTone$3e$__["FireTwoTone"], {
                            twoToneColor: isImportant ? '#ffA500' : '#ccc',
                            onClick: ()=>onToggleImportant(id),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].todoIcons
                        }, void 0, false, {
                            fileName: "[project]/src/modules/Item/TodoItem.tsx",
                            lineNumber: 63,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/modules/Item/TodoItem.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteTwoTone$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteTwoTone$3e$__["DeleteTwoTone"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].deleteButton, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].todoIcons),
                        onClick: showModal
                    }, void 0, false, {
                        fileName: "[project]/src/modules/Item/TodoItem.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this),
                    open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$dom$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$ConfirmDelete$2f$ConfirmDelete$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ConfirmDelete"], {
                        open: open,
                        handleCancel: handleCancel,
                        handleOk: handleDelete
                    }, void 0, false, {
                        fileName: "[project]/src/modules/Item/TodoItem.tsx",
                        lineNumber: 75,
                        columnNumber: 25
                    }, this), document.body)
                ]
            }, void 0, true, {
                fileName: "[project]/src/modules/Item/TodoItem.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/modules/Item/TodoItem.tsx",
        lineNumber: 47,
        columnNumber: 9
    }, this);
};
_s(TodoItem, "3ftDEb2IxXANVo+3vYLzZcJ01C4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useThemeContext"]
    ];
});
_c = TodoItem;
var _c;
__turbopack_refresh__.register(_c, "TodoItem");

})()),
"[project]/src/modules/Item/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/modules/Item/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/Item/TodoItem.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/modules/Item/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/modules/TodoList/TodoList.module.scss.module.css [client] (css module)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {

__turbopack_export_value__({
  "todoList": "TodoList-module-scss-module__gsYK1q__todoList",
});

})()),
"[project]/src/context/TodoContext.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "TodoProvider": ()=>TodoProvider,
    "useTodoContext": ()=>useTodoContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
;
const TodoContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const TodoProvider = ({ children })=>{
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchValue, setSearchValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const deleteTodo = (id)=>{
        setItems((prev)=>prev.filter((item)=>item.id !== id));
    };
    const toggleDone = (id)=>{
        setItems((prev)=>prev.map((item)=>item.id === id ? {
                    ...item,
                    isDone: !item.isDone
                } : item));
    };
    const toggleImportant = (id)=>{
        setItems((prev)=>prev.map((item)=>{
                if (item.id === id) {
                    return {
                        ...item,
                        isImportant: !item.isImportant
                    };
                }
                return item;
            }));
    };
    const filteredItems = items.filter((item)=>item.itemLabel.toLowerCase().includes(searchValue.toLowerCase()));
    const filteredCategoryResult = categories === 'all' ? filteredItems : categories === 'active' ? filteredItems.filter((item)=>!item.isDone) : filteredItems.filter((item)=>item.isDone);
    const done = items.filter((item)=>item.isDone).length;
    const todo = items.filter((item)=>!item.isDone).length;
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            items,
            deleteTodo,
            toggleDone,
            toggleImportant,
            filteredItems: filteredCategoryResult,
            searchValue,
            categories,
            setCategories,
            todo,
            done,
            setSearchValue
        }), [
        items,
        deleteTodo,
        toggleDone,
        toggleImportant,
        filteredCategoryResult,
        searchValue,
        categories,
        setCategories,
        todo,
        done,
        setSearchValue
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TodoContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/TodoContext.tsx",
        lineNumber: 98,
        columnNumber: 12
    }, this);
};
_s(TodoProvider, "6ypTiOPgMjA1Psnwb2+gUI/9gVw=");
_c = TodoProvider;
const useTodoContext = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(TodoContext);
    if (!context) {
        throw new Error('useTodoContext should be inside TodoProvider');
    }
    return context;
};
_s1(useTodoContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_refresh__.register(_c, "TodoProvider");

})()),
"[project]/src/modules/Loading/Loading.module.scss.module.css [client] (css module)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {

__turbopack_export_value__({
  "loading": "Loading-module-scss-module___VghPq__loading",
});

})()),
"[project]/src/modules/Loading/Loading.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Loading": ()=>Loading
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/spin/index.js [client] (ecmascript) <export default as Spin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Loading$2f$Loading$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/modules/Loading/Loading.module.scss.module.css [client] (css module)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const Loading = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Loading$2f$Loading$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].loading,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__["Spin"], {
            tip: "Loading",
            size: "large"
        }, void 0, false, {
            fileName: "[project]/src/modules/Loading/Loading.tsx",
            lineNumber: 7,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/modules/Loading/Loading.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
_c = Loading;
var _c;
__turbopack_refresh__.register(_c, "Loading");

})()),
"[project]/src/modules/Loading/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/modules/Loading/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Loading$2f$Loading$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/Loading/Loading.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Loading$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/modules/Loading/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/shared/api/base.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "COMMENTS_URL": ()=>COMMENTS_URL,
    "TODOS_URL": ()=>TODOS_URL,
    "apiInstance": ()=>apiInstance
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const apiInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});
const TODOS_URL = '/todos';
const COMMENTS_URL = '/posts/1/comments';

})()),
"[project]/src/shared/api/abortController.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "withAbortController": ()=>withAbortController
});
const withAbortController = (request)=>{
    let abortController = new AbortController();
    return (params)=>{
        abortController.abort();
        abortController = new AbortController();
        return request({
            ...params,
            signal: abortController.signal
        });
    };
};

})()),
"[project]/src/shared/api/todos.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "todosRequests": ()=>todosRequests
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$base$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/api/base.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$abortController$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/api/abortController.ts [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const getTodos = (start = 0, limit = 10)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$base$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiInstance"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$base$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["TODOS_URL"], {
        params: {
            _start: start,
            _limit: limit
        }
    });
const postTodo = ({ signal, ...params })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$base$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiInstance"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$base$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["TODOS_URL"], {
        params
    }, {
        signal
    });
const getTodoById = (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$base$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiInstance"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$base$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["TODOS_URL"]}/${id}`);
const todosRequests = {
    getTodos,
    postTodo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$abortController$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["withAbortController"])(postTodo),
    getTodoById
};

})()),
"[project]/src/shared/api/fetchDataFactory.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "createDataModel": ()=>createDataModel
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/effector/effector.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/effector-react/effector-react.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$patronum$2f$status$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/patronum/status/index.js [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const createDataModel = ({ request, createItem, initialData = [], getTodoById })=>{
    const fetchGate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createGate"])();
    const fetchItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createEvent"])();
    const incStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createEvent"])();
    const fetchMoreItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createEvent"])();
    const addItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createEvent"])();
    const fetchTodoById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createEvent"])();
    const fetchItemsFx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createEffect"])(()=>request(0, 10));
    const fetchMoreItemsFx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createEffect"])((start)=>request(start, 10));
    const addItemFx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createEffect"])(async (newItem)=>{
        const data = await createItem(newItem);
        return data;
    });
    const fetchTodoByIdFx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createEffect"])(async (id)=>{
        if (!getTodoById) {
            throw new Error('getTodoById method is not defined');
        }
        return getTodoById(id);
    });
    const $start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createStore"])(0);
    const $items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createStore"])(initialData);
    const $status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$patronum$2f$status$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["status"])({
        effect: fetchItemsFx
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["sample"])({
        clock: fetchGate.open,
        target: fetchItems
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["sample"])({
        clock: fetchItems,
        target: fetchItemsFx
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["sample"])({
        clock: fetchMoreItems,
        source: $start,
        target: fetchMoreItemsFx
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["sample"])({
        clock: incStart,
        source: $start,
        fn: (source)=>source + 10,
        target: $start
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["sample"])({
        clock: fetchItemsFx.doneData,
        fn: (newItems)=>newItems,
        target: $items
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["sample"])({
        clock: addItem,
        target: addItemFx
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["sample"])({
        clock: addItemFx.doneData,
        source: $items,
        fn: (prevItems, newItem)=>[
                ...prevItems,
                newItem
            ],
        target: $items
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["sample"])({
        clock: fetchMoreItemsFx.doneData,
        source: $items,
        fn: (source, clock)=>[
                ...source,
                ...clock
            ],
        target: [
            $items,
            incStart
        ]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2f$effector$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["sample"])({
        clock: fetchTodoById,
        target: fetchTodoByIdFx
    });
    return {
        $status,
        fetchGate,
        addItem,
        $items,
        fetchMoreItems,
        fetchTodoById
    };
};

})()),
"[project]/src/shared/api/todoModel.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "todoModel": ()=>todoModel
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$todos$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/api/todos.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$fetchDataFactory$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/api/fetchDataFactory.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$abortController$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/api/abortController.ts [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const todoModel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$fetchDataFactory$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["createDataModel"])({
    request: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$todos$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["todosRequests"].getTodos();
        return response.data;
    },
    createItem: async (newTodo)=>{
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$abortController$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["withAbortController"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$todos$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["todosRequests"].postTodo)(newTodo);
        return response.data;
    },
    getTodoById: async (id)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$todos$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["todosRequests"].getTodoById(id);
        return response.data;
    }
});

})()),
"[project]/src/modules/TodoList/TodoList.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "TodoList": ()=>TodoList
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/list/index.js [client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/effector-react/effector-react.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/Item/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/Item/TodoItem.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$TodoList$2f$TodoList$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/modules/TodoList/TodoList.module.scss.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TodoContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/TodoContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Loading$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/Loading/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Loading$2f$Loading$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/Loading/Loading.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$todoModel$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/api/todoModel.ts [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
;
;
;
const TodoList = ()=>{
    _s();
    const { deleteTodo, toggleDone, toggleImportant } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TodoContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useTodoContext"])();
    const { $items, $status, fetchGate, fetchMoreItems } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$todoModel$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["todoModel"];
    const status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useUnit"])($status);
    const lastItemRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const todos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useList"])($items, (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            href: `/todo/${item.id}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["TodoItem"], {
                    itemLabel: item.title,
                    isImportant: item.isImportant,
                    isDone: item.completed,
                    onToggleDone: ()=>toggleDone(item.id),
                    onToggleImportant: ()=>toggleImportant(item.id),
                    onDelete: ()=>deleteTodo(item.id),
                    id: item.id
                }, void 0, false, {
                    fileName: "[project]/src/modules/TodoList/TodoList.tsx",
                    lineNumber: 20,
                    columnNumber: 17
                }, this)
            }, item.id, false, {
                fileName: "[project]/src/modules/TodoList/TodoList.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/modules/TodoList/TodoList.tsx",
            lineNumber: 18,
            columnNumber: 9
        }, this));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    fetchMoreItems();
                }
            });
        }, {
            threshold: 1
        });
        const currentRef = lastItemRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return ()=>{
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [
        todos,
        fetchMoreItems
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useGate"])(fetchGate);
    if (status === 'pending') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Loading$2f$Loading$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Loading"], {}, void 0, false, {
            fileName: "[project]/src/modules/TodoList/TodoList.tsx",
            lineNumber: 63,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$TodoList$2f$TodoList$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].todoList,
                children: todos
            }, void 0, false, {
                fileName: "[project]/src/modules/TodoList/TodoList.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: lastItemRef
            }, void 0, false, {
                fileName: "[project]/src/modules/TodoList/TodoList.tsx",
                lineNumber: 69,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
};
_s(TodoList, "ctoCRFP5oPGiCqL92PG1fRnGd4o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TodoContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useTodoContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useUnit"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useList"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useGate"]
    ];
});
_c = TodoList;
var _c;
__turbopack_refresh__.register(_c, "TodoList");

})()),
"[project]/src/modules/TodoList/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/modules/TodoList/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$TodoList$2f$TodoList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/TodoList/TodoList.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$TodoList$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/modules/TodoList/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/modules/MainContent/MainContent.module.scss.module.css [client] (css module)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {

__turbopack_export_value__({
  "mainPage": "MainContent-module-scss-module__90mbHa__mainPage",
  "mainSection": "MainContent-module-scss-module__90mbHa__mainSection",
  "verticalLayout": "MainContent-module-scss-module__90mbHa__verticalLayout",
});

})()),
"[project]/src/modules/AddTodoItem/AddTodoItem.module.scss.module.css [client] (css module)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {

__turbopack_export_value__({
  "addTodoItem": "AddTodoItem-module-scss-module__H4k1va__addTodoItem",
});

})()),
"[project]/src/modules/AddTodoItem/AddTodoItem.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "AddTodoItem": ()=>AddTodoItem
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/button/index.js [client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/input/index.js [client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/effector-react/effector-react.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddTodoItem$2f$AddTodoItem$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/modules/AddTodoItem/AddTodoItem.module.scss.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2f$themeUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/lib/utils/themeUtils.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/ThemeContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/LocalizationContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$todoModel$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/api/todoModel.ts [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
;
;
const AddTodoItem = ()=>{
    _s();
    const [newTask, setNewTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const addNewTodo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useUnit"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$todoModel$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["todoModel"].addItem);
    const { currentTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useThemeContext"])();
    const { translate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLocalizationContext"])();
    const buttonType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2f$themeUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getButtonType"])(currentTheme);
    const handleAddTodo = ()=>{
        if (newTask) {
            addNewTodo({
                title: newTask,
                isImportant: false,
                completed: false,
                userId: ''
            });
            setNewTask('');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddTodoItem$2f$AddTodoItem$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].addTodoItem,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                size: "large",
                value: newTask,
                onChange: (e)=>setNewTask(e.target.value)
            }, void 0, false, {
                fileName: "[project]/src/modules/AddTodoItem/AddTodoItem.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                type: buttonType,
                size: "large",
                onClick: handleAddTodo,
                children: translate('addTask')
            }, void 0, false, {
                fileName: "[project]/src/modules/AddTodoItem/AddTodoItem.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/modules/AddTodoItem/AddTodoItem.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
};
_s(AddTodoItem, "TeU09Nm06W8mcXl4rwrVS3CHnyw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useUnit"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useThemeContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLocalizationContext"]
    ];
});
_c = AddTodoItem;
var _c;
__turbopack_refresh__.register(_c, "AddTodoItem");

})()),
"[project]/src/modules/AddTodoItem/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/modules/AddTodoItem/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddTodoItem$2f$AddTodoItem$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/AddTodoItem/AddTodoItem.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddTodoItem$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/modules/AddTodoItem/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/modules/TodoFilter/TodoFilter.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "TodoFilter": ()=>TodoFilter
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tabs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/tabs/index.js [client] (ecmascript) <export default as Tabs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TodoContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/TodoContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/ThemeContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2f$themeUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/lib/utils/themeUtils.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$styles$2f$Theme$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/shared/lib/styles/Theme.module.scss.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/LocalizationContext.tsx [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
const TodoFilter = ()=>{
    _s();
    const { categories, setCategories } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TodoContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useTodoContext"])();
    const { currentTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useThemeContext"])();
    const { translate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLocalizationContext"])();
    const tabColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2f$themeUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getTabColor"])(currentTheme);
    const onChange = (key)=>{
        setCategories(key);
    };
    const items = [
        {
            key: 'all',
            label: translate('all'),
            children: ''
        },
        {
            key: 'active',
            label: translate('active'),
            children: ''
        },
        {
            key: 'done',
            label: translate('done'),
            children: ''
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tabs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__["Tabs"], {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$styles$2f$Theme$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"][tabColor],
        activeKey: categories,
        centered: true,
        onChange: onChange,
        type: "line",
        size: "large",
        items: items
    }, void 0, false, {
        fileName: "[project]/src/modules/TodoFilter/TodoFilter.tsx",
        lineNumber: 45,
        columnNumber: 9
    }, this);
};
_s(TodoFilter, "RY3uz14XcXwO6BVRDrAWZUcxt58=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TodoContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useTodoContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useThemeContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLocalizationContext"]
    ];
});
_c = TodoFilter;
var _c;
__turbopack_refresh__.register(_c, "TodoFilter");

})()),
"[project]/src/modules/TodoFilter/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/modules/TodoFilter/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$TodoFilter$2f$TodoFilter$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/TodoFilter/TodoFilter.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$TodoFilter$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/modules/TodoFilter/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/modules/Search/Search.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Search": ()=>Search
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/input/index.js [client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TodoContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/TodoContext.tsx [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
;
;
const Search = ()=>{
    _s();
    const { setSearchValue, searchValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TodoContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useTodoContext"])();
    const handleSearchChange = (event)=>{
        setSearchValue(event.target.value);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"].Search, {
        size: "large",
        onChange: handleSearchChange,
        value: searchValue
    }, void 0, false, {
        fileName: "[project]/src/modules/Search/Search.tsx",
        lineNumber: 12,
        columnNumber: 12
    }, this);
};
_s(Search, "+WImKzBsNzKYk+k9y4CczpbeEGc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TodoContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useTodoContext"]
    ];
});
_c = Search;
var _c;
__turbopack_refresh__.register(_c, "Search");

})()),
"[project]/src/modules/Search/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/modules/Search/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Search$2f$Search$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/Search/Search.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Search$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/modules/Search/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/modules/CommentList/CommentList.module.scss.module.css [client] (css module)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {

__turbopack_export_value__({
  "todoList": "CommentList-module-scss-module__7rwUVG__todoList",
});

})()),
"[project]/src/shared/api/comments.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "commentsRequests": ()=>commentsRequests
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$base$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/api/base.ts [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const getComments = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$base$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiInstance"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$base$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMENTS_URL"]);
const postComments = (newComment)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$base$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["apiInstance"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$base$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMENTS_URL"], newComment);
const commentsRequests = {
    getComments,
    postComments
};

})()),
"[project]/src/shared/api/commentModel.ts [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "commentModel": ()=>commentModel
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$comments$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/api/comments.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$fetchDataFactory$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/api/fetchDataFactory.ts [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const commentModel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$fetchDataFactory$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["createDataModel"])({
    request: async ()=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$comments$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["commentsRequests"].getComments();
        return response.data;
    },
    createItem: async (newComment)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$comments$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["commentsRequests"].postComments(newComment);
        return response.data;
    }
});

})()),
"[project]/src/modules/CommentList/CommentList.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "CommentList": ()=>CommentList
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/list/index.js [client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/effector-react/effector-react.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/Item/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/Item/TodoItem.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$CommentList$2f$CommentList$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/modules/CommentList/CommentList.module.scss.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TodoContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/TodoContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Loading$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/Loading/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Loading$2f$Loading$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/Loading/Loading.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$commentModel$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/api/commentModel.ts [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
;
const CommentList = ()=>{
    _s();
    const { deleteTodo, toggleDone, toggleImportant } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TodoContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useTodoContext"])();
    const { $items, $status, fetchGate } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$commentModel$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["commentModel"];
    const status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useUnit"])($status);
    const comments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useList"])($items, (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Item$2f$TodoItem$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["TodoItem"], {
                itemLabel: item.name,
                onToggleDone: ()=>toggleDone(item.id),
                onToggleImportant: ()=>toggleImportant(item.id),
                onDelete: ()=>deleteTodo(item.id),
                id: item.id
            }, void 0, false, {
                fileName: "[project]/src/modules/CommentList/CommentList.tsx",
                lineNumber: 17,
                columnNumber: 13
            }, this)
        }, item.id, false, {
            fileName: "[project]/src/modules/CommentList/CommentList.tsx",
            lineNumber: 16,
            columnNumber: 9
        }, this));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useGate"])(fetchGate);
    if (status === 'pending') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Loading$2f$Loading$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Loading"], {}, void 0, false, {
            fileName: "[project]/src/modules/CommentList/CommentList.tsx",
            lineNumber: 29,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$CommentList$2f$CommentList$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].todoList,
        children: comments
    }, void 0, false, {
        fileName: "[project]/src/modules/CommentList/CommentList.tsx",
        lineNumber: 32,
        columnNumber: 12
    }, this);
};
_s(CommentList, "0Vj4kWn3moRHSpols5ESPMYxBlM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TodoContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useTodoContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useUnit"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useList"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useGate"]
    ];
});
_c = CommentList;
var _c;
__turbopack_refresh__.register(_c, "CommentList");

})()),
"[project]/src/modules/CommentList/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/modules/CommentList/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$CommentList$2f$CommentList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/CommentList/CommentList.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$CommentList$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/modules/CommentList/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/modules/AddComment/AddComment.module.scss.module.css [client] (css module)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {

__turbopack_export_value__({
  "addTodoItem": "AddComment-module-scss-module__BF6dYW__addTodoItem",
});

})()),
"[project]/src/modules/AddComment/AddComment.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "AddComment": ()=>AddComment
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/button/index.js [client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_import__("[project]/node_modules/antd/es/input/index.js [client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/effector-react/effector-react.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddComment$2f$AddComment$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/modules/AddComment/AddComment.module.scss.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2f$themeUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/lib/utils/themeUtils.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/ThemeContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/LocalizationContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$commentModel$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/api/commentModel.ts [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
;
;
const AddComment = ()=>{
    _s();
    const [newTask, setNewTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const addNewTodo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useUnit"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$commentModel$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["commentModel"].addItem);
    const { currentTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useThemeContext"])();
    const { translate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLocalizationContext"])();
    const buttonType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2f$themeUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getButtonType"])(currentTheme);
    const handleAddTodo = ()=>{
        if (newTask) {
            addNewTodo({
                name: newTask,
                body: '',
                email: '',
                postId: ''
            });
            setNewTask('');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddComment$2f$AddComment$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].addTodoItem,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                size: "large",
                value: newTask,
                onChange: (e)=>setNewTask(e.target.value)
            }, void 0, false, {
                fileName: "[project]/src/modules/AddComment/AddComment.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                type: buttonType,
                size: "large",
                onClick: handleAddTodo,
                children: translate('addTask')
            }, void 0, false, {
                fileName: "[project]/src/modules/AddComment/AddComment.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/modules/AddComment/AddComment.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
};
_s(AddComment, "TeU09Nm06W8mcXl4rwrVS3CHnyw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$effector$2d$react$2f$effector$2d$react$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useUnit"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useThemeContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LocalizationContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLocalizationContext"]
    ];
});
_c = AddComment;
var _c;
__turbopack_refresh__.register(_c, "AddComment");

})()),
"[project]/src/modules/AddComment/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/modules/AddComment/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddComment$2f$AddComment$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/AddComment/AddComment.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddComment$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/modules/AddComment/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/modules/YaShare/YaShare.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "YandexShare": ()=>YandexShare
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
;
const YandexShare = ()=>{
    _s();
    const [element, setElement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (element && window?.Ya?.share2) {
            window.Ya.share2(element);
        }
    }, [
        element
    ]);
    const shareRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const target = shareRef.current;
        const callback = (mutationsList)=>{
            for (const mutation of mutationsList){
                if (mutation.type === 'childList') {
                    console.log('A child node has been added or removed.');
                } else if (mutation.type === 'attributes') {
                    console.log(`The ${mutation.attributeName} attribute was modified.`);
                }
            }
        };
        const observer = new MutationObserver(callback);
        const config = {
            childList: true,
            subtree: true
        };
        if (target) {
            observer.observe(target, config);
        }
        return ()=>{
            observer.disconnect();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setElement,
        style: {
            width: 50
        },
        className: "ya-share2",
        "data-curtain": true,
        "data-shape": "round",
        "data-limit": "0",
        "data-more-button-type": "short",
        "data-services": "messenger,vkontakte,odnoklassniki"
    }, void 0, false, {
        fileName: "[project]/src/modules/YaShare/YaShare.tsx",
        lineNumber: 49,
        columnNumber: 9
    }, this);
};
_s(YandexShare, "2Rj4Lffo3H+aPwQXi+xMH9tnZS0=");
_c = YandexShare;
var _c;
__turbopack_refresh__.register(_c, "YandexShare");

})()),
"[project]/src/modules/YaShare/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/modules/YaShare/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$YaShare$2f$YaShare$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/YaShare/YaShare.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$YaShare$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/modules/YaShare/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/modules/MainContent/MainContent.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "MainContent": ()=>MainContent
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$hooks$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/shared/lib/hooks/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$hooks$2f$useResizeObserver$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/lib/hooks/useResizeObserver.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$TodoList$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/TodoList/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$TodoList$2f$TodoList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/TodoList/TodoList.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$MainContent$2f$MainContent$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/modules/MainContent/MainContent.module.scss.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddTodoItem$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/AddTodoItem/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddTodoItem$2f$AddTodoItem$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/AddTodoItem/AddTodoItem.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$TodoFilter$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/TodoFilter/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$TodoFilter$2f$TodoFilter$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/TodoFilter/TodoFilter.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Search$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/Search/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Search$2f$Search$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/Search/Search.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/ThemeContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2f$themeUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/shared/lib/utils/themeUtils.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$styles$2f$Theme$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/src/shared/lib/styles/Theme.module.scss.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$CommentList$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/CommentList/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$CommentList$2f$CommentList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/CommentList/CommentList.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddComment$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/AddComment/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddComment$2f$AddComment$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/AddComment/AddComment.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$YaShare$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/YaShare/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$YaShare$2f$YaShare$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/YaShare/YaShare.tsx [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
;
;
;
;
;
;
;
const MainContent = ()=>{
    _s();
    const { currentTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useThemeContext"])();
    const backgroundColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2f$themeUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getBackgroundColor"])(currentTheme);
    const { observedElementRef, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$hooks$2f$useResizeObserver$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useResizeObserver"])();
    const isVertical = size.width < 1200;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$styles$2f$Theme$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"][backgroundColor],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$MainContent$2f$MainContent$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mainPage,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$Search$2f$Search$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Search"], {}, void 0, false, {
                    fileName: "[project]/src/modules/MainContent/MainContent.tsx",
                    lineNumber: 27,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$TodoFilter$2f$TodoFilter$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["TodoFilter"], {}, void 0, false, {
                    fileName: "[project]/src/modules/MainContent/MainContent.tsx",
                    lineNumber: 28,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$MainContent$2f$MainContent$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mainSection, {
                        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$MainContent$2f$MainContent$2e$module$2e$scss$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].verticalLayout]: isVertical
                    }),
                    ref: observedElementRef,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$CommentList$2f$CommentList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CommentList"], {}, void 0, false, {
                                    fileName: "[project]/src/modules/MainContent/MainContent.tsx",
                                    lineNumber: 34,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddComment$2f$AddComment$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["AddComment"], {}, void 0, false, {
                                    fileName: "[project]/src/modules/MainContent/MainContent.tsx",
                                    lineNumber: 35,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/modules/MainContent/MainContent.tsx",
                            lineNumber: 33,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$TodoList$2f$TodoList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["TodoList"], {}, void 0, false, {
                                    fileName: "[project]/src/modules/MainContent/MainContent.tsx",
                                    lineNumber: 38,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$AddTodoItem$2f$AddTodoItem$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["AddTodoItem"], {}, void 0, false, {
                                    fileName: "[project]/src/modules/MainContent/MainContent.tsx",
                                    lineNumber: 39,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/modules/MainContent/MainContent.tsx",
                            lineNumber: 37,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/modules/MainContent/MainContent.tsx",
                    lineNumber: 29,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$YaShare$2f$YaShare$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["YandexShare"], {}, void 0, false, {
                    fileName: "[project]/src/modules/MainContent/MainContent.tsx",
                    lineNumber: 42,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/modules/MainContent/MainContent.tsx",
            lineNumber: 26,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/modules/MainContent/MainContent.tsx",
        lineNumber: 25,
        columnNumber: 9
    }, this);
};
_s(MainContent, "vXME3ANm6LhVOpK9ZmrNiIvqY/M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ThemeContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useThemeContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$hooks$2f$useResizeObserver$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useResizeObserver"]
    ];
});
_c = MainContent;
var _c;
__turbopack_refresh__.register(_c, "MainContent");

})()),
"[project]/src/modules/MainContent/index.ts [client] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({});
;

})()),
"[project]/src/modules/MainContent/index.ts [client] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$MainContent$2f$MainContent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/MainContent/MainContent.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$MainContent$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/modules/MainContent/index.ts [client] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/src/pages/index.tsx [client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$MainContent$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/modules/MainContent/index.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$MainContent$2f$MainContent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/MainContent/MainContent.tsx [client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const Index = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$MainContent$2f$MainContent$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["MainContent"], {}, void 0, false, {
        fileName: "[project]/src/pages/index.tsx",
        lineNumber: 5,
        columnNumber: 31
    }, this);
_c = Index;
const __TURBOPACK__default__export__ = Index;
var _c;
__turbopack_refresh__.register(_c, "Index");

})()),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__, m: module, e: exports, t: require }) { !function() {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_require__("[project]/src/pages/index.tsx [client] (ecmascript)");
    }
]);
if (module.hot) {
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}

}.call(this) }),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__689821._.js.map