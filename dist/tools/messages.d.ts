import { tool } from '@opencode-ai/plugin/tool';
import type { OpencodeClient } from '@opencode-ai/sdk';
export declare function createReadOnlyMessageTools(opencodeClient: OpencodeClient): Record<string, ReturnType<typeof tool>>;
export declare function createMessageMutationTools(opencodeClient: OpencodeClient): Record<string, ReturnType<typeof tool>>;
//# sourceMappingURL=messages.d.ts.map