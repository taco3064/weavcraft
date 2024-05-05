import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import { isValidElement } from 'react';

import Icon from '../Icon';
import { withGenerateData } from '../../contexts';
import type { ToolbarProps, MappablePropNames } from './Toolbar.types';

export default withGenerateData<ToolbarProps, MappablePropNames>(
  function Toolbar({
    children,
    color = 'transparent',
    disableGutters,
    elevation,
    icon,
    position = 'sticky',
    square,
    title,
    variant,
  }) {
    return (
      <MuiAppBar
        data-testid="AppBar"
        {...{ color, elevation, position, square }}
      >
        <MuiToolbar
          data-testid="Toolbar"
          style={{ display: 'flex', gap: 8 }}
          {...{ disableGutters, variant }}
        >
          {typeof icon === 'string' ? (
            <Icon code={icon} />
          ) : isValidElement(icon) ? (
            icon
          ) : null}

          {title && <MuiTypography variant="h6">{title}</MuiTypography>}

          {children}
        </MuiToolbar>
      </MuiAppBar>
    );
  }
);
