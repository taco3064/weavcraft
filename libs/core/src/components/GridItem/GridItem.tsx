import type { JsonObject } from 'type-fest';

import Toolbar from '../Toolbar';
import { FlexGridItem } from '../../styles';
import { useGenerateProps } from '../../hooks';
import type { GridItemProps } from './GridItem.types';

export default function GridItem<D extends JsonObject>(
  props: GridItemProps<D>
) {
  const [
    GeneratePropsProvider,
    { children, elevation, icon, title, ...gridItemProps },
  ] = useGenerateProps<D, GridItemProps<D>>(props);

  return (
    <GeneratePropsProvider>
      <FlexGridItem
        {...gridItemProps}
        data-testid="GridItem"
        header={!title ? null : <Toolbar {...{ elevation, icon, title }} />}
      >
        {children}
      </FlexGridItem>
    </GeneratePropsProvider>
  );
}
