// SPDX-License-Identifier: GPL-3.0-only
// Runtime helpers shared by Session Orchestrator plugins
import { createOpencodeClient } from '@opencode-ai/sdk';
import { initializeStores } from '../initializeStores.js';
let storesReady = false;
async function ensureStoresReady() {
    if (!storesReady) {
        await initializeStores();
        storesReady = true;
    }
}
export async function createPluginRuntime(pluginContext) {
    await ensureStoresReady();
    const opencodeClient = pluginContext?.client ??
        createOpencodeClient({ baseUrl: 'http://localhost:4096' });
    return {
        opencodeClient,
    };
}
//# sourceMappingURL=runtime.js.map