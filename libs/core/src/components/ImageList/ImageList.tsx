import MuiImageList from '@mui/material/ImageList';
import type { JsonObject } from 'type-fest';

import ImageListItem from '../ImageListItem';
import { useComponentSlot, withDataStructure } from '../../contexts';
import type { ImageListProps } from './ImageList.types';

export default withDataStructure(function ImageList<D extends JsonObject>({
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
