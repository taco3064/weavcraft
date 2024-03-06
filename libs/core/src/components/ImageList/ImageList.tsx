import MuiImageList from '@mui/material/ImageList';

import ImageListItem from '../ImageListItem';
import { useSlotPropsTransformation } from '../../hooks';
import type { BaseActionProps, GenericData } from '../../types';
import type { ImageListProps } from './ImageList.types';

export default function ImageList<
  D extends GenericData,
  A extends BaseActionProps
>({
  itemAction,
  itemProps,
  items = [],
  onItemActionClick,
  ...props
}: ImageListProps<D, A>) {
  const Action = useSlotPropsTransformation(itemAction, onItemActionClick);

  return (
    <MuiImageList {...props} data-testid="ImageList">
      {items.map((item, i) => (
        <ImageListItem
          {...itemProps}
          key={i}
          data={item}
          action={Action.Slot && <Action.Slot {...Action.getSlotProps(item)} />}
        />
      ))}
    </MuiImageList>
  );
}
