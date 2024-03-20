import MuiContainer from '@mui/material/Container';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type { WidgetWrapperProps } from './MuiContainer.types';

export const WidgetWrapper = withStyles(
  forwardRef<HTMLDivElement, WidgetWrapperProps>(function Container(
    {
      children,
      direction: _direction,
      footer,
      header,
      height = 'max-content',
      maxWidth,
      ...props
    },
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
  (_theme, { direction = 'column' }) => ({
    root: {
      display: 'flex',
      flexDirection: direction,
      flexWrap: 'nowrap',

      '& > *:last-child': {
        height: '100%',
        overflow: 'hidden auto',
      },
    },
  }),
  { name: 'WidgetWrapper' }
);
