import MuiImageListItem from '@mui/material/ImageListItem';
import MuiImageListItemBar from '@mui/material/ImageListItemBar';

import { usePropsTransformation, useUrlValidation } from '../../hooks';
import type { GenericData } from '../../types';
import type { ImageListItemProps } from './ImageListItem.types';

export default function ImageListItem<D extends GenericData>(
  props: ImageListItemProps<D>
) {
  const {
    action,
    actionPosition,
    barPosition,
    title,
    description,
    src,
    srcSet,
    ...imageListItemProps
  } = usePropsTransformation(props);

  const isUrlValid = useUrlValidation(src);

  return !isUrlValid ? null : (
    <MuiImageListItem {...imageListItemProps} data-testid="ImageListItem">
      <img {...{ src, srcSet }} alt={title} loading="lazy" />

      {!action && !title && !description ? null : (
        <MuiImageListItemBar
          {...{
            actionPosition,
            title,
          }}
          actionIcon={action}
          position={barPosition}
          subtitle={description}
          data-testid="ImageListItemBar"
        />
      )}
    </MuiImageListItem>
  );
}
