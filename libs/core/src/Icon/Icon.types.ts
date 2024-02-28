import * as FaBrands from '@fortawesome/free-brands-svg-icons';
import * as FaSolid from '@fortawesome/free-solid-svg-icons';
import MuiSvgIcon from '@mui/material/SvgIcon';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import type { ComponentProps } from 'react';

export const FaIcon = { ...FaSolid, ...FaBrands } as const;

type FortawesomeCode<T> = {
  [K in keyof T]: T[K] extends IconDefinition ? K : never;
}[keyof T];

export interface IconProps
  extends Pick<ComponentProps<typeof MuiSvgIcon>, 'color' | 'fontSize'> {
  code: FortawesomeCode<typeof FaIcon>;
}
