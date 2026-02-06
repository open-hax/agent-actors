"use strict";
// SPDX-License-Identifier: GPL-3.0-only
// Shared markdown formatters for Session Orchestrator tools
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSearchResults = formatSearchResults;
exports.formatSessionsList = formatSessionsList;
exports.formatEventsList = formatEventsList;
exports.formatMessagesList = formatMessagesList;
var indexer_formatters_js_1 = require("../services/indexer-formatters.js");
function formatSearchResults(results) {
    var output = "# Unified Search Results\n\n";
    output += "**Query:** ".concat(results.query, "\n\n");
    output += "## Summary\n";
    output += "- **Sessions:** ".concat(results.summary.totalSessions, "\n");
    output += "- **Events:** ".concat(results.summary.totalEvents, "\n");
    output += "- **Messages:** ".concat(results.summary.totalMessages, "\n\n");
    if (results.summary.totalSessions > 0) {
        output += "## Sessions (".concat(results.summary.totalSessions, ")\n\n");
        results.sessions.forEach(function (session) {
            try {
                output += (0, indexer_formatters_js_1.sessionToMarkdown)(session);
            }
            catch (error) {
                output += "**Session:** ".concat(JSON.stringify(session).substring(0, 200), "...\n\n");
            }
        });
    }
    if (results.summary.totalEvents > 0) {
        output += "## Events (".concat(results.summary.totalEvents, ")\n\n");
        results.events.forEach(function (event) {
            try {
                output += (0, indexer_formatters_js_1.eventToMarkdown)(event);
            }
            catch (error) {
                output += "**Event:** ".concat(JSON.stringify(event).substring(0, 200), "...\n\n");
            }
        });
    }
    if (results.summary.totalMessages > 0) {
        output += "## Messages (".concat(results.summary.totalMessages, ")\n\n");
        results.messages.forEach(function (message) {
            try {
                output += (0, indexer_formatters_js_1.messageToMarkdown)(message);
            }
            catch (error) {
                output += "**Message:** ".concat(JSON.stringify(message).substring(0, 200), "...\n\n");
            }
        });
    }
    return output;
}
function formatSessionsList(result) {
    if ('error' in result) {
        return "Error listing sessions: ".concat(result.error);
    }
    var sessions = result.sessions || [];
    var output = "# Active Sessions (".concat(sessions.length, ")\n\n");
    sessions.forEach(function (session) {
        try {
            output += (0, indexer_formatters_js_1.sessionToMarkdown)(session);
        }
        catch (error) {
            output += "**Session:** ".concat(JSON.stringify(session).substring(0, 200), "...\n\n");
        }
    });
    if (result.summary) {
        output += "## Summary\n";
        output += "- **Active:** ".concat(result.summary.active, "\n");
        output += "- **Waiting for Input:** ".concat(result.summary.waiting_for_input, "\n");
        output += "- **Idle:** ".concat(result.summary.idle, "\n");
        output += "- **Agent Tasks:** ".concat(result.summary.agentTasks, "\n\n");
    }
    if (result.pagination) {
        output += "## Pagination\n";
        output += "- **Page:** ".concat(result.pagination.currentPage, " / ").concat(result.pagination.totalPages, "\n");
        output += "- **Total:** ".concat(result.totalCount, " sessions\n");
        output += "- **Showing:** ".concat(result.pagination.limit, " per page\n");
    }
    return output;
}
function formatEventsList(events) {
    var output = "# Events (".concat(events.length, ")\n\n");
    events.forEach(function (event) {
        try {
            output += (0, indexer_formatters_js_1.eventToMarkdown)(event);
        }
        catch (error) {
            output += "**Event:** ".concat(JSON.stringify(event).substring(0, 200), "...\n\n");
        }
    });
    return output;
}
function formatMessagesList(messages, sessionId) {
    var output = "# Messages for Session ".concat(sessionId, " (").concat(messages.length, ")\n\n");
    messages.forEach(function (message) {
        try {
            output += (0, indexer_formatters_js_1.messageToMarkdown)(message);
        }
        catch (error) {
            output += "**Message:** ".concat(JSON.stringify(message).substring(0, 200), "...\n\n");
        }
    });
    return output;
}
//# sourceMappingURL=formatters.js.map