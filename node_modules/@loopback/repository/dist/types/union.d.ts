import { Type } from './type';
/**
 * Union type, such as string | number
 */
export declare class UnionType implements Type<any> {
    itemTypes: Type<any>[];
    constructor(itemTypes: Type<any>[]);
    readonly name = "union";
    isInstance(value: any): boolean;
    isCoercible(value: any): boolean;
    defaultValue(): any;
    coerce(value: any): any;
    serialize(value: any): any;
}
