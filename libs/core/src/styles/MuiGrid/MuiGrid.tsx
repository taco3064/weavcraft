import MuiContainer from '@mui/material/Container';
import MuiGrid from '@mui/material/Grid';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type { FlexGridItemProps } from './MuiGrid.types';

export const FlexGridItem = withStyles(
  forwardRef<HTMLDivElement, FlexGridItemProps>(function Grid(
    {
      children,
      header,
      classes: { content: contentClassName, ...classes } = {},
      ...props
    },
    ref
  ) {
    return (
      <MuiGrid {...props} ref={ref} item classes={classes}>
        {header}

        <MuiContainer className={contentClassName} maxWidth={false}>
          {children}
        </MuiContainer>
      </MuiGrid>
    );
  }),
  () => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      padding: '0 !important',
      justifyContent: 'flex-start',
    },
    content: {
      display: 'flex',
      flexDirection: 'column' as never,
      flexWrap: 'nowrap' as never,
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 !important',
      height: '100%',
    },
  }),
  { name: 'FlexGridItem' }
);
