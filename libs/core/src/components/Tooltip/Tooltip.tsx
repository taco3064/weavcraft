import MuiTooltip from '@mui/material/Tooltip';

import { withGenerateDataProps } from '../../contexts';
import type { TooltipProps, MappablePropNames } from './Tooltip.types';

export default withGenerateDataProps<TooltipProps, MappablePropNames>(
  function Tooltip({ children, disabled = false, title, ...props }) {
    return (
      <MuiTooltip
        {...props}
        {...(disabled && {
          disableFocusListener: true,
          disableHoverListener: true,
          disableTouchListener: true,
        })}
        data-testid="Tooltip"
        title={title || ''}
        disableInteractive={disabled}
      >
        <span data-testid="TooltipContent">{children}</span>
      </MuiTooltip>
    );
  }
);
