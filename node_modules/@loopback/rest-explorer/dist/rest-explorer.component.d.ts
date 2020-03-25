import { Component } from '@loopback/core';
import { RestApplication } from '@loopback/rest';
import { RestExplorerConfig } from './rest-explorer.types';
/**
 * A component providing a self-hosted API Explorer.
 */
export declare class RestExplorerComponent implements Component {
    private application;
    constructor(application: RestApplication, restExplorerConfig?: RestExplorerConfig);
    private registerControllerRoute;
}
