/* eslint-disable @typescript-eslint/ban-types */
import { getMetadataArgsStorage, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { ScopedTableMetadata, ScopeObjectKeys } from './scope-types';

export function DefaultScopes<T extends ObjectLiteral>(defaultScopes: ScopeObjectKeys<T>) {
  return function (target: Function) {
    const table = getMetadataArgsStorage().tables.find(
      (table) => table.target === target,
    ) as ScopedTableMetadata<T> | undefined;
    if (table) {
      table.defaultScopes = {};
      Object.entries(defaultScopes).forEach(([key, scopeFunc]) => {
        table.defaultScopes[key] = {
          scopeFunc: (qb: SelectQueryBuilder<T>, alias: string) => {
            return scopeFunc(qb, alias);
          },
          enabled: true,
        };
      });
    } else {
      throw new Error(
        'Could not find current entity in metadata store, maybe put @Scope() before @Entity()?',
      );
    }
  };
}

export function Scopes<T extends ObjectLiteral>(scopes: ScopeObjectKeys<T>) {
  return function (target: Function) {
    const table = getMetadataArgsStorage().tables.find(
      (table) => table.target === target,
    ) as ScopedTableMetadata<T> | undefined;
    if (table) {
      table.scopes = {};
      Object.entries(scopes).forEach(([key, scopeFunc]) => {
        table.scopes[key] = {
          scopeFunc: (
            qb: SelectQueryBuilder<T>,
            alias: string,
            context: Record<string, any>,
          ) => {
            return scopeFunc(qb, alias, context);
          },
          enabled: false,
        };
      });
    } else {
      throw new Error(
        'Could not find current entity in metadata store, maybe put @Scope() before @Entity()?',
      );
    }
  };
}
