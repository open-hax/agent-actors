// SPDX-License-Identifier: GPL-3.0-only
/**
 * Test helpers for mocking store initialization and other dependencies
 */
// Mock store manager for testing
export class MockDualStoreManager {
    name;
    textType;
    timestampType;
    constructor(name, textType, timestampType) {
        this.name = name;
        this.textType = textType;
        this.timestampType = timestampType;
    }
    async insert() {
        return { id: 'mock-id' };
    }
    async search() {
        return {
            results: [],
            total: 0,
        };
    }
    async get() {
        return null;
    }
    async list() {
        return [];
    }
}
// Mock the initializeStores function
export async function mockInitializeStores() {
    console.log('🔧 Using mock stores for testing...');
    return {
        sessions: new MockDualStoreManager('sessions', 'text', 'timestamp'),
        events: new MockDualStoreManager('events', 'text', 'timestamp'),
        messages: new MockDualStoreManager('messages', 'text', 'timestamp'),
    };
}
// Mock the compileContext function
export async function mockCompileContext(_options) {
    return [];
}
// Mock the searchAcrossStores function
export async function mockSearchAcrossStores(_query, _options = {}) {
    return {
        sessions: [],
        events: [],
        messages: [],
    };
}
//# sourceMappingURL=test-helpers.js.map