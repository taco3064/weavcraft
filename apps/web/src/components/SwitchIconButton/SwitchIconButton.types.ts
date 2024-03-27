import type { IconButtonProps } from '@mui/material/IconButton';
import type { ReactElement } from 'react';

export type StyleParams = {
  classes: Record<'icon' | 'hoveredIcon', string>;
};

export interface SwitchIconButtonProps
  extends Omit<IconButtonProps, 'children' | 'size'> {
  icon: ReactElement<{ className?: string }>;
  hoveredIcon: ReactElement<{ className?: string }>;
}
