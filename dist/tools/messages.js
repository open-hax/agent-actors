"use strict";
// SPDX-License-Identifier: GPL-3.0-only
// Message tooling shared across Session Orchestrator plugins
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
exports.createReadOnlyMessageTools = createReadOnlyMessageTools;
exports.createMessageMutationTools = createMessageMutationTools;
var tool_1 = require("@opencode-ai/plugin/tool");
var index_js_1 = require("../actions/messages/index.js");
var formatters_js_1 = require("../shared/formatters.js");
function createReadOnlyMessageTools(opencodeClient) {
    return {
        'list-messages': (0, tool_1.tool)({
            description: 'List messages for a specific session',
            args: {
                sessionId: tool_1.tool.schema.string().describe('Session ID'),
                limit: tool_1.tool.schema.number().default(10).describe('Number of messages to return'),
            },
            execute: function (args) {
                return __awaiter(this, void 0, void 0, function () {
                    var messages, limitedMessages, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, (0, index_js_1.getSessionMessages)(opencodeClient, args.sessionId)];
                            case 1:
                                messages = _a.sent();
                                limitedMessages = messages.slice(-args.limit);
                                return [2 /*return*/, (0, formatters_js_1.formatMessagesList)(limitedMessages, args.sessionId)];
                            case 2:
                                error_1 = _a.sent();
                                throw new Error("Failed to list messages: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        }),
        'get-message': (0, tool_1.tool)({
            description: 'Get a specific message from a session',
            args: {
                sessionId: tool_1.tool.schema.string().describe('Session ID'),
                messageId: tool_1.tool.schema.string().describe('Message ID'),
            },
            execute: function (args) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, output, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, opencodeClient.session.message({
                                        path: { id: args.sessionId, messageID: args.messageId },
                                    })];
                            case 1:
                                result = _a.sent();
                                output = "# Message Details\n\n";
                                output += "**Session ID:** ".concat(args.sessionId, "\n");
                                output += "**Message ID:** ".concat(args.messageId, "\n\n");
                                if (result.data) {
                                    output += "```json\n".concat(JSON.stringify(result.data, null, 2), "\n```\n");
                                }
                                else {
                                    output += "No message data found.\n";
                                }
                                return [2 /*return*/, output];
                            case 2:
                                error_2 = _a.sent();
                                throw new Error("Failed to get message: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        }),
    };
}
function createMessageMutationTools(opencodeClient) {
    return {
        'send-prompt': (0, tool_1.tool)({
            description: 'Send a prompt/message to a session',
            args: {
                sessionId: tool_1.tool.schema.string().describe('Session ID'),
                content: tool_1.tool.schema.string().describe('Message content'),
            },
            execute: function (args) {
                return __awaiter(this, void 0, void 0, function () {
                    var result, output, error_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, opencodeClient.session.prompt({
                                        path: { id: args.sessionId },
                                        body: {
                                            parts: [
                                                {
                                                    type: 'text',
                                                    text: args.content,
                                                },
                                            ],
                                        },
                                    })];
                            case 1:
                                result = _a.sent();
                                output = "# Message Sent\n\n";
                                output += "**Session ID:** ".concat(args.sessionId, "\n");
                                output += "**Content:** ".concat(args.content, "\n\n");
                                if (result.data) {
                                    output += "**Response:**\n";
                                    output += "```json\n".concat(JSON.stringify(result.data, null, 2), "\n```\n");
                                }
                                else {
                                    output += "Message sent successfully.\n";
                                }
                                return [2 /*return*/, output];
                            case 2:
                                error_3 = _a.sent();
                                return [2 /*return*/, "Failed to send prompt: ".concat(error_3 instanceof Error ? error_3.message : String(error_3))];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        }),
    };
}
//# sourceMappingURL=messages.js.map