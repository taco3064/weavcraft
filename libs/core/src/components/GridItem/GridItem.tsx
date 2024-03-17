import Toolbar from '../Toolbar';
import { FlexGridItem } from '../../styles';
import { withGenerateDataProps } from '../../contexts';
import type { GridItemProps, MappablePropNames } from './GridItem.types';

export default withGenerateDataProps<GridItemProps, MappablePropNames>(
  function GridItem({ children, elevation, icon, title, ...props }) {
    return (
      <FlexGridItem
        {...props}
        data-testid="GridItem"
        header={!title ? null : <Toolbar {...{ elevation, icon, title }} />}
      >
        {children}
      </FlexGridItem>
    );
  }
);
