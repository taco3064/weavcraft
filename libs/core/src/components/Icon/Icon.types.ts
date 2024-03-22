import * as FaBrands from '@fortawesome/free-brands-svg-icons';
import * as FaSolid from '@fortawesome/free-solid-svg-icons';
import MuiSvgIcon from '@mui/material/SvgIcon';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import type { ComponentProps } from 'react';

import type { GenericData, PropsWithMappedData } from '../../contexts';

export const FaIcon = { ...FaSolid, ...FaBrands } as const;

type FortawesomeCode<T> = {
  [K in keyof T]: T[K] extends IconDefinition ? K : never;
}[keyof T];

type MuiIconProps = Pick<
  ComponentProps<typeof MuiSvgIcon>,
  'className' | 'color' | 'fontSize'
>;

export type IconCode = FortawesomeCode<typeof FaIcon>;

export interface IconProps extends MuiIconProps {
  code?: IconCode;
}

export type MappablePropNames = keyof Pick<IconProps, 'code'>;

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  Omit<IconProps, 'className'>,
  MappablePropNames
>;
