import { Context } from '@loopback/context';
import { OperationObject } from '@loopback/openapi-v3';
import { OperationArgs, OperationRetval } from '../types';
import { BaseRoute } from './base-route';
export declare class Route extends BaseRoute {
    readonly spec: OperationObject;
    protected readonly _handler: Function;
    constructor(verb: string, path: string, spec: OperationObject, _handler: Function);
    describe(): string;
    updateBindings(requestContext: Context): void;
    invokeHandler(requestContext: Context, args: OperationArgs): Promise<OperationRetval>;
}
