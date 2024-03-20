import MuiContainer from '@mui/material/Container';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type { WidgetWrapperProps } from './MuiContainer.types';

export const WidgetWrapper = withStyles(
  forwardRef<HTMLDivElement, WidgetWrapperProps>(function Container(
    { children, footer, header, height = 'max-content', maxWidth, ...props },
    ref
  ) {
    return (
      <MuiContainer
        {...props}
        disableGutters
        ref={ref}
        maxWidth={maxWidth}
        style={{ height }}
      >
        {header}
        {children}
        {footer}
      </MuiContainer>
    );
  }),
  () => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',

      '& > *:last-child': {
        height: '100%',
        overflow: 'hidden auto',
      },
    },
  }),
  { name: 'WidgetWrapper' }
);
