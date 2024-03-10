import MuiCollapse from '@mui/material/Collapse';
import type { ComponentProps, ReactElement } from 'react';

import type { SlotProps } from '../../contexts';

type MuiCollapseProps = Pick<
  ComponentProps<typeof MuiCollapse>,
  'children' | 'orientation'
>;

export interface CollapseProps extends MuiCollapseProps {
  containerId?: string;
  toggle?: ReactElement<SlotProps>;
}
