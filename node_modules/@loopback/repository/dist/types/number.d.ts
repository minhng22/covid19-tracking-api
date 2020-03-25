import { Type } from './type';
/**
 * Number type
 */
export declare class NumberType implements Type<number> {
    readonly name = "number";
    isInstance(value: any): boolean;
    isCoercible(value: any): boolean;
    defaultValue(): number;
    coerce(value: any): any;
    serialize(value: number | null | undefined): number | null | undefined;
}
