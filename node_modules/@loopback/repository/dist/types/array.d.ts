import { Type } from './type';
/**
 * Array type, such as string[]
 */
export declare class ArrayType<T> implements Type<T[]> {
    itemType: Type<T>;
    constructor(itemType: Type<T>);
    readonly name = "array";
    isInstance(value: any): boolean;
    isCoercible(value: any): boolean;
    defaultValue(): T[];
    coerce(value: any): any;
    serialize(value: T[] | null | undefined): any[] | null | undefined;
}
