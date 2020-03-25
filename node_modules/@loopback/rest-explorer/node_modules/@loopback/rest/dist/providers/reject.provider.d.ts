import { LogError, Reject, HandlerContext } from '../types';
import { Provider } from '@loopback/context';
import { ErrorWriterOptions } from 'strong-error-handler';
export declare class RejectProvider implements Provider<Reject> {
    protected logError: LogError;
    protected errorWriterOptions?: ErrorWriterOptions | undefined;
    constructor(logError: LogError, errorWriterOptions?: ErrorWriterOptions | undefined);
    value(): Reject;
    action({ request, response }: HandlerContext, error: Error): void;
}
