import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';

import type { ToolbarProps } from './Toolbar.types';

export default function Toolbar({
  children,
  color = 'transparent',
  disableGutters,
  elevation,
  position = 'sticky',
  square,
  variant,
}: ToolbarProps) {
  return (
    <MuiAppBar data-testid="AppBar" {...{ color, elevation, position, square }}>
      <MuiToolbar
        data-testid="Toolbar"
        {...{ children, disableGutters, variant }}
      />
    </MuiAppBar>
  );
}
