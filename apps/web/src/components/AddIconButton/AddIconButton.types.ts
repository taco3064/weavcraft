import type { IconButtonProps } from '@mui/material/IconButton';

export interface AddIconButtonProps {
  className?: string;
  sx?: IconButtonProps['sx'];
  tooltip: string;
  onClick: () => void;
}
