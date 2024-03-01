import MuiImageList from '@mui/material/ImageList';

import ImageListItem from '../ImageListItem';
import { useActionPropsTransformation } from '../../hooks';
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
  const { Action, getActionProps } = useActionPropsTransformation(
    itemAction,
    onItemActionClick
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
