import type { ReactElement } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { SwitchProps } from '@mui/material/Switch';

export type IconOptions = {
  tooltip?: string;
  icon: ReactElement<SvgIconProps>;
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
};

export interface IconSwitchProps<V extends string = string>
  extends Omit<
    SwitchProps,
    'defaultChecked' | 'checked' | 'classes' | 'color' | 'onChange'
  > {
  options: { [key in V]: IconOptions };
  value: V;
  onChange: (value: V) => void;
}
