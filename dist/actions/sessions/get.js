"use strict";
// SPDX-License-Identifier: GPL-3.0-only
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = get;
var stores_js_1 = require("../../stores.js");
var SessionUtils_js_1 = require("../../utils/SessionUtils.js");
var formatTimestamp = function (timestamp) {
    if (!timestamp) {
        return new Date().toISOString();
    }
    if (typeof timestamp === 'number') {
        return new Date(timestamp).toISOString();
    }
    if (timestamp instanceof Date) {
        return timestamp.toISOString();
    }
    return timestamp;
};
var extractSessionFromText = function (text) {
    var sessionMatch = text.match(/Session:\s*(\w+)/);
    if (sessionMatch === null || sessionMatch === void 0 ? void 0 : sessionMatch[1]) {
        var sessionId = sessionMatch[1];
        return {
            id: sessionId,
            title: "Session ".concat(sessionId),
        };
    }
    return {};
};
var createFallbackSession = function (entry) {
    var sessionFromText = extractSessionFromText(entry.text);
    return {
        id: sessionFromText.id || entry.id || 'unknown',
        title: sessionFromText.title || 'Legacy Session',
        createdAt: formatTimestamp(entry.timestamp),
    };
};
/**
 * Safely parse session data, handling both JSON and plain text formats
 */
var parseSessionData = function (entry) {
    try {
        return JSON.parse(entry.text);
    }
    catch (_a) {
        return createFallbackSession(entry);
    }
};
var getSessionEntry = function (sessionId) { return __awaiter(void 0, void 0, void 0, function () {
    var store;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, stores_js_1.getSessionStore)()];
            case 1:
                store = _a.sent();
                return [2 /*return*/, store.get(sessionId)];
        }
    });
}); };
var parseMessages = function (messageEntry) {
    try {
        return JSON.parse(messageEntry.text);
    }
    catch (_a) {
        return [];
    }
};
var createSessionResponse = function (session, messages, limit, offset) {
    var sessionInfo = SessionUtils_js_1.SessionUtils.createSessionInfo(session, messages.length, undefined);
    var paginatedMessages = limit ? messages.slice(offset || 0, (offset || 0) + limit) : messages;
    return {
        session: sessionInfo,
        messages: paginatedMessages,
    };
};
var getMessagesForSession = function (sessionId) { return __awaiter(void 0, void 0, void 0, function () {
    var messageKey, store, messageEntry;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                messageKey = "session:".concat(sessionId, ":messages");
                return [4 /*yield*/, (0, stores_js_1.getSessionStore)()];
            case 1:
                store = _a.sent();
                return [4 /*yield*/, store.get(messageKey)];
            case 2:
                messageEntry = _a.sent();
                if (!messageEntry) {
                    return [2 /*return*/, []];
                }
                return [2 /*return*/, parseMessages(messageEntry)];
        }
    });
}); };
function get(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var sessionEntry, session, messages;
        var sessionId = _b.sessionId, limit = _b.limit, offset = _b.offset;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getSessionEntry(sessionId)];
                case 1:
                    sessionEntry = _c.sent();
                    if (!sessionEntry) {
                        return [2 /*return*/, { error: 'Session not found in dual store' }];
                    }
                    session = parseSessionData(sessionEntry);
                    return [4 /*yield*/, getMessagesForSession(sessionId)];
                case 2:
                    messages = _c.sent();
                    return [2 /*return*/, createSessionResponse(session, messages, limit, offset)];
            }
        });
    });
}
//# sourceMappingURL=get.js.map