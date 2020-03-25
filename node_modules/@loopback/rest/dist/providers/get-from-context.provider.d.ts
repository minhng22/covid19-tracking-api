import { Context, Provider, BoundValue } from '@loopback/context';
import { GetFromContext } from '../types';
export declare class GetFromContextProvider implements Provider<GetFromContext> {
    protected context: Context;
    constructor(context: Context);
    value(): GetFromContext;
    action(key: string): Promise<BoundValue>;
}
