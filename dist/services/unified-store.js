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
exports.searchAcrossStores = exports.messageStoreAccess = exports.eventStoreAccess = exports.sessionStoreAccess = void 0;
var stores_js_1 = require("../stores.js");
// Simple store access wrappers for indexer operations
exports.sessionStoreAccess = {
    insert: function (entry) { return __awaiter(void 0, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, stores_js_1.getSessionStore)()];
                case 1:
                    store = _a.sent();
                    return [4 /*yield*/, store.insert(entry)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, entry.id || 'generated-id'];
            }
        });
    }); },
    getMostRecent: function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (limit) {
            var store;
            if (limit === void 0) { limit = 20; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, stores_js_1.getSessionStore)()];
                    case 1:
                        store = _a.sent();
                        return [4 /*yield*/, store.getMostRecent(limit)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    getMostRelevant: function (queries_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([queries_1], args_1, true), void 0, function (queries, limit) {
            var store;
            if (limit === void 0) { limit = 20; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, stores_js_1.getSessionStore)()];
                    case 1:
                        store = _a.sent();
                        return [4 /*yield*/, store.getMostRelevant(queries, limit)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
};
exports.eventStoreAccess = {
    insert: function (entry) { return __awaiter(void 0, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, stores_js_1.getEventStore)()];
                case 1:
                    store = _a.sent();
                    return [4 /*yield*/, store.insert(entry)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, entry.id || 'generated-id'];
            }
        });
    }); },
    getMostRecent: function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (limit) {
            var store;
            if (limit === void 0) { limit = 20; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, stores_js_1.getEventStore)()];
                    case 1:
                        store = _a.sent();
                        return [4 /*yield*/, store.getMostRecent(limit)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    getMostRelevant: function (queries_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([queries_1], args_1, true), void 0, function (queries, limit) {
            var store;
            if (limit === void 0) { limit = 20; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, stores_js_1.getEventStore)()];
                    case 1:
                        store = _a.sent();
                        return [4 /*yield*/, store.getMostRelevant(queries, limit)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
};
exports.messageStoreAccess = {
    insert: function (entry) { return __awaiter(void 0, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, stores_js_1.getMessageStore)()];
                case 1:
                    store = _a.sent();
                    return [4 /*yield*/, store.insert(entry)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, entry.id || 'generated-id'];
            }
        });
    }); },
    getMostRecent: function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (limit) {
            var store;
            if (limit === void 0) { limit = 20; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, stores_js_1.getMessageStore)()];
                    case 1:
                        store = _a.sent();
                        return [4 /*yield*/, store.getMostRecent(limit)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    getMostRelevant: function (queries_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([queries_1], args_1, true), void 0, function (queries, limit) {
            var store;
            if (limit === void 0) { limit = 20; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, stores_js_1.getMessageStore)()];
                    case 1:
                        store = _a.sent();
                        return [4 /*yield*/, store.getMostRelevant(queries, limit)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
};
/**
 * Search across multiple stores with unified interface
 */
var searchAcrossStores = function (query_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([query_1], args_1, true), void 0, function (query, options) {
        var _a, limit, sessionId, _b, includeSessions, _c, includeMessages, _d, includeEvents, searchPromises, results, sessions, messages, events, resultIndex;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = options.limit, limit = _a === void 0 ? 20 : _a, sessionId = options.sessionId, _b = options.includeSessions, includeSessions = _b === void 0 ? true : _b, _c = options.includeMessages, includeMessages = _c === void 0 ? true : _c, _d = options.includeEvents, includeEvents = _d === void 0 ? true : _d;
                    searchPromises = [];
                    if (includeSessions) {
                        searchPromises.push(exports.sessionStoreAccess.getMostRelevant([query], limit).catch(function () { return []; }));
                    }
                    if (includeMessages) {
                        searchPromises.push(exports.messageStoreAccess.getMostRelevant([query], limit).catch(function () { return []; }));
                    }
                    if (includeEvents) {
                        searchPromises.push(exports.eventStoreAccess.getMostRelevant([query], limit).catch(function () { return []; }));
                    }
                    return [4 /*yield*/, Promise.all(searchPromises)];
                case 1:
                    results = _e.sent();
                    sessions = [];
                    messages = [];
                    events = [];
                    resultIndex = 0;
                    if (includeSessions) {
                        sessions = results[resultIndex++] || [];
                    }
                    if (includeMessages) {
                        messages = results[resultIndex++] || [];
                    }
                    if (includeEvents) {
                        events = results[resultIndex++] || [];
                    }
                    // Filter by sessionId if provided
                    if (sessionId) {
                        sessions = sessions.filter(function (entry) { var _a; return ((_a = entry.metadata) === null || _a === void 0 ? void 0 : _a.sessionId) === sessionId; });
                        messages = messages.filter(function (entry) { var _a; return ((_a = entry.metadata) === null || _a === void 0 ? void 0 : _a.sessionId) === sessionId; });
                        events = events.filter(function (entry) { var _a; return ((_a = entry.metadata) === null || _a === void 0 ? void 0 : _a.sessionId) === sessionId; });
                    }
                    return [2 /*return*/, { sessions: sessions, messages: messages, events: events }];
            }
        });
    });
};
exports.searchAcrossStores = searchAcrossStores;
//# sourceMappingURL=unified-store.js.map