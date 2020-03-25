export declare function toJSON(value: Date): string;
export declare function toJSON(value: Function): undefined;
export declare function toJSON(value: unknown[]): unknown[];
/**
 * JSON encoding does not preserve properties that are undefined
 * As a result, deepEqual checks fail because the expected model
 * value contains these undefined property values, while the actual
 * result returned by REST API does not.
 * Use this function to convert a model instance into a data object
 * as returned by REST API
 */
export declare function toJSON(value: object): object;
export declare function toJSON(value: undefined): undefined;
export declare function toJSON(value: null): null;
export declare function toJSON(value: number): number;
export declare function toJSON(value: boolean): boolean;
export declare function toJSON(value: string): string;
export declare function toJSON(value: unknown[] | null): unknown[] | null;
export declare function toJSON(value: unknown[] | undefined): unknown[] | undefined;
export declare function toJSON(value: unknown[] | null | undefined): unknown[] | null | undefined;
export declare function toJSON(value: object | null): object | null;
export declare function toJSON(value: object | undefined): object | undefined;
export declare function toJSON(value: object | null | undefined): object | null | undefined;
