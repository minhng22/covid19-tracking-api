import { Class } from '../common-types';
import { Model } from '../model';
import { ObjectType } from './object';
/**
 * Model type
 */
export declare class ModelType<T extends Model> extends ObjectType<T> {
    modelClass: Class<T>;
    readonly name: string;
    constructor(modelClass: Class<T>);
    serialize(value: T | null | undefined): Object | null | undefined;
}
