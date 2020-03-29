import { ParameterObject } from '@loopback/openapi-v3';
/**
 * A set of options to pass into the validator functions
 */
export declare type ValidationOptions = {
    required?: boolean;
};
/**
 * The context information that a validator needs
 */
export declare type ValidationContext = {
    parameterSpec: ParameterObject;
};
/**
 * Validator class provides a bunch of functions that perform
 * validations on the request parameters and request body.
 */
export declare class Validator {
    ctx: ValidationContext;
    constructor(ctx: ValidationContext);
    /**
     * The validation executed before type coercion. Like
     * checking absence.
     *
     * @param type - A parameter's type.
     * @param value - A parameter's raw value from http request.
     * @param opts - options
     */
    validateParamBeforeCoercion(value: string | object | undefined, opts?: ValidationOptions): void;
    /**
     * Check is a parameter required or not.
     *
     * @param opts
     */
    isRequired(opts?: ValidationOptions): boolean;
    /**
     * Return `true` if the value is empty, return `false` otherwise.
     *
     * @param value
     */
    isAbsent(value: any): boolean;
    /**
     * Return `true` if defined specification is for a url encoded Json object query parameter
     *
     * for url encoded Json object query parameters,
     * schema is defined under content['application/json']
     */
    isUrlEncodedJsonParam(): boolean;
}
