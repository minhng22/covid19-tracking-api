import HttpErrors from 'http-errors';
export declare namespace RestHttpErrors {
    function invalidData<T, Props extends object = {}>(data: T, name: string, extraProperties?: Props): HttpErrors.HttpError & Props;
    function unsupportedMediaType(contentType: string, allowedTypes?: string[]): HttpErrors.HttpError & {
        code: string;
        contentType: string;
        allowedMediaTypes: string[];
    };
    function missingRequired(name: string): HttpErrors.HttpError;
    function invalidParamLocation(location: string): HttpErrors.HttpError;
    const INVALID_REQUEST_BODY_MESSAGE = "The request body is invalid. See error object `details` property for more info.";
    function invalidRequestBody(): HttpErrors.HttpError;
    /**
     * An invalid request body error contains a `details` property as the machine-readable error.
     * Each entry in `error.details` contains 4 attributes: `path`, `code`, `info` and `message`.
     * `ValidationErrorDetails` defines the type of each entry, which is an object.
     * The type of `error.details` is `ValidationErrorDetails[]`.
     */
    interface ValidationErrorDetails {
        /**
         * A path to the invalid field.
         */
        path: string;
        /**
         * A single word code represents the error's type.
         */
        code: string;
        /**
         * A human readable description of the error.
         */
        message: string;
        /**
         * Some additional details that the 3 attributes above don't cover.
         */
        info: object;
    }
}
