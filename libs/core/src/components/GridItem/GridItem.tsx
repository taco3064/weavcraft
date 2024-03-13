import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import Toolbar from '../Toolbar';
import { withGenerateDataProps } from '../../contexts';
import type { GridItemProps, MappablePropNames } from './GridItem.types';

const Grid = styled(MuiGrid)({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  padding: '0 !important',
  justifyContent: 'flex-start',
});

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 !important',
  height: '100%',
});

export default withGenerateDataProps<GridItemProps, MappablePropNames>(
  function GridItem({ children, elevation, icon, title, ...props }) {
    return (
      <Grid {...props} data-testid="GridItem" item>
        {title && <Toolbar {...{ elevation, icon, title }} />}

        <Content data-testid="GridItemContent">{children}</Content>
      </Grid>
    );
  }
);
