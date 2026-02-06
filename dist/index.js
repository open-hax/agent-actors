"use strict";
// SPDX-License-Identifier: GPL-3.0-only
// Public exports for the Session Orchestrator plugin package
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpencodeInterfacePlugin = exports.AgentOrchestrationPlugin = exports.SessionIndexingPlugin = exports.SessionOrchestratorPlugin = void 0;
var session_orchestrator_js_1 = require("./plugins/session-orchestrator.js");
var session_orchestrator_js_2 = require("./plugins/session-orchestrator.js");
Object.defineProperty(exports, "SessionOrchestratorPlugin", { enumerable: true, get: function () { return session_orchestrator_js_2.SessionOrchestratorPlugin; } });
var session_indexing_js_1 = require("./plugins/session-indexing.js");
Object.defineProperty(exports, "SessionIndexingPlugin", { enumerable: true, get: function () { return session_indexing_js_1.SessionIndexingPlugin; } });
var agent_orchestration_js_1 = require("./plugins/agent-orchestration.js");
Object.defineProperty(exports, "AgentOrchestrationPlugin", { enumerable: true, get: function () { return agent_orchestration_js_1.AgentOrchestrationPlugin; } });
// Backwards compatibility alias until external consumers migrate
exports.OpencodeInterfacePlugin = session_orchestrator_js_1.SessionOrchestratorPlugin;
exports.default = session_orchestrator_js_1.SessionOrchestratorPlugin;
//# sourceMappingURL=index.js.map