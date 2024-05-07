import MuiImageListItem from '@mui/material/ImageListItem';
import MuiImageListItemBar from '@mui/material/ImageListItemBar';
import type { JsonObject } from 'type-fest';

import { useGenerateProps, useUrlValidation } from '../../hooks';
import type { ImageListItemProps } from './ImageListItem.types';

export default function ImageListItem<D extends JsonObject>(
  props: ImageListItemProps<D>
) {
  const [
    GeneratePropsProvider,
    {
      action,
      actionPosition,
      barPosition,
      title,
      description,
      src,
      srcSet,
      ...imageListItemProps
    },
  ] = useGenerateProps<D, ImageListItemProps<D>>(props);

  const isUrlValid = useUrlValidation(src);

  return !isUrlValid ? null : (
    <GeneratePropsProvider>
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
    </GeneratePropsProvider>
  );
}
