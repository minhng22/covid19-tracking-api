import { Type } from './type';
/**
 * Date type
 */
export declare class DateType implements Type<Date> {
    readonly name = "date";
    isInstance(value: any): boolean;
    isCoercible(value: any): boolean;
    defaultValue(): Date;
    coerce(value: any): any;
    serialize(value: Date | null | undefined): string | null | undefined;
}
