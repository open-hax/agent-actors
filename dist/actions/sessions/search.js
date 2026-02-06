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
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = search;
var stores_js_1 = require("../../stores.js");
var SessionUtils_js_1 = require("../../utils/SessionUtils.js");
function sessionToSessionData(session) {
    var now = Date.now();
    var sessionTime = session.time;
    return {
        id: session.id,
        title: session.title,
        createdAt: now,
        updatedAt: now,
        lastActivity: now,
        status: 'active',
        time: {
            created: sessionTime === null || sessionTime === void 0 ? void 0 : sessionTime.created,
            updated: sessionTime === null || sessionTime === void 0 ? void 0 : sessionTime.updated,
        },
    };
}
function search(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var store_1, storedSessions, sessionEntries, filteredSessions, queryLower_1, sessions, enhanced, error_1;
        var _this = this;
        var query = _b.query, k = _b.k, sessionId = _b.sessionId;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, stores_js_1.getSessionStore)()];
                case 1:
                    store_1 = _c.sent();
                    return [4 /*yield*/, store_1.getMostRecent(1000)];
                case 2:
                    storedSessions = _c.sent();
                    if (!(storedSessions === null || storedSessions === void 0 ? void 0 : storedSessions.length)) {
                        return [2 /*return*/, {
                                query: query,
                                results: [],
                                totalCount: 0,
                            }];
                    }
                    sessionEntries = storedSessions
                        .filter(function (entry) {
                        return entry.id &&
                            (entry.id.startsWith('session_') || entry.id.startsWith('session:')) &&
                            !entry.id.includes(':messages');
                    })
                        .map(function (entry) { return JSON.parse(entry.text); });
                    filteredSessions = sessionEntries;
                    if (query) {
                        queryLower_1 = query.toLowerCase();
                        filteredSessions = sessionEntries.filter(function (session) {
                            var _a, _b, _c, _d;
                            // Search in session title, description, and other text fields
                            return (((_a = session.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(queryLower_1)) ||
                                ((_b = session.description) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(queryLower_1)) ||
                                ((_c = session.id) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(queryLower_1)) ||
                                ((_d = session.agent) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(queryLower_1)));
                        });
                    }
                    if (sessionId) {
                        filteredSessions = filteredSessions.filter(function (session) { return session.id === sessionId; });
                    }
                    sessions = k ? filteredSessions.slice(0, k) : filteredSessions;
                    return [4 /*yield*/, Promise.all(sessions.map(function (session) { return __awaiter(_this, void 0, void 0, function () {
                            var messageKey, messageEntry, messages, error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        messageKey = "session:".concat(session.id, ":messages");
                                        return [4 /*yield*/, store_1.get(messageKey)];
                                    case 1:
                                        messageEntry = _a.sent();
                                        messages = [];
                                        if (messageEntry) {
                                            messages = JSON.parse(messageEntry.text);
                                        }
                                        return [2 /*return*/, SessionUtils_js_1.SessionUtils.createSessionInfo(sessionToSessionData(session), messages.length, undefined)];
                                    case 2:
                                        error_2 = _a.sent();
                                        console.error("Error processing session ".concat(session.id, ":"), error_2);
                                        return [2 /*return*/, __assign(__assign({}, SessionUtils_js_1.SessionUtils.createSessionInfo(sessionToSessionData(session), 0, undefined)), { error: 'Could not fetch messages' })];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 3:
                    enhanced = _c.sent();
                    return [2 /*return*/, {
                            query: query,
                            results: enhanced,
                            totalCount: enhanced.length,
                        }];
                case 4:
                    error_1 = _c.sent();
                    console.error('Error searching sessions:', error_1);
                    return [2 /*return*/, {
                            error: "Failed to search sessions: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)),
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=search.js.map