export interface DatabaseConfig {
    initialize(): Promise<void>;
}