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
exports.compileContext = compileContext;
var stores_js_1 = require("./stores.js");
// This shuldn't be nessisary, there is already a compileContext function in @promethean-os/persistence
function compileContext() {
    return __awaiter(this, arguments, void 0, function (textsOrOptions) {
        var _i, options, recentLimit, queryLimit, limit, store, recentMessages, relevantMessages, allMessages, uniqueMessages, error_1;
        var _a, _b, _c, _d, _e, _f;
        if (textsOrOptions === void 0) { textsOrOptions = []; }
        var legacyArgs = [];
        for (_i = 1; _i < arguments.length; _i++) {
            legacyArgs[_i - 1] = arguments[_i];
        }
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (Array.isArray(textsOrOptions)) {
                        options = { texts: textsOrOptions };
                    }
                    else {
                        options = textsOrOptions;
                    }
                    recentLimit = (_b = (_a = options.recentLimit) !== null && _a !== void 0 ? _a : legacyArgs[0]) !== null && _b !== void 0 ? _b : 10;
                    queryLimit = (_d = (_c = options.queryLimit) !== null && _c !== void 0 ? _c : legacyArgs[1]) !== null && _d !== void 0 ? _d : 5;
                    limit = (_f = (_e = options.limit) !== null && _e !== void 0 ? _e : legacyArgs[2]) !== null && _f !== void 0 ? _f : 20;
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, (0, stores_js_1.getContextStore)()];
                case 2:
                    store = _g.sent();
                    return [4 /*yield*/, store.getMostRecent(recentLimit)];
                case 3:
                    recentMessages = _g.sent();
                    relevantMessages = [];
                    if (!(options.texts && options.texts.length > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, store.getMostRelevant(__spreadArray([], options.texts, true), queryLimit)];
                case 4:
                    relevantMessages = _g.sent();
                    _g.label = 5;
                case 5:
                    allMessages = __spreadArray(__spreadArray([], relevantMessages, true), recentMessages, true);
                    uniqueMessages = allMessages.filter(function (msg, index, arr) { return arr.findIndex(function (m) { return m.text === msg.text; }) === index; });
                    // Convert to Message format and limit results
                    return [2 /*return*/, uniqueMessages.slice(0, limit).map(function (entry) {
                            var _a;
                            return ({
                                id: entry.id,
                                role: ((_a = entry.metadata) === null || _a === void 0 ? void 0 : _a.role) || "user",
                                content: entry.text,
                                timestamp: entry.timestamp,
                            });
                        })];
                case 6:
                    error_1 = _g.sent();
                    console.error("Error compiling context:", error_1);
                    return [2 /*return*/, []];
                case 7: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=compileContext.js.map