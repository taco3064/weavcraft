import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';
import type { JsonObject } from 'type-fest';

import type { RenderConfig } from '../useWidgetRender';
import type { WidgetConfigs } from '../imports.types';

type ConfigProps = DataBindingProp | PrimitiveValueProp;

export type DataChangeHandler = (e: JsonObject | JsonObject[]) => void;
export type DataFields = NonNullable<WidgetConfigs['dataStructure']>;

export type DataSourceValue = '[[root]]' | '[[extension]]' | number[];

export type PropsSettingChangeHandler = (
  config: RenderConfig,
  propPath?: string,
  propValue?: ConfigProps
) => void;
