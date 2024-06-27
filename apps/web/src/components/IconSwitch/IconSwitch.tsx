import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';

import { useMainStyles } from './IconSwitch.styles';
import type { IconSwitchProps } from './IconSwitch.types';

export default function IconSwitch<V extends string>({
  disabled,
  options,
  value,
  onChange,
  ...props
}: IconSwitchProps<V>) {
  const keys = Object.keys(options) as V[];
  const tooltip = options[value].tooltip;
  const { classes } = useMainStyles({ disabled, options, value });

  const controller = (
    <Switch
      {...props}
      classes={classes}
      checked={value === keys[1]}
      onChange={(e) => onChange(keys[e.target.checked ? 1 : 0])}
    />
  );

  return !tooltip ? (
    controller
  ) : (
    <Tooltip title={options[value].tooltip}>{controller}</Tooltip>
  );
}
