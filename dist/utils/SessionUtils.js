"use strict";
// SPDX-License-Identifier: GPL-3.0-only
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionUtils = void 0;
var SessionUtils = {
    determineActivityStatus: function (_session, messageCount, agentTask) {
        if (agentTask) {
            if (agentTask.status === 'running') {
                var recentActivity = Date.now() - agentTask.lastActivity < 5 * 60 * 1000;
                return recentActivity ? 'active' : 'waiting_for_input';
            }
            return agentTask.status;
        }
        if (messageCount < 10)
            return 'active';
        if (messageCount < 50)
            return 'waiting_for_input';
        return 'idle';
    },
    createSessionInfo: function (session, messageCount, agentTask) {
        var now = Date.now();
        var activityStatus = SessionUtils.determineActivityStatus(session, messageCount, agentTask);
        var sessionAge = agentTask ? Math.round((now - agentTask.startTime) / 1000) : 0;
        return {
            id: session.id,
            title: session.title || session.id,
            messageCount: messageCount,
            lastActivityTime: new Date().toISOString(),
            sessionAge: sessionAge,
            activityStatus: activityStatus,
            isAgentTask: !!agentTask || session.isAgentTask === true,
            agentTaskStatus: agentTask === null || agentTask === void 0 ? void 0 : agentTask.status,
        };
    },
};
exports.SessionUtils = SessionUtils;
//# sourceMappingURL=SessionUtils.js.map