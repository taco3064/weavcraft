import * as FaBrands from '@fortawesome/free-brands-svg-icons';
import * as FaSolid from '@fortawesome/free-solid-svg-icons';
import MuiSvgIcon from '@mui/material/SvgIcon';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';

export const fontawesomes = { ...FaSolid, ...FaBrands } as const;

type FortawesomeCode<T> = {
  [K in keyof T]: T[K] extends IconDefinition ? K : never;
}[keyof T];

type MuiIconProps = Pick<
  ComponentProps<typeof MuiSvgIcon>,
  'className' | 'color' | 'fontSize'
>;

export type IconCode = FortawesomeCode<typeof fontawesomes>;

export type IconProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiIconProps & {
    code?: IconCode;
  },
  'code'
>;
