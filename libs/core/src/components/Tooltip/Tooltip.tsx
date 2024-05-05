import MuiTooltip from '@mui/material/Tooltip';

import { withGenerateData } from '../../contexts';
import type { TooltipProps, MappablePropNames } from './Tooltip.types';

export default withGenerateData<TooltipProps, MappablePropNames>(
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
