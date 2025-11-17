/**
 * Test helpers for mocking store initialization and other dependencies
 */
export declare class MockDualStoreManager {
    name: string;
    textType: string;
    timestampType: string;
    constructor(name: string, textType: string, timestampType: string);
    insert(): Promise<{
        id: string;
    }>;
    search(): Promise<{
        results: never[];
        total: number;
    }>;
    get(): Promise<null>;
    list(): Promise<never[]>;
}
export declare function mockInitializeStores(): Promise<Record<string, MockDualStoreManager>>;
export declare function mockCompileContext(_options: {
    texts: string[];
    limit?: number;
}): Promise<any[]>;
export declare function mockSearchAcrossStores(_query: string, _options?: {
    limit?: number;
    sessionId?: string;
    includeSessions?: boolean;
    includeMessages?: boolean;
    includeEvents?: boolean;
}): Promise<{
    sessions: never[];
    events: never[];
    messages: never[];
}>;
//# sourceMappingURL=test-helpers.d.ts.map