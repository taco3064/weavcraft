import MuiImageListItem from '@mui/material/ImageListItem';
import MuiImageListItemBar from '@mui/material/ImageListItemBar';

import { useUrlValidation } from '../../hooks';
import { withGenerateData } from '../../contexts';

import type {
  ImageListItemProps,
  MappablePropNames,
} from './ImageListItem.types';

export default withGenerateData<ImageListItemProps, MappablePropNames>(
  function ImageListItem({
    action,
    actionPosition,
    barPosition,
    title,
    description,
    src,
    srcSet,
    ...props
  }) {
    const isUrlValid = useUrlValidation(src);

    return !isUrlValid ? null : (
      <MuiImageListItem {...props} data-testid="ImageListItem">
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
);
