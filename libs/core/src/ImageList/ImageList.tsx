import MuiImageList from '@mui/material/ImageList';
import MuiImageListItem from '@mui/material/ImageListItem';
import MuiImageListItemBar from '@mui/material/ImageListItemBar';
import _get from 'lodash/get';
import { useMemo } from 'react';

import type { Data } from '../types';
import type { ImageListProps, ImageListItemProps } from './ImageList.types';

export default function ImageList<T extends Data>({
  itemAction,
  data,
  itemProps: defaultItemProps,
  propMapping = {},
  onItemToggle,
  ...props
}: ImageListProps<T>) {
  const { type: Action, props: actionProps } = itemAction || {};
  const stringify = JSON.stringify(propMapping);

  const items = useMemo(() => {
    const entries = Object.entries(JSON.parse(stringify));

    return (
      data?.map((item) => ({
        item,
        ...entries.reduce(
          (result, [key, path]) => ({
            ...result,
            [key]: _get(item, path as string),
          }),
          {} as ImageListItemProps
        ),
      })) || []
    );
  }, [data, stringify]);

  return (
    <MuiImageList {...props}>
      {items.map(({ item, alt, description, src, srcSet, ...itemProps }, i) => (
        <MuiImageListItem
          key={i}
          data-testid={alt}
          {...defaultItemProps}
          {...itemProps}
        >
          <img {...{ alt, src, srcSet }} loading="lazy" />

          {[Action, alt, description].some(Boolean) && (
            <MuiImageListItemBar
              position="below"
              title={alt}
              subtitle={description}
              actionIcon={
                Action && (
                  <Action
                    {...actionProps}
                    {...(onItemToggle && {
                      onClick: () => onItemToggle?.(item),
                    })}
                  />
                )
              }
            />
          )}
        </MuiImageListItem>
      ))}
    </MuiImageList>
  );
}
