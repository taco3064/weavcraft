import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';
import type { Get, JsonObject } from 'type-fest';

import type { GetDefinitionFn } from '~web/contexts';
import type { PrimitiveValuePropsWithPath } from '~web/services';
import type { RenderConfig } from '../useWidgetRender';

export type ConfigProps = DataBindingProp | PrimitiveValueProp;
export type DataChangeHandler = (e: JsonObject | JsonObject[]) => void;

export interface MappingInfo {
  isStore: boolean;
  mappingPath: SourcePaths['mapping'];
}

export type FieldDefinition = Pick<
  NonNullable<
    Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
  >,
  'required' | 'type' | 'definition'
>;

export interface GetDataStructureOptions extends RenderConfig {
  baseFieldPath?: string[];
  conflicts?: Set<string>;
  getDefinition: GetDefinitionFn;
}

export interface DataStructure {
  [fieldPath: string]: FieldDefinition;
  [fieldSymbol: symbol]: [DataStructure];
}

export type SourcePaths = {
  mapping: 'propMapping' | `${string}.propMapping`;
  data: 'records' | 'data';
};

export type ConfigChangeHandler = (
  config: RenderConfig,
  propPath?: string,
  propValue?: ConfigProps
) => void;
