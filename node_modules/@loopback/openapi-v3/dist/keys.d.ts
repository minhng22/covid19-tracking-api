import { MetadataAccessor } from '@loopback/core';
import { ControllerSpec, RestEndpoint } from './controller-spec';
import { ParameterObject, RequestBodyObject, ResponseDecoratorMetadata } from './types';
export declare namespace OAI3Keys {
    /**
     * Metadata key used to set or retrieve `@operation` metadata.
     */
    const METHODS_KEY: MetadataAccessor<Partial<RestEndpoint>, MethodDecorator>;
    /**
     * Metadata key used to set or retrieve `@deprecated` metadata on a method.
     */
    const DEPRECATED_METHOD_KEY: MetadataAccessor<boolean, MethodDecorator>;
    /**
     * Metadata key used to set or retrieve `@deprecated` metadata on a class
     */
    const DEPRECATED_CLASS_KEY: MetadataAccessor<boolean, ClassDecorator>;
    const RESPONSE_METHOD_KEY: MetadataAccessor<ResponseDecoratorMetadata, MethodDecorator>;
    /**
     * Metadata key used to set or retrieve `param` decorator metadata
     */
    const PARAMETERS_KEY: MetadataAccessor<ParameterObject, ParameterDecorator>;
    /**
     * Metadata key used to set or retrieve `@deprecated` metadata on a method.
     */
    const TAGS_METHOD_KEY: MetadataAccessor<string[], MethodDecorator>;
    /**
     * Metadata key used to set or retrieve `@deprecated` metadata on a class
     */
    const TAGS_CLASS_KEY: MetadataAccessor<string[], ClassDecorator>;
    /**
     * Metadata key used to set or retrieve `@api` metadata
     */
    const CLASS_KEY: MetadataAccessor<ControllerSpec, ClassDecorator>;
    /**
     * Metadata key used to set or retrieve a controller spec
     */
    const CONTROLLER_SPEC_KEY: MetadataAccessor<ControllerSpec, ClassDecorator>;
    /**
     * Metadata key used to set or retrieve `@requestBody` metadata
     */
    const REQUEST_BODY_KEY: MetadataAccessor<RequestBodyObject, ParameterDecorator>;
}
