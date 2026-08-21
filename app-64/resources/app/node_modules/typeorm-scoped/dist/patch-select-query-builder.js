"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchSelectQueryBuilder = void 0;
const typeorm_1 = require("typeorm");
const select_qb_1 = require("./select-qb");
const patchSelectQueryBuilder = () => {
    if (typeorm_1.SelectQueryBuilder.prototype[select_qb_1.GET_QUERY_COPY]) {
        return;
    }
    typeorm_1.SelectQueryBuilder.prototype[select_qb_1.GET_QUERY_COPY] =
        typeorm_1.SelectQueryBuilder.prototype.getQuery;
    for (const property of Object.getOwnPropertyNames(select_qb_1.SelectQB.prototype)) {
        Object.defineProperty(typeorm_1.SelectQueryBuilder.prototype, property, Object.getOwnPropertyDescriptor(select_qb_1.SelectQB.prototype, property));
    }
};
exports.patchSelectQueryBuilder = patchSelectQueryBuilder;
//# sourceMappingURL=patch-select-query-builder.js.map