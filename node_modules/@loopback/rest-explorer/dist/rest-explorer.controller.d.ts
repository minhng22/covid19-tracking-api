import { OpenApiSpecForm, RequestContext, RestServer } from '@loopback/rest';
import { RestExplorerConfig } from './rest-explorer.types';
export declare class ExplorerController {
    private serverBasePath;
    private restServer;
    private requestContext;
    static readonly OPENAPI_RELATIVE_URL = "openapi.json";
    static readonly OPENAPI_FORM: OpenApiSpecForm;
    private openApiSpecUrl;
    private useSelfHostedSpec;
    constructor(restConfig: (Partial<import("@loopback/rest").RestServerResolvedOptions> & import("@loopback/http-server").HttpOptions) | (Partial<import("@loopback/rest").RestServerResolvedOptions> & import("@loopback/http-server").HttpsOptions) | undefined, explorerConfig: RestExplorerConfig | undefined, serverBasePath: string, restServer: RestServer, requestContext: RequestContext);
    indexRedirect(): void;
    index(): void;
    spec(): import("@loopback/rest").OpenAPIObject;
    private getOpenApiSpecUrl;
}
