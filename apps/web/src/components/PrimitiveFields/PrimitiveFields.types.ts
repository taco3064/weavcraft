import type Core from '@weavcraft/core';
import type { Get } from 'type-fest';
import type { ReactElement, ReactNode } from 'react';
import type { IconProps } from '@mui/material/Icon';

import type { PrimitiveValuePropsWithPath } from '../imports.types';

export type PrimitiveProps = NonNullable<
  Get<PrimitiveValuePropsWithPath, ['primitiveValueProps', string]>
>;

export type PrimitiveType = Get<PrimitiveProps, ['type']>;

type DefaultPrimitiveFieldProps = Pick<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Core.BaseFieldProps<any>,
  'label' | 'name' | 'required' | 'size' | 'value' | 'variant' | 'onChange'
>;

export type AdornmentIcons = {
  [K in PrimitiveType]: ReactElement<IconProps>;
};

export type PrimitiveFields = {
  [K in PrimitiveType]: (
    defaultProps: DefaultPrimitiveFieldProps,
    definition: Get<Extract<PrimitiveProps, { type: K }>, ['definition']>
  ) => ReactNode;
};
