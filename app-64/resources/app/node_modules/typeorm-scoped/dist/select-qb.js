"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectQB = exports.GET_QUERY_COPY = void 0;
const typeorm_1 = require("typeorm");
exports.GET_QUERY_COPY = '___scope_getQuery_copy___';
class SelectQB extends typeorm_1.SelectQueryBuilder {
    getQuery() {
        this.___patchScopes___();
        return this[exports.GET_QUERY_COPY]();
    }
    ___patchScopes___() {
        for (const table of this.expressionMap.aliases) {
            if (!table || !table.hasMetadata)
                continue;
            const metadata = table.metadata
                .tableMetadataArgs;
            // default scopes functional
            if (metadata.defaultScopes) {
                for (const defaultScopeObj of Object.values(metadata.defaultScopes)) {
                    if (defaultScopeObj.enabled) {
                        defaultScopeObj.scopeFunc(this, table.name);
                    }
                    else {
                        defaultScopeObj.enabled = true;
                    }
                }
            }
            // custom scopes functional
            if (metadata.scopes) {
                for (const scopeObj of Object.values(metadata.scopes)) {
                    if (scopeObj.enabled) {
                        scopeObj.scopeFunc(this, table.name, scopeObj.context || {});
                        scopeObj.enabled = false;
                    }
                }
            }
        }
    }
}
exports.SelectQB = SelectQB;
//# sourceMappingURL=select-qb.js.map