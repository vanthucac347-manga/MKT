/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { TableMetadataArgs } from 'typeorm/metadata-args/TableMetadataArgs';

export class ScopeObjectKeys<T extends ObjectLiteral> {
  [key: string]: ScopeQB<T>;
}

export type ScopeQB<T extends ObjectLiteral> = (
  qb: SelectQueryBuilder<T>,
  alias: string,
  context?: Record<string, any>,
) => SelectQueryBuilder<T>;

export class ScopeObject<T extends ObjectLiteral> {
  scopeFunc: ScopeQB<T>;
  enabled: boolean;
  context?: Record<string, any>;
}

export class ScopesObjectData<T extends ObjectLiteral> {
  [key: string]: ScopeObject<T>;
}

export interface ScopedTableMetadata<T extends ObjectLiteral>
  extends TableMetadataArgs {
  scopes: ScopesObjectData<T>;
  defaultScopes: ScopesObjectData<T>;
}
