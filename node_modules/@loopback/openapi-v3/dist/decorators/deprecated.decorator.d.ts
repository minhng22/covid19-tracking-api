/**
 * Marks an api path as deprecated.  When applied to a class, this decorator
 * marks all paths as deprecated.
 *
 * You can optionally mark all controllers in a class as deprecated, but use
 * `@deprecated(false)` on a specific method to ensure it is not marked
 * as deprecated in the specification.
 *
 * @param isDeprecated - whether or not the path should be marked as deprecated.
 *        This is useful for marking a class as deprecated, but a method as
 *        not deprecated.
 *
 * @example
 * ```ts
 * @oas.deprecated()
 * class MyController {
 *   @get('/greet')
 *   public async function greet() {
 *     return 'Hello, World!'
 *   }
 *
 *   @get('/greet-v2')
 *   @oas.deprecated(false)
 *   public async function greetV2() {
 *     return 'Hello, World!'
 *   }
 * }
 *
 * class MyOtherController {
 *   @get('/echo')
 *   public async function echo() {
 *     return 'Echo!'
 *   }
 * }
 * ```
 */
export declare function deprecated(isDeprecated?: boolean): (target: any, method?: string | undefined, methodDescriptor?: TypedPropertyDescriptor<any> | undefined) => any;
