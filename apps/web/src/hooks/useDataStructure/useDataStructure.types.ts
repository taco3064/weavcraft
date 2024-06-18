import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';
import type { Get, JsonObject } from 'type-fest';

import type { ConfigPaths, RenderConfig } from '../useWidgetRender';

import type {
  GetDefinitionFn,
  PrimitiveValuePropsWithPath,
  WidgetConfigs,
} from '../hooks.types';

export type ConfigProps = DataBindingProp | PrimitiveValueProp;
export type DataChangeHandler = (e: JsonObject | JsonObject[]) => void;

export type FieldDefinition = Pick<
  NonNullable<
    Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
  >,
  'required' | 'type' | 'definition'
>;

export interface DataStructure {
  [fieldPath: string]: FieldDefinition;
  [fieldSymbol: symbol]: [DataStructure];
}

export interface GeneratorOptions {
  baseFieldPath?: string[];
  children: (RenderConfig & { nodePath: string })[];
  conflicts?: Set<string>;
  subFieldPath: string;
  getCoreProps: GetDefinitionFn;
}

export interface ParentStoreNodeParams {
  getCoreProps: GetDefinitionFn;
  getNode: (widget: WidgetConfigs, paths: ConfigPaths) => RenderConfig;
}

export interface ParentNode {
  node: RenderConfig;
  subFieldName?: string;
}

export type ConfigChangeHandler = (
  config: RenderConfig,
  propPath?: string,
  propValue?: ConfigProps
) => void;
