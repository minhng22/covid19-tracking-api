"use strict";
// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
/**
 * Model type
 */
class ModelType extends object_1.ObjectType {
    constructor(modelClass) {
        super(modelClass);
        this.modelClass = modelClass;
        this.name = 'model';
    }
    serialize(value) {
        if (value == null)
            return value;
        return value.toJSON();
    }
}
exports.ModelType = ModelType;
//# sourceMappingURL=model.js.map