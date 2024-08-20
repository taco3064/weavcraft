import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';

import type { ComponentConfig } from '../useWidgetRender';
import type { GetCorePropsFn } from '../imports.types';
import type { GetChildNodesFn } from '../useNodeActions';

//* Enums
export enum DataPropEnum {
  Data = 'data',
  Records = 'records',
}

export enum NodeCaseEnum {
  FixedData,
  FixedRecords,
  BindingRoot,
  StoreComponent,
}

//* Types
type ConfigProps = DataBindingProp | PrimitiveValueProp;
export type DataSource = '[[root]]' | '[[extension]]' | number[];
export type DataFieldIndexes = Exclude<DataSource, `[[${string}]]`>;

export type PropsSettingChangeHandler = (
  config: ComponentConfig,
  propPath?: string,
  propValue?: ConfigProps
) => void;

export type ResetPropMappingOptions = {
  forceReset?: boolean;
  getCoreProps: GetCorePropsFn;
  getChildNodes: GetChildNodesFn;
};
