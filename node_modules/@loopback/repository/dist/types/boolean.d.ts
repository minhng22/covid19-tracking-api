import { Type } from './type';
/**
 * Boolean type
 */
export declare class BooleanType implements Type<boolean> {
    readonly name = "boolean";
    isInstance(value: any): boolean;
    defaultValue(): boolean;
    isCoercible(value: any): boolean;
    coerce(value: any): any;
    serialize(value: boolean | null | undefined): boolean | null | undefined;
}
