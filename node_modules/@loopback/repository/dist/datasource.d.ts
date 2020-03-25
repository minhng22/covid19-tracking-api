import { AnyObject, Options } from './common-types';
import { Connector } from './connectors';
/**
 * DataSource denotes a configured connector
 */
export interface DataSource {
    name: string;
    connector?: Connector;
    settings: AnyObject;
    [property: string]: any;
}
export interface SchemaMigrationOptions extends Options {
    /**
     * When set to 'drop', schema migration will drop existing tables and recreate
     * them from scratch, removing any existing data along the way.
     *
     * When set to 'alter', schema migration will try to preserve current schema
     * and data, and perform a non-destructive incremental update.
     */
    existingSchema?: 'drop' | 'alter';
    /**
     * List of model names to migrate.
     *
     * By default, all models are migrated.
     */
    models?: string[];
}
