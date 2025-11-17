export interface SearchResultsSummary {
    totalSessions: number;
    totalEvents: number;
    totalMessages: number;
}
export interface SearchResultsPayload {
    sessions: any[];
    events: any[];
    messages: any[];
    query: string;
    summary: SearchResultsSummary;
}
export declare function formatSearchResults(results: SearchResultsPayload): string;
export declare function formatSessionsList(result: any): string;
export declare function formatEventsList(events: any[]): string;
export declare function formatMessagesList(messages: any[], sessionId: string): string;
//# sourceMappingURL=formatters.d.ts.map