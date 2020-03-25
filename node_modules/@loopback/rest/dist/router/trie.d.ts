import { PathParameterValues } from '../types';
/**
 * A Node in the trie
 */
export interface Node<T> {
    /**
     * Key of the node
     */
    key: string;
    /**
     * Value of the node
     */
    value?: T;
    /**
     * Children of the node
     */
    readonly children: {
        [key: string]: Node<T>;
    };
    /**
     * Regular expression for the template
     */
    regexp?: RegExp;
    /**
     * Names of the node if it contains named parameters
     */
    names?: string[];
}
export declare type NodeWithValue<T> = Node<T> & {
    value: T;
};
export interface ResolvedNode<T> {
    node: Node<T>;
    params?: PathParameterValues;
}
/**
 * An implementation of trie for routes. The key hierarchy is built with parts
 * of the route path delimited by `/`
 */
export declare class Trie<T> {
    readonly root: Node<T>;
    /**
     * Create a node for a given path template
     * @param pathTemplate - The path template,
     * @param value - Value of the route
     */
    create(routeTemplate: string, value: T): Node<T>;
    /**
     * Match a route path against the trie
     * @param path - The route path, such as `/customers/c01`
     */
    match(path: string): (ResolvedNode<T> & {
        node: NodeWithValue<T>;
    }) | undefined;
    /**
     * List all nodes with value of the trie
     */
    list(): NodeWithValue<T>[];
}
