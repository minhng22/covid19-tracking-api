import legacy from 'loopback-datasource-juggler';
export declare namespace juggler {
    export import DataSource = legacy.DataSource;
}
/**
 * A generic service interface with any number of methods that return a promise
 */
export interface GenericService {
    [methodName: string]: (...args: any[]) => Promise<any>;
}
/**
 * Get a service proxy from a LoopBack 3.x data source backed by
 * service-oriented connectors such as `rest`, `soap`, and `grpc`.
 *
 * @param ds - A legacy data source
 * @typeParam T - The generic type of service interface
 */
export declare function getService<T = GenericService>(ds: legacy.DataSource): Promise<T>;
