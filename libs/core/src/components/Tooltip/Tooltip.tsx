import MuiTooltip from '@mui/material/Tooltip';

import { withGenerateDataProps } from '../../contexts';
import type { TooltipProps, MappablePropNames } from './Tooltip.types';

export default withGenerateDataProps<TooltipProps, MappablePropNames>(
  function Tooltip({ children, disabled = false, title, ...props }) {
    return (
      <MuiTooltip
        {...props}
        {...((disabled || !title) && {
          disableFocusListener: true,
          disableHoverListener: true,
          disableTouchListener: true,
        })}
        PopperProps={{ 'data-testid': 'Tooltip' } as never}
        title={title || ''}
      >
        <span data-testid="TooltipToggle">{children}</span>
      </MuiTooltip>
    );
  }
);
