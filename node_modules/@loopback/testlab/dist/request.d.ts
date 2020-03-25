/// <reference types="node" />
import http, { IncomingMessage } from 'http';
import https from 'https';
/**
 * Async wrapper for making HTTP GET requests
 * @param urlString
 */
export declare function httpGetAsync(urlString: string, agent?: http.Agent): Promise<IncomingMessage>;
/**
 * Async wrapper for making HTTPS GET requests
 * @param urlString
 */
export declare function httpsGetAsync(urlString: string, agent?: https.Agent): Promise<IncomingMessage>;
