import Toolbar from '@mui/material/Toolbar';
import { createPortal } from 'react-dom';

import type { PortalToolbarProps } from './PortalToolbar.types';

export default function PortalToolbar({
  children,
  containerEl,
  ...props
}: PortalToolbarProps) {
  return containerEl ? (
    createPortal(children, containerEl)
  ) : (
    <Toolbar {...props}>{children}</Toolbar>
  );
}
