import { Context } from '@loopback/context';
import { Application } from '@loopback/core';
import { Bootable, BootExecutionOptions, BootOptions } from './types';
/**
 * The Bootstrapper class provides the `boot` function that is responsible for
 * finding and executing the Booters in an application based on given options.
 *
 * NOTE: Bootstrapper should be bound as a SINGLETON so it can be cached as
 * it does not maintain any state of it's own.
 *
 * @param app - Application instance
 * @param projectRoot - The root directory of the project, relative to which all other paths are resolved
 * @param bootOptions - The BootOptions describing the conventions to be used by various Booters
 */
export declare class Bootstrapper {
    private app;
    private projectRoot;
    private bootOptions;
    constructor(app: Application & Bootable, projectRoot: string, bootOptions?: BootOptions);
    /**
     * Function is responsible for calling all registered Booter classes that
     * are bound to the Application instance. Each phase of an instance must
     * complete before the next phase is started.
     *
     * @param execOptions - Execution options for boot. These
     * determine the phases and booters that are run.
     * @param ctx - Optional Context to use to resolve bindings. This is
     * primarily useful when running app.boot() again but with different settings
     * (in particular phases) such as 'start' / 'stop'. Using a returned Context from
     * a previous boot call allows DI to retrieve the same instances of Booters previously
     * used as they are bound using a CONTEXT scope. This is important as Booter instances
     * may maintain state.
     */
    boot(execOptions?: BootExecutionOptions, ctx?: Context): Promise<Context>;
}
