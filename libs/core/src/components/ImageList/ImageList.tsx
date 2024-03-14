import MuiImageList from '@mui/material/ImageList';

import ImageListItem from '../ImageListItem';
import type { ImageListProps } from './ImageList.types';

import {
  makeStoreProps,
  useComponentSlot,
  type GenericData,
} from '../../contexts';

const withStoreProps = makeStoreProps<ImageListProps>();

export default withStoreProps(function ImageList<D extends GenericData>({
  itemAction,
  itemProps,
  records = [],
  onItemActionClick,
  ...props
}: ImageListProps<D>) {
  const Action = useComponentSlot(itemAction, onItemActionClick);

  return (
    <MuiImageList {...props} data-testid="ImageList">
      {records.map((item, i) => (
        <ImageListItem
          {...itemProps}
          key={i}
          data={item}
          action={Action.Slot && <Action.Slot {...Action.getSlotProps(item)} />}
        />
      ))}
    </MuiImageList>
  );
});
