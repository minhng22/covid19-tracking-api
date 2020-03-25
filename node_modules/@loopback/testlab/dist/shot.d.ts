/// <reference types="node" />
import express from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { Listener as ShotListener, RequestOptions as ShotRequestOptions, ResponseObject } from 'shot';
declare const inject: (dispatchFunc: ShotListener, options: ShotRequestOptions) => Promise<ResponseObject>;
export { inject, ShotRequestOptions };
export declare function stubServerRequest(options: ShotRequestOptions): IncomingMessage;
export declare type ShotCallback = (response: ResponseObject) => void;
export declare type ShotResponseCtor = new (request: IncomingMessage, onEnd: ShotCallback) => ServerResponse;
export declare function stubServerResponse(request: IncomingMessage, onEnd: ShotCallback): ServerResponse;
export declare type ObservedResponse = ResponseObject;
export interface HandlerContextStub {
    request: IncomingMessage;
    response: ServerResponse;
    result: Promise<ObservedResponse>;
}
export declare function stubHandlerContext(requestOptions?: ShotRequestOptions): HandlerContextStub;
export interface ExpressContextStub extends HandlerContextStub {
    app: express.Application;
    request: express.Request;
    response: express.Response;
    result: Promise<ObservedResponse>;
}
export declare function stubExpressContext(requestOptions?: ShotRequestOptions): ExpressContextStub;
