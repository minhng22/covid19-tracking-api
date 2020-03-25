import { RelationType, RelationMetadata } from '../relations';
export declare class InvalidRelationError<Props extends object = {}> extends Error {
    code: string;
    reason: string;
    relationName: string;
    relationType: RelationType;
    sourceModelName: string;
    constructor(reason: string, relationMeta: RelationMetadata, extraProperties?: Props);
}
export declare function isInvalidRelationError(e: any): e is InvalidRelationError<any>;
