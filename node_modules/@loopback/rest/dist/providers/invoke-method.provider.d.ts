import { Context, Provider } from '@loopback/context';
import { InvokeMethod, OperationArgs, OperationRetval } from '../types';
import { RouteEntry } from '../router';
export declare class InvokeMethodProvider implements Provider<InvokeMethod> {
    protected context: Context;
    constructor(context: Context);
    value(): InvokeMethod;
    action(route: RouteEntry, args: OperationArgs): Promise<OperationRetval>;
}
