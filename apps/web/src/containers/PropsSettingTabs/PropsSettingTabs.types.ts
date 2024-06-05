import type Core from '@weavcraft/core';
import type { DataBindingProp, PrimitiveValueProp } from '@weavcraft/common';
import type { Get } from 'type-fest';
import type { ReactNode } from 'react';

import type { ConfigPaths, RenderConfig } from '~web/hooks';
import type { EditorListClasses, EditorListProps } from '~web/components';
import type { PrimitiveValuePropsWithPath } from '~web/services';

//* Config Types
type ConfigProps = DataBindingProp | PrimitiveValueProp;
export type ConfigType = ConfigProps['type'];

export type ConfigChangeHandler<V extends ConfigProps = ConfigProps> = (
  config: RenderConfig,
  propPath: string,
  propValue?: V
) => void;

//* Primitive Input Item Type
type PrimitiveProps = NonNullable<
  Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
>;

type PrimitiveType = Get<PrimitiveProps, ['type']>;

export type DefaultPrimitiveFieldProps = Pick<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Core.BaseFieldProps<any>,
  'label' | 'required' | 'size' | 'value' | 'variant' | 'onChange'
>;

export type PrimitiveFields = {
  [K in PrimitiveType]: (
    defaultProps: DefaultPrimitiveFieldProps,
    definition: Get<Extract<PrimitiveProps, { type: K }>, ['definition']>
  ) => ReactNode;
};

//* Component Props Type
export interface PropsSettingTabsProps
  extends Pick<EditorListProps, 'onClose'> {
  config?: RenderConfig;
  paths: ConfigPaths;
  onChange: ConfigChangeHandler;
}

export interface PropsSettingProps<V extends ConfigProps> {
  classes: EditorListClasses & { row?: string };
  config: RenderConfig;
  onChange: ConfigChangeHandler<V>;
}
