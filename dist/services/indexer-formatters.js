"use strict";
// SPDX-License-Identifier: GPL-3.0-only
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageToMarkdown = exports.sessionToMarkdown = exports.eventToMarkdown = void 0;
var eventToMarkdown = function (event) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var timestamp = new Date().toISOString();
    var sessionId = (_j = (_f = (_c = (_b = (_a = event.properties) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : (_e = (_d = event.properties) === null || _d === void 0 ? void 0 : _d.info) === null || _e === void 0 ? void 0 : _e.sessionID) !== null && _f !== void 0 ? _f : (_h = (_g = event.properties) === null || _g === void 0 ? void 0 : _g.part) === null || _h === void 0 ? void 0 : _h.sessionID) !== null && _j !== void 0 ? _j : 'N/A';
    return "# Event: ".concat(event.type, "\n\n**Timestamp:** ").concat(timestamp, "\n**Session ID:** ").concat(sessionId, "\n\n## Properties\n\n```json\n").concat(JSON.stringify((_k = event.properties) !== null && _k !== void 0 ? _k : {}, null, 2), "\n```\n\n---\n");
};
exports.eventToMarkdown = eventToMarkdown;
var sessionToMarkdown = function (session) {
    var _a, _b;
    return "# Session: ".concat(session.title || session.id, "\n\n**ID:** ").concat(session.id, "\n**Created:** ").concat(((_a = session.time) === null || _a === void 0 ? void 0 : _a.created) ? new Date(session.time.created).toLocaleString() : 'Unknown', "\n**Project ID:** ").concat(session.projectID || 'N/A', "\n\n## Description\n\n").concat((_b = session.title) !== null && _b !== void 0 ? _b : 'Untitled Session', "\n\n---\n");
};
exports.sessionToMarkdown = sessionToMarkdown;
var messageToMarkdown = function (message) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // Handle both new JSON format (stored as text in DualStoreEntry) and legacy format
    var messageData;
    // Check if this is a DualStoreEntry with text field containing JSON
    if (message && typeof message.text === 'string' && message.text.startsWith('{')) {
        try {
            // New format: JSON string with complete message structure
            messageData = JSON.parse(message.text);
        }
        catch (_l) {
            // Fallback: treat as plain text if JSON parsing fails
            messageData = {
                info: { id: message.id, role: 'unknown' },
                parts: [{ type: 'text', text: message.text }],
            };
        }
    }
    else if (message && typeof message.text === 'string') {
        // DualStoreEntry with plain text
        messageData = {
            info: { id: message.id, role: 'unknown' },
            parts: [{ type: 'text', text: message.text }],
        };
    }
    else {
        // Legacy format: direct message structure
        messageData = message;
    }
    var textParts = (_b = (_a = messageData.parts) === null || _a === void 0 ? void 0 : _a.filter(function (part) { return part.type === 'text'; })) !== null && _b !== void 0 ? _b : [];
    var content = (_c = textParts.map(function (part) { return part.text; }).join('\n\n')) !== null && _c !== void 0 ? _c : '[No text content]';
    var timestamp = message.timestamp
        ? new Date(message.timestamp).toLocaleString()
        : ((_e = (_d = messageData.info) === null || _d === void 0 ? void 0 : _d.time) === null || _e === void 0 ? void 0 : _e.created)
            ? new Date(messageData.info.time.created).toLocaleString()
            : 'Unknown';
    return "# Message: ".concat((_f = messageData.info) === null || _f === void 0 ? void 0 : _f.id, "\n\n**Role:** ").concat((_h = (_g = messageData.info) === null || _g === void 0 ? void 0 : _g.role) !== null && _h !== void 0 ? _h : 'unknown', "\n**Timestamp:** ").concat(timestamp, "\n**Message ID:** ").concat((_k = (_j = messageData.info) === null || _j === void 0 ? void 0 : _j.id) !== null && _k !== void 0 ? _k : 'unknown', "\n\n## Content\n\n").concat(content, "\n\n---\n");
};
exports.messageToMarkdown = messageToMarkdown;
//# sourceMappingURL=indexer-formatters.js.map