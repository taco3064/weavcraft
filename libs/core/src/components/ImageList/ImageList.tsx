import MuiImageList from '@mui/material/ImageList';

import ImageListItem from '../ImageListItem';
import type { ImageListProps } from './ImageList.types';

import {
  useGenerateSlotProps,
  useGenerateStoreProps,
  type GenericData,
} from '../../contexts';

export default function ImageList<D extends GenericData>(
  props: ImageListProps<D>
) {
  const {
    itemAction,
    itemProps,
    records = [],
    onItemActionClick,
    ...listProps
  } = useGenerateStoreProps(props);

  const Action = useGenerateSlotProps(itemAction, onItemActionClick);

  return (
    <MuiImageList {...listProps} data-testid="ImageList">
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
}
