import { AnyObject, DataObject } from '../common-types';
import { Entity } from '../model';
import { Filter, Where } from '../query';
/**
 * A utility function which takes a filter and enforces constraint(s)
 * on it
 * @param originalFilter - the filter to apply the constrain(s) to
 * @param constraint - the constraint which is to be applied on the filter
 * @returns Filter the modified filter with the constraint, otherwise
 * the original filter
 */
export declare function constrainFilter<T extends object>(originalFilter: Filter<T> | undefined, constraint: AnyObject): Filter<T>;
/**
 * A utility function which takes a where filter and enforces constraint(s)
 * on it
 * @param originalWhere - the where filter to apply the constrain(s) to
 * @param constraint - the constraint which is to be applied on the filter
 * @returns Filter the modified filter with the constraint, otherwise
 * the original filter
 */
export declare function constrainWhere<T extends object>(originalWhere: Where<T> | undefined, constraint: Where<T>): Where<T>;
/**
 * A utility function which takes a model instance data and enforces constraint(s)
 * on it
 * @param originalData - the model data to apply the constrain(s) to
 * @param constraint - the constraint which is to be applied on the data object
 * @returns the modified data with the constraint, otherwise
 * the original instance data
 */
export declare function constrainDataObject<T extends Entity>(originalData: DataObject<T>, constraint: DataObject<T>): DataObject<T>;
/**
 * A utility function which takes an array of model instance data and
 * enforces constraint(s) on it
 * @param originalData - the array of model data to apply the constrain(s) to
 * @param constraint - the constraint which is to be applied on the data objects
 * @returns an array of the modified data with the constraint, otherwise
 * the original instance data array
 */
export declare function constrainDataObjects<T extends Entity>(originalData: DataObject<T>[], constraint: DataObject<T>): DataObject<T>[];
