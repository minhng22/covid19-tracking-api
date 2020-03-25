import { Type } from './type';
/**
 * Any type
 */
export declare class AnyType implements Type<any> {
    readonly name = "any";
    isInstance(value: any): boolean;
    isCoercible(value: any): boolean;
    defaultValue(): any;
    coerce(value: any): any;
    serialize(value: any): any;
}
