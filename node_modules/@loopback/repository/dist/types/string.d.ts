import { Type } from './type';
/**
 * String type
 */
export declare class StringType implements Type<string> {
    readonly name = "string";
    isInstance(value: any): boolean;
    isCoercible(value: any): boolean;
    defaultValue(): string;
    coerce(value: any): string;
    serialize(value: string | null | undefined): string | null | undefined;
}
