"use strict";
// SPDX-License-Identifier: GPL-3.0-only
// Context/search tool builders shared across Session Orchestrator variants
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
exports.createContextTools = createContextTools;
var tool_1 = require("@opencode-ai/plugin/tool");
var compileContext_js_1 = require("../compileContext.js");
var unified_store_js_1 = require("../services/unified-store.js");
var formatters_js_1 = require("../shared/formatters.js");
var indexer_formatters_js_1 = require("../services/indexer-formatters.js");
var validation_js_1 = require("../utils/validation.js");
function createContextTools() {
    return {
        'compile-context': (0, tool_1.tool)({
            description: 'Compile and search the complete context store (sessions, events, messages) with unified access',
            args: {
                query: tool_1.tool.schema.string().optional().describe('Search query to filter context'),
                includeSessions: tool_1.tool.schema
                    .boolean()
                    .default(true)
                    .describe('Include sessions in context'),
                includeEvents: tool_1.tool.schema.boolean().default(true).describe('Include events in context'),
                includeMessages: tool_1.tool.schema
                    .boolean()
                    .default(true)
                    .describe('Include messages in context'),
                sessionId: tool_1.tool.schema.string().optional().describe('Filter by specific session ID'),
                limit: tool_1.tool.schema.number().default(50).describe('Maximum results per type'),
            },
            execute: function (args) {
                return __awaiter(this, void 0, void 0, function () {
                    var query, limit, sessionId, context, output_1, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                query = validation_js_1.validate.searchQuery(args.query);
                                limit = validation_js_1.validate.limit(args.limit, 50);
                                sessionId = validation_js_1.validate.optionalString(args.sessionId, 'sessionId');
                                return [4 /*yield*/, (0, compileContext_js_1.compileContext)({
                                        texts: query ? [query] : [],
                                        limit: limit,
                                    })];
                            case 1:
                                context = _a.sent();
                                output_1 = "# Compiled Context\n\n";
                                output_1 += "**Query:** ".concat(query || 'No query', "\n");
                                output_1 += "**Session Filter:** ".concat(sessionId || 'All sessions', "\n\n");
                                if (Array.isArray(context)) {
                                    output_1 += "## Messages (".concat(context.length, ")\n\n");
                                    context.slice(0, limit).forEach(function (message) {
                                        try {
                                            output_1 += (0, indexer_formatters_js_1.messageToMarkdown)(message);
                                        }
                                        catch (error) {
                                            output_1 += "**Message:** ".concat(JSON.stringify(message).substring(0, 200), "...\n\n");
                                        }
                                    });
                                }
                                return [2 /*return*/, output_1];
                            case 2:
                                error_1 = _a.sent();
                                throw new Error("Failed to compile context: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        }),
        'search-context': (0, tool_1.tool)({
            description: 'Unified search across all OpenCode data (sessions, events, messages)',
            args: {
                query: tool_1.tool.schema.string().describe('Search query'),
                sessionId: tool_1.tool.schema.string().optional().describe('Filter by session ID'),
                limit: tool_1.tool.schema.number().default(20).describe('Maximum results per category'),
            },
            execute: function (args) {
                return __awaiter(this, void 0, void 0, function () {
                    var query, limit, sessionId, searchResults, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                query = validation_js_1.validate.string(args.query, 'query');
                                limit = validation_js_1.validate.limit(args.limit, 20);
                                sessionId = validation_js_1.validate.optionalString(args.sessionId, 'sessionId');
                                return [4 /*yield*/, (0, unified_store_js_1.searchAcrossStores)(query, {
                                        limit: limit,
                                        sessionId: sessionId,
                                        includeSessions: true,
                                        includeMessages: true,
                                        includeEvents: true,
                                    })];
                            case 1:
                                searchResults = _a.sent();
                                return [2 /*return*/, (0, formatters_js_1.formatSearchResults)({
                                        sessions: searchResults.sessions.map(function (entry) {
                                            var _a, _b;
                                            return (__assign({ id: ((_a = entry.metadata) === null || _a === void 0 ? void 0 : _a.sessionId) || entry.id, title: ((_b = entry.metadata) === null || _b === void 0 ? void 0 : _b.title) || 'Untitled Session' }, entry.metadata));
                                        }),
                                        events: searchResults.events.map(function (entry) {
                                            var _a;
                                            return (__assign({ id: entry.id, eventType: ((_a = entry.metadata) === null || _a === void 0 ? void 0 : _a.eventType) || 'unknown', timestamp: entry.timestamp, text: entry.text }, entry.metadata));
                                        }),
                                        messages: searchResults.messages.map(function (entry) {
                                            var _a, _b, _c;
                                            return (__assign({ id: ((_a = entry.metadata) === null || _a === void 0 ? void 0 : _a.messageId) || entry.id, sessionId: (_b = entry.metadata) === null || _b === void 0 ? void 0 : _b.sessionId, role: (_c = entry.metadata) === null || _c === void 0 ? void 0 : _c.role, text: entry.text, timestamp: entry.timestamp }, entry.metadata));
                                        }),
                                        query: query,
                                        summary: {
                                            totalSessions: searchResults.sessions.length,
                                            totalEvents: searchResults.events.length,
                                            totalMessages: searchResults.messages.length,
                                        },
                                    })];
                            case 2:
                                error_2 = _a.sent();
                                throw new Error("Failed to search context: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        }),
    };
}
//# sourceMappingURL=context.js.map