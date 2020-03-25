/// <reference types="node" />
import http from 'http';
import supertest = require('supertest');
export { supertest };
export declare type Client = supertest.SuperTest<supertest.Test>;
/**
 * Create a SuperTest client connected to an HTTP server listening
 * on an ephemeral port and calling `handler` to handle incoming requests.
 * @param handler
 */
export declare function createClientForHandler(handler: (req: http.IncomingMessage, res: http.ServerResponse) => void): Client;
/**
 * Create a SuperTest client for a running RestApplication instance.
 * It is the responsibility of the caller to ensure that the app
 * is running and to stop the application after all tests are done.
 * @param app - A running (listening) instance of a RestApplication.
 */
export declare function createRestAppClient(app: RestApplicationLike): supertest.SuperTest<supertest.Test>;
export interface RestApplicationLike {
    restServer: RestServerLike;
}
export interface RestServerLike {
    url?: string;
    rootUrl?: string;
}
