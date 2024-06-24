import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';
import type { JsonObject } from 'type-fest';

import type { RenderConfig } from '../useWidgetRender';

type ConfigProps = DataBindingProp | PrimitiveValueProp;

export type DataChangeHandler = (e: JsonObject | JsonObject[]) => void;
export type DataSourceValue = '[[root]]' | '[[extension]]' | number[];

export type PropsSettingChangeHandler = (
  config: RenderConfig,
  propPath?: string,
  propValue?: ConfigProps
) => void;
