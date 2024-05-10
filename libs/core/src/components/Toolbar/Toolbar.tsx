import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import { isValidElement } from 'react';
import type { JsonObject } from 'type-fest';

import Icon from '../Icon';
import { useGenerateProps } from '../../hooks';
import type { ToolbarProps } from './Toolbar.types';

export default function Toolbar<D extends JsonObject>(props: ToolbarProps<D>) {
  const [
    GeneratePropsProvider,
    {
      children,
      color = 'transparent',
      disableGutters,
      elevation,
      icon,
      position = 'sticky',
      square,
      title,
      variant,
    },
  ] = useGenerateProps<D, ToolbarProps<D>>(props);

  return (
    <GeneratePropsProvider>
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
    </GeneratePropsProvider>
  );
}
