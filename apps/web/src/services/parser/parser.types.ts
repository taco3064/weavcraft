import { WidgetPropTypes } from '@weavcraft/common';

import type { PropTypeDefinitions } from '../common';
import type { WidgetType } from '../configs';

type BasePropsWithPath<
  T extends WidgetPropTypes,
  D extends PropTypeDefinitions.PropTypes
> = Partial<Record<`${Uncapitalize<T>}Props`, { [Path: string]: D }>>;

export type DataBindingPropsWithPath = BasePropsWithPath<
  'DataBinding',
  PropTypeDefinitions.Data | PropTypeDefinitions.Mapping
>;

export type ElementNodePropsWithPath = BasePropsWithPath<
  'ElementNode',
  PropTypeDefinitions.Node
>;

export type EventCallbackPropsWithPath = BasePropsWithPath<
  'EventCallback',
  PropTypeDefinitions.Function
>;

export type PrimitiveValuePropsWithPath = BasePropsWithPath<
  'PrimitiveValue',
  | PropTypeDefinitions.Boolean
  | PropTypeDefinitions.Icon
  | PropTypeDefinitions.Number
  | PropTypeDefinitions.OneOf
  | PropTypeDefinitions.String
>;

export interface PropsDefinition
  extends DataBindingPropsWithPath,
    ElementNodePropsWithPath,
    EventCallbackPropsWithPath,
    PrimitiveValuePropsWithPath {
  componentName: string;
  group?: string;
}

export type DefinitionIDB = Record<
  'core',
  {
    key: WidgetType;
    value: PropsDefinition;
  }
>;
