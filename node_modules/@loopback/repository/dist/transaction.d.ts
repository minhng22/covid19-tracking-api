/**
 * Local transaction
 */
export interface Transaction {
    /**
     * Commit the transaction
     */
    commit(): Promise<void>;
    /**
     * Rollback the transaction
     */
    rollback(): Promise<void>;
    /**
     * Check if the transaction has an active connection
     */
    isActive(): boolean;
    /**
     * The transaction Identifier
     */
    id: string;
}
/**
 * Isolation level
 */
export declare enum IsolationLevel {
    READ_COMMITTED = "READ COMMITTED",
    READ_UNCOMMITTED = "READ UNCOMMITTED",
    SERIALIZABLE = "SERIALIZABLE",
    REPEATABLE_READ = "REPEATABLE READ"
}
