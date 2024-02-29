import * as FaBrands from '@fortawesome/free-brands-svg-icons';
import * as FaSolid from '@fortawesome/free-solid-svg-icons';
import MuiSvgIcon from '@mui/material/SvgIcon';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import type { ComponentProps } from 'react';

import type { GenericData, MappableProps } from '../../types';

export const FaIcon = { ...FaSolid, ...FaBrands } as const;

type FortawesomeCode<T> = {
  [K in keyof T]: T[K] extends IconDefinition ? K : never;
}[keyof T];

type MuiIconProps = Pick<
  ComponentProps<typeof MuiSvgIcon>,
  'color' | 'fontSize'
>;

interface BaseIconProps extends MuiIconProps {
  code?: FortawesomeCode<typeof FaIcon>;
}

export type IconProps<D extends GenericData> = MappableProps<D, BaseIconProps>;
