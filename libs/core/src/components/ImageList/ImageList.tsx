import MuiImageList from '@mui/material/ImageList';

import ImageListItem from '../ImageListItem';
import type { ImageListProps } from './ImageList.types';

import {
  withStoreProps,
  useComponentSlot,
  type GenericData,
} from '../../contexts';

export default (<D extends GenericData>() =>
  withStoreProps<D, ImageListProps<D>>(function ImageList({
    itemAction,
    itemProps,
    records = [],
    onItemActionClick,
    ...props
  }) {
    const Action = useComponentSlot(itemAction, onItemActionClick);

    return (
      <MuiImageList {...props} data-testid="ImageList">
        {records.map((item, i) => (
          <ImageListItem
            {...itemProps}
            key={i}
            data={item}
            action={
              Action.Slot && <Action.Slot {...Action.getSlotProps(item)} />
            }
          />
        ))}
      </MuiImageList>
    );
  }))();
