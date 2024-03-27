import IconButton from '@mui/material/IconButton';
import { cloneElement, forwardRef, isValidElement } from 'react';

import { useButtonStyles } from './SwitchIconButton.styles';
import type { SwitchIconButtonProps } from './SwitchIconButton.types';

const classes = {
  icon: 'SwitchIconButton-icon',
  hoveredIcon: 'SwitchIconButton-hoveredIcon',
};

export default forwardRef<HTMLButtonElement, SwitchIconButtonProps>(
  function SwitchIconButton({ className, icon, hoveredIcon, ...props }, ref) {
    const {
      cx,
      classes: { root },
    } = useButtonStyles({ classes });

    return (
      <IconButton {...props} ref={ref} className={cx(root, className)}>
        {!isValidElement(icon)
          ? icon
          : cloneElement(icon, { className: classes.icon })}

        {!isValidElement(hoveredIcon)
          ? hoveredIcon
          : cloneElement(hoveredIcon, {
              className: classes.hoveredIcon,
            })}
      </IconButton>
    );
  }
);
