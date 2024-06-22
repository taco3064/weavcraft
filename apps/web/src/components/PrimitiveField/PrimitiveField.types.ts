import type Core from '@weavcraft/core';
import type { Get } from 'type-fest';
import type { ReactElement } from 'react';
import type { IconProps } from '@mui/material/Icon';
import type { PrimitiveValueProp } from '@weavcraft/common';

import type { PrimitivePropDefinitions } from '../imports.types';

export type AdornmentIcons = {
  [K in PrimitiveType]: ReactElement<IconProps>;
};

type PrimitiveDefinition = NonNullable<
  Get<PrimitivePropDefinitions, ['primitiveValueProps', string]>
>;

export type PrimitiveType = Get<PrimitiveDefinition, ['type']>;

//* Component Props
type DefaultPrimitiveFieldProps = Pick<
  Core.BaseFieldProps<PrimitiveValueProp['value']>,
  'label' | 'name' | 'required' | 'size' | 'variant'
>;

export type PrimitiveFieldProps<T extends PrimitiveType> =
  DefaultPrimitiveFieldProps & {
    definition: Extract<PrimitiveDefinition, { type: T }>;
    onChange?: (value?: PrimitiveValueProp['value'], name?: string) => void;
  } & Pick<
      Exclude<
        T extends 'boolean'
          ? Core.SwitchFieldProps
          : T extends 'icon'
          ? Core.BaseFieldProps<Core.IconCode>
          : T extends 'number'
          ? Core.NumericFieldProps
          : T extends 'string'
          ? Core.BaseFieldProps<string>
          : T extends 'oneof'
          ? Core.SingleSelectFieldProps<
              { value: NonNullable<PrimitiveValueProp['value']> },
              'value'
            >
          : never,
        never
      >,
      'label' | 'name' | 'required' | 'size' | 'variant' | 'value'
    >;
