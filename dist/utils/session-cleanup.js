"use strict";
// SPDX-License-Identifier: GPL-3.0-only
Object.defineProperty(exports, "__esModule", { value: true });
exports.deduplicateSessions = deduplicateSessions;
/**
 * Deduplicate sessions by keeping only most recent version of each session ID
 */
function deduplicateSessions(sessions) {
    var _a, _b, _c, _d;
    var sessionMap = new Map();
    for (var _i = 0, sessions_1 = sessions; _i < sessions_1.length; _i++) {
        var session = sessions_1[_i];
        if (!session || !session.id)
            continue;
        var existing = sessionMap.get(session.id);
        var sessionTime = ((_a = session.time) === null || _a === void 0 ? void 0 : _a.created) ||
            (typeof session.createdAt === 'string' ? session.createdAt : (_b = session.createdAt) === null || _b === void 0 ? void 0 : _b.toString());
        var existingTime = ((_c = existing === null || existing === void 0 ? void 0 : existing.time) === null || _c === void 0 ? void 0 : _c.created) ||
            (typeof (existing === null || existing === void 0 ? void 0 : existing.createdAt) === 'string'
                ? existing.createdAt
                : (_d = existing === null || existing === void 0 ? void 0 : existing.createdAt) === null || _d === void 0 ? void 0 : _d.toString());
        // Keep session with most recent timestamp
        if (!existing || !existingTime || (sessionTime && existingTime && sessionTime > existingTime)) {
            sessionMap.set(session.id, session);
        }
    }
    return Array.from(sessionMap.values());
}
//# sourceMappingURL=session-cleanup.js.map