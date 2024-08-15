import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { forwardRef } from 'react';

import { useMainStyles } from './AddIconButton.styles';
import type { AddIconButtonProps } from './AddIconButton.types';

export default forwardRef<HTMLButtonElement, AddIconButtonProps>(
  function AddIconButton({ className, tooltip, onClick }, ref) {
    const { classes, cx } = useMainStyles();

    return (
      <Tooltip title={tooltip}>
        <IconButton
          {...{ ref, onClick }}
          className={cx(classes.toggle, className)}
          size="small"
        >
          <Core.Icon code="faAdd" />
        </IconButton>
      </Tooltip>
    );
  }
);
