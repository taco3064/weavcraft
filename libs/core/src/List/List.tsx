import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';
import MuiListSubheader from '@mui/material/ListSubheader';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import _get from 'lodash/get';
import { useMemo, type ComponentProps } from 'react';

import Avatar from '../Avatar';
import Icon from '../Icon';
import type { Data } from '../types';
import type {
  IndicatorDefinition,
  IndicatorVariant,
  ItemDefinition,
  ListItemDefinition,
  ListItemProps,
  ListItemVariant,
  ListProps,
} from './List.types';

export default function List<
  T extends Data,
  V extends ListItemVariant = 'item',
  H extends IndicatorVariant = 'icon'
>({
  data,
  itemAction,
  itemProps,
  indicatorProps,
  subheaderProps,
  propMapping = {},
  onItemToggle,
  ...props
}: ListProps<T, V, H>) {
  const { type: Action, props: actionProps } = itemAction || {};
  const stringify = JSON.stringify(propMapping);

  const { defaultIndicatorProps, indicatorVariant } = useMemo(() => {
    const { variant = 'icon', ...defaultIndicatorProps } = indicatorProps || {};

    return {
      defaultIndicatorProps,
      indicatorVariant: variant,
    } as IndicatorDefinition<H>;
  }, [indicatorProps]);

  const { ListItem, defaultItemProps, itemVariant } = useMemo<
    ListItemDefinition<V>
  >(() => {
    const { variant = 'item', ...defaultItemProps } = itemProps || {};

    return {
      ListItem: variant === 'button' ? MuiListItemButton : MuiListItem,
      defaultItemProps,
      itemVariant: variant,
    };
  }, [itemProps]);

  const items = useMemo<ItemDefinition<T, V, H>[]>(() => {
    const entries = Object.entries(JSON.parse(stringify));

    return (
      data?.map((item) => ({
        item,
        ...entries.reduce((result, [key, path]) => {
          if (/^(alt|src|srcSet|text|code)$/.test(key)) {
            return {
              ...result,
              indicatorProps: {
                ..._get(result, 'indicatorProps'),
                [key]: _get(item, path as string),
              } as never,
            };
          } else if (key === 'href' && itemVariant === 'button') {
            return {
              ...result,
              href: _get(item, path as string),
              LinkComponent: 'a',
            };
          }

          return {
            ...result,
            [key]: _get(item, path as string),
          };
        }, {} as ListItemProps<V>),
      })) || []
    );
  }, [data, itemVariant, stringify]);

  return (
    <MuiList
      {...props}
      data-testid="List"
      subheader={
        subheaderProps && (
          <MuiListSubheader
            disableSticky={subheaderProps.disableSticky}
            data-testid="subheader"
          >
            <MuiToolbar
              variant="dense"
              disableGutters={subheaderProps.disableGutters}
            >
              <MuiTypography
                variant="subtitle1"
                color="primary"
                display="flex"
                gap={8}
                marginRight="auto"
              >
                {subheaderProps.icon && (
                  <Icon {...subheaderProps.icon} fontSize="inherit" />
                )}

                {subheaderProps.title}
              </MuiTypography>

              <MuiToolbar disableGutters variant="dense">
                {subheaderProps.action}
              </MuiToolbar>
            </MuiToolbar>
          </MuiListSubheader>
        )
      }
    >
      {items.map(
        ({ item, indicatorProps, primary, secondary, ...itemProps }, i) => (
          <ListItem key={i} {...defaultItemProps} {...itemProps}>
            {!defaultIndicatorProps && !indicatorProps ? null : (
              <MuiListItemIcon>
                {indicatorVariant === 'avatar' ? (
                  <Avatar
                    {...({
                      ...defaultIndicatorProps,
                      ...indicatorProps,
                    } as ComponentProps<typeof Avatar>)}
                  />
                ) : (
                  <Icon
                    {...({
                      ...defaultIndicatorProps,
                      ...indicatorProps,
                    } as ComponentProps<typeof Icon>)}
                  />
                )}
              </MuiListItemIcon>
            )}

            <MuiListItemText
              {...{ primary, secondary }}
              primaryTypographyProps={{
                className: 'primary',
                variant: 'body1',
                color: 'textPrimary',
              }}
              secondaryTypographyProps={{
                className: 'secondary',
                variant: 'body2',
                color: 'textSecondary',
              }}
            />

            {Action && (
              <Action
                {...actionProps}
                {...(onItemToggle && {
                  onClick: () => onItemToggle?.(item),
                })}
              />
            )}
          </ListItem>
        )
      )}
    </MuiList>
  );
}
