import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';
import type { Get, JsonObject } from 'type-fest';

import type { PrimitiveValuePropsWithPath } from '~web/services';
import type { RenderConfig } from '../useWidgetRender';

export type ConfigProps = DataBindingProp | PrimitiveValueProp;
export type DataChangeHandler = (e: JsonObject | JsonObject[]) => void;

export interface DataStructureGetterOptions extends RenderConfig {
  conflicts?: Set<string>;
  isStore: boolean;
  mappingPath: SourcePaths['mapping'];
}

export type ConfigChangeHandler = (
  config: RenderConfig,
  propPath?: string,
  propValue?: ConfigProps
) => void;

export type FieldDefinition =
  | { required: false; type: 'records' }
  | Pick<
      NonNullable<
        Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
      >,
      'required' | 'type' | 'definition'
    >;

export type SourcePaths = {
  mapping: 'propMapping' | `${string}.propMapping`;
  data: 'records' | 'data';
};
