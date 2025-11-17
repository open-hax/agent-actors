import type { PluginInput } from '@opencode-ai/plugin';
import type { OpencodeClient } from '@opencode-ai/sdk';
export interface PluginRuntime {
    opencodeClient: OpencodeClient;
}
export declare function createPluginRuntime(pluginContext: PluginInput): Promise<PluginRuntime>;
//# sourceMappingURL=runtime.d.ts.map