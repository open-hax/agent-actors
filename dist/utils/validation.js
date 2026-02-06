"use strict";
// SPDX-License-Identifier: GPL-3.0-only
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
/**
 * Validation utilities for plugin inputs
 */
exports.validate = {
    /**
     * Validate a string parameter
     */
    string: function (value, paramName) {
        if (typeof value !== 'string') {
            throw new Error("Parameter '".concat(paramName, "' must be a string, received ").concat(typeof value));
        }
        return value;
    },
    /**
     * Validate an optional string parameter
     */
    optionalString: function (value, paramName) {
        if (value === undefined || value === null) {
            return undefined;
        }
        return exports.validate.string(value, paramName);
    },
    /**
     * Validate a number parameter
     */
    number: function (value, paramName) {
        if (typeof value !== 'number') {
            throw new Error("Parameter '".concat(paramName, "' must be a number, received ").concat(typeof value));
        }
        return value;
    },
    /**
     * Validate an optional number parameter with default
     */
    optionalNumber: function (value, paramName, defaultValue) {
        if (value === undefined || value === null) {
            return defaultValue;
        }
        return exports.validate.number(value, paramName);
    },
    /**
     * Validate a boolean parameter
     */
    boolean: function (value, paramName) {
        if (typeof value !== 'boolean') {
            throw new Error("Parameter '".concat(paramName, "' must be a boolean, received ").concat(typeof value));
        }
        return value;
    },
    /**
     * Validate an optional boolean parameter with default
     */
    optionalBoolean: function (value, paramName, defaultValue) {
        if (value === undefined || value === null) {
            return defaultValue;
        }
        return exports.validate.boolean(value, paramName);
    },
    /**
     * Validate a session ID format
     */
    sessionId: function (value) {
        if (value === undefined || value === null) {
            throw new Error('Session ID is required');
        }
        var sessionId = exports.validate.string(value, 'sessionId');
        if (sessionId.length === 0) {
            throw new Error('Session ID cannot be empty');
        }
        return sessionId;
    },
    /**
     * Validate search query
     */
    searchQuery: function (value) {
        if (value === undefined || value === null) {
            return '';
        }
        var query = exports.validate.string(value, 'query');
        if (query.length === 0) {
            throw new Error('Search query cannot be empty');
        }
        return query;
    },
    /**
     * Validate limit parameter with reasonable bounds
     */
    limit: function (value, defaultLimit) {
        if (defaultLimit === void 0) { defaultLimit = 20; }
        if (value === undefined || value === null) {
            return defaultLimit;
        }
        var limit = exports.validate.number(value, 'limit');
        if (limit <= 0) {
            throw new Error('Limit must be greater than 0');
        }
        if (limit > 1000) {
            throw new Error('Limit cannot exceed 1000');
        }
        return limit;
    },
};
//# sourceMappingURL=validation.js.map