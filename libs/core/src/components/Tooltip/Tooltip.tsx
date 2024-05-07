import MuiTooltip from '@mui/material/Tooltip';
import type { JsonObject } from 'type-fest';

import { useGenerateProps } from '../../hooks';
import type { TooltipProps } from './Tooltip.types';

export default function Tooltip<D extends JsonObject>(props: TooltipProps<D>) {
  const [
    GeneratePropsProvider,
    { children, disabled = false, title, ...tooltipProps },
  ] = useGenerateProps<D, TooltipProps<D>>(props);

  return (
    <GeneratePropsProvider>
      <MuiTooltip
        {...tooltipProps}
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
    </GeneratePropsProvider>
  );
}
