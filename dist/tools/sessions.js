"use strict";
// SPDX-License-Identifier: GPL-3.0-only
// Session lifecycle tool builders shared across Session Orchestrator variants
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
exports.createSessionTools = createSessionTools;
var tool_1 = require("@opencode-ai/plugin/tool");
var list_js_1 = require("../actions/sessions/list.js");
var get_js_1 = require("../actions/sessions/get.js");
var close_js_1 = require("../actions/sessions/close.js");
var spawn_js_1 = require("../actions/sessions/spawn.js");
var search_js_1 = require("../actions/sessions/search.js");
var formatters_js_1 = require("../shared/formatters.js");
var indexer_formatters_js_1 = require("../services/indexer-formatters.js");
var validation_js_1 = require("../utils/validation.js");
function createSessionTools(opencodeClient) {
    return {
        'list-sessions': (0, tool_1.tool)({
            description: 'List all active OpenCode sessions with pagination and filtering',
            args: {
                limit: tool_1.tool.schema.number().default(20).describe('Number of sessions to return'),
                offset: tool_1.tool.schema.number().default(0).describe('Number of sessions to skip'),
            },
            execute: function (args) {
                return __awaiter(this, void 0, void 0, function () {
                    var limit, offset, result, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                limit = validation_js_1.validate.limit(args.limit, 20);
                                offset = validation_js_1.validate.number(args.offset || 0, 'offset');
                                return [4 /*yield*/, (0, list_js_1.list)({
                                        limit: limit,
                                        offset: offset,
                                    })];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, (0, formatters_js_1.formatSessionsList)(result)];
                            case 2:
                                error_1 = _a.sent();
                                throw new Error("Failed to list sessions: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        }),
        'get-session': (0, tool_1.tool)({
            description: 'Get detailed information about a specific session',
            args: {
                sessionId: tool_1.tool.schema.string().describe('Session ID to retrieve'),
                limit: tool_1.tool.schema.number().optional().describe('Number of messages to include'),
                offset: tool_1.tool.schema.number().optional().describe('Number of messages to skip'),
            },
            execute: function (args) {
                return __awaiter(this, void 0, void 0, function () {
                    var sessionId, limit, offset, result, output_1, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                sessionId = validation_js_1.validate.sessionId(args.sessionId);
                                limit = args.limit !== undefined ? validation_js_1.validate.number(args.limit, 'limit') : undefined;
                                offset = args.offset !== undefined ? validation_js_1.validate.number(args.offset, 'offset') : undefined;
                                return [4 /*yield*/, (0, get_js_1.get)({ sessionId: sessionId, limit: limit, offset: offset })];
                            case 1:
                                result = _a.sent();
                                output_1 = "# Session Details\n\n";
                                if ('error' in result) {
                                    output_1 += "Error: ".concat(result.error, "\n");
                                }
                                else if (result.session && typeof result.session === 'object') {
                                    try {
                                        output_1 += (0, indexer_formatters_js_1.sessionToMarkdown)(result.session);
                                    }
                                    catch (error) {
                                        output_1 += "**Session Data:**\n";
                                        output_1 += "```json\n".concat(JSON.stringify(result.session, null, 2), "\n```\n");
                                    }
                                    if (result.messages && Array.isArray(result.messages)) {
                                        output_1 += "\n## Messages (".concat(result.messages.length, ")\n\n");
                                        result.messages.forEach(function (message) {
                                            try {
                                                output_1 += (0, indexer_formatters_js_1.messageToMarkdown)(message);
                                            }
                                            catch (error) {
                                                output_1 += "**Message:** ".concat(JSON.stringify(message).substring(0, 200), "...\n\n");
                                            }
                                        });
                                    }
                                }
                                else {
                                    output_1 += "**Session Data:**\n";
                                    output_1 += "```json\n".concat(JSON.stringify(result, null, 2), "\n```\n");
                                }
                                return [2 /*return*/, output_1];
                            case 2:
                                error_2 = _a.sent();
                                throw new Error("Failed to get session: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        }),
        'close-session': (0, tool_1.tool)({
            description: 'Close an active session',
            args: {
                sessionId: tool_1.tool.schema.string().describe('Session ID to close'),
            },
            execute: function (args) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, output, error_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, (0, close_js_1.close)({ sessionId: args.sessionId })];
                            case 1:
                                result = _a.sent();
                                output = "# Close Session Result\n\n";
                                output += "**Session ID:** ".concat(args.sessionId, "\n\n");
                                if ('error' in result) {
                                    output += "**Error:** ".concat(result.error, "\n");
                                }
                                else {
                                    output += "**Status:** Successfully closed\n";
                                    if (result.message) {
                                        output += "**Message:** ".concat(result.message, "\n");
                                    }
                                }
                                return [2 /*return*/, output];
                            case 2:
                                error_3 = _a.sent();
                                throw new Error("Failed to close session: ".concat(error_3 instanceof Error ? error_3.message : String(error_3)));
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        }),
        'spawn-session': (0, tool_1.tool)({
            description: 'Spawn a new session with an initial message',
            args: {
                title: tool_1.tool.schema.string().optional().describe('Optional title for the session'),
                message: tool_1.tool.schema.string().describe('Initial message/prompt for the session'),
            },
            execute: function (args) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, output, parsed, error_4;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, (0, spawn_js_1.spawn)({
                                        title: args.title,
                                        message: args.message,
                                        client: opencodeClient,
                                    })];
                            case 1:
                                result = _a.sent();
                                output = "# New Session Created\n\n";
                                if (typeof result === 'string') {
                                    try {
                                        parsed = JSON.parse(result);
                                        if (parsed.success && parsed.session) {
                                            output += "**Session ID:** ".concat(parsed.session.id || 'Unknown', "\n");
                                            output += "**Title:** ".concat(parsed.session.title || args.title || 'Untitled', "\n");
                                            output += "**Status:** Successfully created\n";
                                            output += "**Created:** ".concat(parsed.session.createdAt || 'Unknown', "\n");
                                            output += "**Initial Message:** ".concat(args.message, "\n");
                                        }
                                        else {
                                            output += result;
                                        }
                                    }
                                    catch (_b) {
                                        output += result;
                                    }
                                }
                                else if (result && typeof result === 'object' && 'error' in result) {
                                    output += "**Error:** ".concat(result.error, "\n");
                                }
                                else if (result && typeof result === 'object' && 'id' in result) {
                                    output += "**Session ID:** ".concat(result.id || 'Unknown', "\n");
                                    output += "**Title:** ".concat(args.title || 'Untitled', "\n");
                                    output += "**Status:** Successfully created\n";
                                    output += "**Initial Message:** ".concat(args.message, "\n");
                                }
                                else {
                                    output += "**Status:** Session creation initiated\n";
                                    output += "**Title:** ".concat(args.title || 'Untitled', "\n");
                                    output += "**Initial Message:** ".concat(args.message, "\n");
                                }
                                return [2 /*return*/, output];
                            case 2:
                                error_4 = _a.sent();
                                throw new Error("Failed to spawn session: ".concat(error_4 instanceof Error ? error_4.message : String(error_4)));
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        }),
        'search-sessions': (0, tool_1.tool)({
            description: 'Search for sessions by title, content, or metadata',
            args: {
                query: tool_1.tool.schema.string().describe('Search query'),
                k: tool_1.tool.schema.number().optional().describe('Maximum number of results'),
                sessionId: tool_1.tool.schema.string().optional().describe('Filter by session ID'),
            },
            execute: function (args) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, output_2, error_5;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, (0, search_js_1.search)({
                                        query: args.query,
                                        k: args.k,
                                        sessionId: args.sessionId,
                                    })];
                            case 1:
                                result = _a.sent();
                                output_2 = "# Session Search Results\n\n";
                                output_2 += "**Query:** ".concat(args.query, "\n\n");
                                if (Array.isArray(result)) {
                                    output_2 += "**Results:** ".concat(result.length, " sessions found\n\n");
                                    result.forEach(function (session) {
                                        try {
                                            output_2 += (0, indexer_formatters_js_1.sessionToMarkdown)(session);
                                        }
                                        catch (error) {
                                            output_2 += "**Session:** ".concat(JSON.stringify(session).substring(0, 200), "...\n\n");
                                        }
                                    });
                                }
                                else if (result && typeof result === 'object' && 'results' in result) {
                                    output_2 += "**Results:** ".concat(result.results.length, " sessions found\n\n");
                                    result.results.forEach(function (session) {
                                        try {
                                            output_2 += (0, indexer_formatters_js_1.sessionToMarkdown)(session);
                                        }
                                        catch (error) {
                                            output_2 += "**Session:** ".concat(JSON.stringify(session).substring(0, 200), "...\n\n");
                                        }
                                    });
                                }
                                else if (result && typeof result === 'object' && 'error' in result) {
                                    output_2 += "**Error:** ".concat(result.error, "\n");
                                }
                                else {
                                    output_2 += "**No results found**\n";
                                }
                                return [2 /*return*/, output_2];
                            case 2:
                                error_5 = _a.sent();
                                throw new Error("Failed to search sessions: ".concat(error_5 instanceof Error ? error_5.message : String(error_5)));
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        }),
    };
}
//# sourceMappingURL=sessions.js.map