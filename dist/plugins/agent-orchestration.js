// SPDX-License-Identifier: GPL-3.0-only
// Agent Orchestration plugin (session lifecycle + prompts)
import { createPluginRuntime } from '../shared/runtime.js';
import { createSessionTools } from '../tools/sessions.js';
import { createMessageMutationTools } from '../tools/messages.js';
export const AgentOrchestrationPlugin = async (pluginContext) => {
    const runtime = await createPluginRuntime(pluginContext);
    return {
        tool: {
            ...createSessionTools(runtime.opencodeClient),
            ...createMessageMutationTools(runtime.opencodeClient),
        },
    };
};
export default AgentOrchestrationPlugin;
//# sourceMappingURL=agent-orchestration.js.map