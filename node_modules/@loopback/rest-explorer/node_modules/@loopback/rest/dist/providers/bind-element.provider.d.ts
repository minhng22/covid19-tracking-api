import { Context, Provider, Binding } from '@loopback/context';
import { BindElement } from '../types';
export declare class BindElementProvider implements Provider<BindElement> {
    protected context: Context;
    constructor(context: Context);
    value(): BindElement;
    action(key: string): Binding;
}
