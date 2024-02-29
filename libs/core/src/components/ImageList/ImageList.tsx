import MuiImageList from '@mui/material/ImageList';

import ImageListItem from '../ImageListItem';
import { useActionPropsTransformation } from '../../hooks';
import type { BaseActionProps, GenericData } from '../../types';
import type { ImageListProps } from './ImageList.types';

export default function ImageList<
  D extends GenericData,
  P extends BaseActionProps
>({
  itemAction,
  itemProps,
  items = [],
  onItemToggle,
  ...props
}: ImageListProps<D, P>) {
  const { Action, getActionProps } = useActionPropsTransformation(
    itemAction,
    onItemToggle
  );

  return (
    <MuiImageList {...props} data-testid="ImageList">
      {items.map((item, i) => (
        <ImageListItem
          {...itemProps}
          key={i}
          data={item}
          action={Action && <Action {...getActionProps(item)} />}
        />
      ))}
    </MuiImageList>
  );
}
