import type { ReactNode } from 'react';
import type { ToolbarProps } from '@mui/material/Toolbar';

export type PortalContainerEl = HTMLElement | undefined | null;

export interface PortalToolbarProps extends Omit<ToolbarProps, 'children'> {
  children: ReactNode;
  containerEl?: PortalContainerEl;
}
