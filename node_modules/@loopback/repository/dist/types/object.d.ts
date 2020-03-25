import { AnyObject, Class } from '../common-types';
import { Type } from './type';
/**
 * Object type
 */
export declare class ObjectType<T extends AnyObject> implements Type<T> {
    type: Class<T>;
    name: string;
    constructor(type: Class<T>);
    isInstance(value: any): boolean;
    isCoercible(value: any): boolean;
    defaultValue(): T;
    coerce(value: any): any;
    serialize(value: T | null | undefined): any;
}
