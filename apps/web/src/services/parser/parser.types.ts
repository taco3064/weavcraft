import { WidgetPropTypes } from '@weavcraft/common';

import type { PropTypeDefinitions } from '../common';
import type { WidgetType } from '../configs';

type BasePropsWithPath<
  T extends WidgetPropTypes,
  P extends { [Path: string]: PropTypeDefinitions.PropTypes }
> = Partial<Record<`${Uncapitalize<T>}Props`, P>>;

export type DataBindingPropsWithPath = BasePropsWithPath<
  'DataBinding',
  Record<`${string}.propMapping`, PropTypeDefinitions.Mapping> & {
    propMapping: PropTypeDefinitions.Mapping;
    data: PropTypeDefinitions.Data;
    records: PropTypeDefinitions.Data;
  }
>;

export type ElementNodePropsWithPath = BasePropsWithPath<
  'ElementNode',
  { [Path: string]: PropTypeDefinitions.Node }
>;

export type EventCallbackPropsWithPath = BasePropsWithPath<
  'EventCallback',
  { [Path: string]: PropTypeDefinitions.Function }
>;

export type PrimitiveValuePropsWithPath = BasePropsWithPath<
  'PrimitiveValue',
  {
    [Path: string]:
      | PropTypeDefinitions.Boolean
      | PropTypeDefinitions.Icon
      | PropTypeDefinitions.Number
      | PropTypeDefinitions.OneOf
      | PropTypeDefinitions.String;
  }
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
