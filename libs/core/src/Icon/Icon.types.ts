import * as Icons from '@fortawesome/free-solid-svg-icons';
import MuiSvgIcon from '@mui/material/SvgIcon';
import type { ComponentProps } from 'react';

type FortawesomeCode<T> = {
  [K in keyof T]: T[K] extends Icons.IconDefinition ? K : never;
}[keyof T];

export interface IconProps
  extends Pick<ComponentProps<typeof MuiSvgIcon>, 'color' | 'fontSize'> {
  code: FortawesomeCode<typeof Icons>;
}
