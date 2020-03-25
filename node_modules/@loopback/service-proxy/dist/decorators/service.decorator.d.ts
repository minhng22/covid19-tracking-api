import { MetadataAccessor, InjectionMetadata } from '@loopback/context';
import { juggler } from '..';
/**
 * Type definition for decorators returned by `@serviceProxy` decorator factory
 */
export declare type ServiceProxyDecorator = PropertyDecorator | ParameterDecorator;
export declare const SERVICE_PROXY_KEY: MetadataAccessor<string, ServiceProxyDecorator>;
/**
 * Metadata for a service proxy
 */
export declare class ServiceProxyMetadata implements InjectionMetadata {
    decorator: string;
    dataSourceName?: string;
    dataSource?: juggler.DataSource;
    constructor(dataSource: string | juggler.DataSource);
}
export declare function serviceProxy(dataSource: string | juggler.DataSource): (target: object, key: string, parameterIndex?: number | undefined) => void;
