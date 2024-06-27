import MuiImageList from '@mui/material/ImageList';
import type { JsonObject } from 'type-fest';

import ImageListItem from '../ImageListItem';
import { useCommonStyles } from '../../styles';
import { useSlotElement, useStoreProps } from '../../hooks';
import type { ImageListProps } from './ImageList.types';

export default function ImageList<D extends JsonObject>(
  props: ImageListProps<D>
) {
  const {
    itemProps,
    records = [],
    onItemActionClick,
    ...imageListProps
  } = useStoreProps(props);

  const Action = useSlotElement(itemProps?.action, onItemActionClick);
  const { classes } = useCommonStyles();

  return (
    <MuiImageList
      {...imageListProps}
      data-testid="ImageList"
      className={classes.minHeight}
    >
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
