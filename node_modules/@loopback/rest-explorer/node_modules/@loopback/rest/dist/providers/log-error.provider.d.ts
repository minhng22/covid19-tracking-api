/// <reference types="express" />
import { Provider } from '@loopback/context';
import { LogError, Request } from '../types';
export declare class LogErrorProvider implements Provider<LogError> {
    value(): LogError;
    action(err: Error, statusCode: number, req: Request): void;
}
