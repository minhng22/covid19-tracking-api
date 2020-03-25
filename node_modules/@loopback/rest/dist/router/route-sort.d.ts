import { RouteEntry } from './route-entry';
/**
 * Compare two routes by verb/path for sorting
 * @param route1 - First route entry
 * @param route2 - Second route entry
 */
export declare function compareRoute(route1: Pick<RouteEntry, 'verb' | 'path'>, route2: Pick<RouteEntry, 'verb' | 'path'>): number;
