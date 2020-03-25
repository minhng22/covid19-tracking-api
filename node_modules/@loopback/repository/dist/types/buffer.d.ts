/// <reference types="node" />
import { Options } from '../common-types';
import { Type } from './type';
/**
 * Buffer (binary) type
 */
export declare class BufferType implements Type<Buffer> {
    readonly name = "buffer";
    isInstance(value: any): boolean;
    defaultValue(): Buffer;
    isCoercible(value: any): boolean;
    coerce(value: any, options?: Options): any;
    serialize(value: Buffer | null | undefined, options?: Options): string | null | undefined;
}
