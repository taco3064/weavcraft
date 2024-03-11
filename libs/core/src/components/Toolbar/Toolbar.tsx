import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';

import Icon from '../Icon';
import { withGenerateDataProps } from '../../contexts';
import type { ToolbarProps, MappablePropNames } from './Toolbar.types';

export default withGenerateDataProps<ToolbarProps, MappablePropNames>(
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
          style={{ gap: 8 }}
          {...{ disableGutters, variant }}
        >
          {icon && <Icon code={icon} />}
          {title && <MuiTypography variant="h6">{title}</MuiTypography>}

          {children}
        </MuiToolbar>
      </MuiAppBar>
    );
  }
);
