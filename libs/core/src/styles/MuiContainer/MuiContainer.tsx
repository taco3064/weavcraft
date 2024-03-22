import MuiContainer from '@mui/material/Container';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type { WidgetWrapperProps } from './MuiContainer.types';

export const WidgetWrapper = withStyles(
  forwardRef<HTMLDivElement, WidgetWrapperProps>(function Container(
    {
      children,
      classes: { content: contentClassName, ...classes } = {},
      direction: _d,
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
        ref={ref}
        disableGutters
        classes={classes}
        maxWidth={maxWidth}
      >
        {header}

        <MuiContainer
          disableGutters
          className={contentClassName}
          maxWidth={false}
        >
          {children}
        </MuiContainer>
      </MuiContainer>
    );
  }),
  (_theme, { direction = 'column', height }) => ({
    root: {
      display: 'flex',
      flexDirection: direction,
      flexWrap: 'nowrap',
      height,
    },
    content: {
      display: 'flex',
      flexDirection: 'column' as never,
      height: '100%',
      overflow: 'hidden auto',
    },
  }),
  { name: 'WidgetWrapper' }
);
