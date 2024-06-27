import { WidgetPropTypes } from '@weavcraft/common';

import type { PropTypeDefinitions } from '../common';
import type { CoreComponent } from '../configs';

type BasePropDefinitions<
  T extends WidgetPropTypes,
  P extends { [Path: string]: PropTypeDefinitions.PropTypes }
> = Partial<Record<`${Uncapitalize<T>}Props`, P>>;

export type DataBindingPropDefinition = BasePropDefinitions<
  'DataBinding',
  Record<'propMapping' | `${string}.propMapping`, PropTypeDefinitions.Mapping> &
    Record<'data' | 'records', PropTypeDefinitions.Data>
>;

export type ElementNodePropDefinitions = BasePropDefinitions<
  'ElementNode',
  { [Path: string]: PropTypeDefinitions.Node }
>;

export type EventCallbackPropDefinitions = BasePropDefinitions<
  'EventCallback',
  { [Path: string]: PropTypeDefinitions.Function }
>;

export type PrimitivePropDefinitions = BasePropDefinitions<
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
  extends DataBindingPropDefinition,
    ElementNodePropDefinitions,
    EventCallbackPropDefinitions,
    PrimitivePropDefinitions {
  componentName: string;
  group?: string;
}

export type DefinitionIDB = Record<
  'core',
  {
    key: CoreComponent;
    value: PropsDefinition;
  }
>;
