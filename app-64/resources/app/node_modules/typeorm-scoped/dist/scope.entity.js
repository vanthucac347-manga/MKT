"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeEntity = void 0;
const typeorm_1 = require("typeorm");
class ScopeEntity extends typeorm_1.BaseEntity {
    static scoped(scope, context = {}) {
        // scopes = [...new Set(scopes)];
        const table = (0, typeorm_1.getMetadataArgsStorage)().tables.find((table) => table.target === this.target);
        if (table && table.scopes) {
            // for (const scopeName of scopes) {
            //   if (table.scopes[scopeName]) {
            //     table.scopes[scopeName].enabled = true;
            //   }
            // }
            if (table.scopes[scope]) {
                table.scopes[scope].enabled = true;
                table.scopes[scope].context = context;
            }
        }
        return this;
    }
    static unscoped(...defaultScopes) {
        const table = (0, typeorm_1.getMetadataArgsStorage)().tables.find((table) => table.target === this.target);
        if (table.defaultScopes) {
            for (const key in table.defaultScopes) {
                if (!defaultScopes.length) {
                    if (table.defaultScopes[key]) {
                        table.defaultScopes[key].enabled = false;
                    }
                }
                else {
                    const scopeSet = new Set(defaultScopes);
                    // if the key is in the scopeSet, set enabled to false
                    if (scopeSet.has(key)) {
                        if (table.defaultScopes[key]) {
                            table.defaultScopes[key].enabled = false;
                        }
                    }
                }
            }
        }
        return this;
    }
}
exports.ScopeEntity = ScopeEntity;
//# sourceMappingURL=scope.entity.js.map