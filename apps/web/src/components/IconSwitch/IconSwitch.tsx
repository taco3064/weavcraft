import Switch from '@mui/material/Switch';
import { forwardRef } from 'react';

import { useMainStyles } from './IconSwitch.styles';
import type { IconSwitchProps } from './IconSwitch.types';

export default forwardRef<HTMLButtonElement, IconSwitchProps>(
  function IconSwitch({ disabled, options, value, onChange, ...props }, ref) {
    const keys = Object.keys(options);
    const { classes } = useMainStyles({ disabled, options, value });

    return (
      <Switch
        {...props}
        ref={ref}
        classes={classes}
        checked={value === keys[1]}
        onChange={(e) => onChange(keys[e.target.checked ? 1 : 0])}
      />
    );
  }
);
