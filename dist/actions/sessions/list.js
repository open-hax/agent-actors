"use strict";
// SPDX-License-Identifier: GPL-3.0-only
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
var stores_js_1 = require("../../stores.js");
var SessionUtils_js_1 = require("../../utils/SessionUtils.js");
var session_cleanup_js_1 = require("../../utils/session-cleanup.js");
/**
 * Extract session ID from legacy text format
 */
function extractSessionIdFromText(text) {
    var sessionMatch = text.match(/Session:\s*(\w+)/);
    return (sessionMatch === null || sessionMatch === void 0 ? void 0 : sessionMatch[1]) || null;
}
/**
 * Create session data from timestamp
 */
function createSessionDataFromTimestamp(sessionId, title, timestamp) {
    var now = typeof timestamp === 'number' ? timestamp : Date.now();
    return {
        id: sessionId,
        title: title,
        createdAt: now,
        updatedAt: now,
        lastActivity: now,
        status: 'unknown',
        time: {
            created: new Date(typeof timestamp === 'number' ? timestamp : Date.now()).toISOString(),
        },
    };
}
/**
 * Safely parse session data, handling both JSON and plain text formats
 */
function parseSessionData(session) {
    var _a;
    try {
        return JSON.parse(session.text);
    }
    catch (error) {
        // Handle legacy plain text format - extract session ID from text
        var sessionId = extractSessionIdFromText(session.text);
        if (sessionId) {
            return createSessionDataFromTimestamp(sessionId, "Session ".concat(sessionId), session.timestamp);
        }
        // Fallback - create minimal session object
        return createSessionDataFromTimestamp(((_a = session.id) === null || _a === void 0 ? void 0 : _a.toString()) || 'unknown', 'Legacy Session', session.timestamp);
    }
}
function calculateFetchLimit(limit, offset) {
    return Math.min(limit + offset + 50, 500);
}
function createEmptyResponse(limit, offset) {
    return {
        sessions: [],
        totalCount: 0,
        pagination: {
            limit: limit,
            offset: offset,
            hasMore: false,
            currentPage: limit > 0 ? Math.floor(offset / limit) + 1 : 1,
            totalPages: 0,
        },
        summary: {
            active: 0,
            waiting_for_input: 0,
            idle: 0,
            agentTasks: 0,
        },
    };
}
function sortSessionsByTime(sessions) {
    return __spreadArray([], sessions, true).sort(function (a, b) {
        var _a, _b;
        // Use createdAt or time.created from SessionInfo for sorting
        var aTime = a.createdAt || ((_a = a.time) === null || _a === void 0 ? void 0 : _a.created) || '';
        var bTime = b.createdAt || ((_b = b.time) === null || _b === void 0 ? void 0 : _b.created) || '';
        if (aTime && bTime && typeof aTime === 'string' && typeof bTime === 'string') {
            return bTime.localeCompare(aTime);
        }
        var aId = a.id || '';
        var bId = b.id || '';
        return bId.localeCompare(aId);
    });
}
function getSessionMessages(sessionId) {
    return __awaiter(this, void 0, void 0, function () {
        var messageKey, store, allStored, messageEntry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    messageKey = "session:".concat(sessionId, ":messages");
                    return [4 /*yield*/, (0, stores_js_1.getSessionStore)()];
                case 1:
                    store = _a.sent();
                    return [4 /*yield*/, store.getMostRecent(100)];
                case 2:
                    allStored = _a.sent();
                    messageEntry = allStored.find(function (entry) { return entry.id === messageKey; });
                    if (!messageEntry) {
                        return [2 /*return*/, []];
                    }
                    return [2 /*return*/, JSON.parse(messageEntry.text)];
            }
        });
    });
}
function enhanceSessionWithMessages(session) {
    return __awaiter(this, void 0, void 0, function () {
        var messages, sessionData, error_1, sessionData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getSessionMessages(session.id)];
                case 1:
                    messages = _a.sent();
                    sessionData = {
                        id: session.id,
                        title: session.title,
                        createdAt: session.createdAt,
                        updatedAt: session.createdAt,
                        lastActivity: session.createdAt,
                        status: 'unknown',
                        time: session.time,
                    };
                    return [2 /*return*/, SessionUtils_js_1.SessionUtils.createSessionInfo(sessionData, messages.length, undefined)];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error processing session ".concat(session.id, ":"), error_1);
                    sessionData = {
                        id: session.id,
                        title: session.title,
                        createdAt: session.createdAt,
                        updatedAt: session.createdAt,
                        lastActivity: session.createdAt,
                        status: 'unknown',
                        time: session.time,
                    };
                    return [2 /*return*/, __assign(__assign({}, SessionUtils_js_1.SessionUtils.createSessionInfo(sessionData, 0, undefined)), { error: 'Could not fetch messages' })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createSessionSummary(sessions) {
    return {
        active: sessions.filter(function (s) { return s.activityStatus === 'active'; }).length,
        waiting_for_input: sessions.filter(function (s) { return s.activityStatus === 'waiting_for_input'; }).length,
        idle: sessions.filter(function (s) { return s.activityStatus === 'idle'; }).length,
        agentTasks: sessions.filter(function (s) { return s.isAgentTask; }).length,
    };
}
function createListResponse(sessions, totalCount, limit, offset) {
    var hasMore = offset + limit < totalCount;
    return {
        sessions: sessions,
        totalCount: totalCount,
        pagination: {
            limit: limit,
            offset: offset,
            hasMore: hasMore,
            currentPage: limit > 0 ? Math.floor(offset / limit) + 1 : 1,
            totalPages: limit > 0 ? Math.ceil(totalCount / limit) : 0,
        },
        summary: createSessionSummary(sessions),
    };
}
function logDebug(debugEnabled, message, data) {
    if (debugEnabled) {
        console.log("[DEBUG] ".concat(message), data || '');
    }
}
function logSessionInfo(debugEnabled, sessions) {
    if (debugEnabled) {
        console.log("[INFO] Session IDs being processed:");
        sessions.slice(0, 5).forEach(function (s) {
            console.log("  - ".concat(s.id));
        });
    }
}
function list(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var debugEnabled, fetchLimit, store, storedSessions, sessionEntries, parsedSessions, sessionsList, sortedSessions, paginated, enhanced, error_2;
        var limit = _b.limit, offset = _b.offset;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    debugEnabled = Boolean(process.env.OPENCODE_DEBUG);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, , 6]);
                    logDebug(debugEnabled, "list called with limit=".concat(limit, ", offset=").concat(offset));
                    fetchLimit = calculateFetchLimit(limit, offset);
                    logDebug(debugEnabled, "fetchLimit=".concat(fetchLimit));
                    return [4 /*yield*/, (0, stores_js_1.getSessionStore)()];
                case 2:
                    store = _c.sent();
                    return [4 /*yield*/, store.getMostRecent(fetchLimit)];
                case 3:
                    storedSessions = _c.sent();
                    logDebug(debugEnabled, "retrieved ".concat((storedSessions === null || storedSessions === void 0 ? void 0 : storedSessions.length) || 0, " sessions from store"));
                    if (!(storedSessions === null || storedSessions === void 0 ? void 0 : storedSessions.length)) {
                        return [2 /*return*/, createEmptyResponse(limit, offset)];
                    }
                    sessionEntries = storedSessions.filter(function (entry) { return entry.id && entry.id.startsWith('session_'); });
                    logDebug(debugEnabled, "filtered to ".concat((sessionEntries === null || sessionEntries === void 0 ? void 0 : sessionEntries.length) || 0, " actual session entries"));
                    if (!(sessionEntries === null || sessionEntries === void 0 ? void 0 : sessionEntries.length)) {
                        return [2 /*return*/, createEmptyResponse(limit, offset)];
                    }
                    parsedSessions = sessionEntries.map(function (session) { return parseSessionData(session); });
                    sessionsList = (0, session_cleanup_js_1.deduplicateSessions)(parsedSessions);
                    logDebug(debugEnabled, "after deduplication: ".concat((sessionsList === null || sessionsList === void 0 ? void 0 : sessionsList.length) || 0, " sessions"));
                    logSessionInfo(debugEnabled, sessionsList);
                    if (!(sessionsList === null || sessionsList === void 0 ? void 0 : sessionsList.length)) {
                        return [2 /*return*/, createEmptyResponse(limit, offset)];
                    }
                    sortedSessions = sortSessionsByTime(sessionsList);
                    paginated = sortedSessions.slice(offset, offset + limit);
                    logDebug(debugEnabled, "after pagination: ".concat(paginated.length, " sessions (offset=").concat(offset, ", limit=").concat(limit, ")"));
                    return [4 /*yield*/, Promise.all(paginated.map(function (session) { return enhanceSessionWithMessages(session); }))];
                case 4:
                    enhanced = _c.sent();
                    return [2 /*return*/, createListResponse(enhanced, sessionsList.length, limit, offset)];
                case 5:
                    error_2 = _c.sent();
                    console.error('Error in list_sessions:', error_2);
                    console.error('Parameters received:', { limit: limit, offset: offset });
                    return [2 /*return*/, {
                            error: "Failed to list sessions: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)),
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=list.js.map