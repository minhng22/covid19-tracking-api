import { Entity, EntityResolver } from '../../model';
import { HasOneDefinition } from '../relation.types';
export declare function hasOne<T extends Entity>(targetResolver: EntityResolver<T>, definition?: Partial<HasOneDefinition>): (decoratedTarget: object, key: string) => void;
