import { Entity } from '../model';
export declare class EntityNotFoundError<ID, Props extends object = {}> extends Error {
    code: string;
    entityName: string;
    entityId: ID;
    constructor(entityOrName: typeof Entity | string, entityId: ID, extraProperties?: Props);
}
export declare function isEntityNotFoundError(e: any): e is EntityNotFoundError<any>;
