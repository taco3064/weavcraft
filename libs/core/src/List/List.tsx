import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import MuiListItemText from '@mui/material/ListItemText';
import MuiListSubheader from '@mui/material/ListSubheader';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import _get from 'lodash/get';
import { useMemo } from 'react';
import type { ComponentType } from 'react';

import Avatar from '../Avatar';
import Icon from '../Icon';
import type { Data } from '../types';
import type {
  IndicatorProps,
  IndicatorVariant,
  IntersectionProps,
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
  propMapping,
  onItemToggle,
  ...props
}: ListProps<T, V, H>) {
  const { type: Action, props: actionProps } = itemAction || {};
  const stringify = JSON.stringify(propMapping);

  const Indicator = useMemo(() => {
    const indicatorVariant = indicatorProps?.variant || 'icon';

    return (indicatorVariant === 'avatar' ? Avatar : Icon) as ComponentType<
      Omit<IndicatorProps<T, H>, 'variant'>
    >;
  }, [indicatorProps?.variant]);

  const { ListItem, defaultItemProps } = useMemo<{
    ListItem: ComponentType<Omit<IntersectionProps<V>, 'variant'>>;
    defaultItemProps: Omit<IntersectionProps<V>, 'variant'>;
  }>(() => {
    const { variant = 'item', ...defaultItemProps } = itemProps || {};

    return {
      ListItem: variant === 'button' ? MuiListItemButton : MuiListItem,
      defaultItemProps,
    };
  }, [itemProps]);

  const items = useMemo<
    (ListItemProps<V> & {
      item: T;
      indicatorProps?: Omit<IndicatorProps<T, H>, 'variant'>;
    })[]
  >(() => {
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
          }

          return {
            ...result,
            [key]: _get(item, path as string),
          };
        }, {} as ListItemProps<V>),
      })) || []
    );
  }, [data, stringify]);

  return (
    <MuiList
      {...props}
      subheader={
        subheaderProps && (
          <MuiListSubheader disableSticky={subheaderProps.disableSticky}>
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
          <ListItem
            key={i}
            data-testid={primary}
            {...defaultItemProps}
            {...itemProps}
            {...(_get(itemProps, 'href') && { LinkComponent: 'a' })}
          >
            {!indicatorProps ? null : (
              <MuiListItemIcon>
                <Indicator {...indicatorProps} />
              </MuiListItemIcon>
            )}

            <MuiListItemText
              {...{ primary, secondary }}
              primaryTypographyProps={{
                variant: 'body1',
                color: 'textPrimary',
              }}
              secondaryTypographyProps={{
                variant: 'body2',
                color: 'textSecondary',
              }}
            />

            {Action && (
              <MuiListItemSecondaryAction>
                <Action
                  {...actionProps}
                  {...(onItemToggle && {
                    onClick: () => onItemToggle?.(item),
                  })}
                />
              </MuiListItemSecondaryAction>
            )}
          </ListItem>
        )
      )}
    </MuiList>
  );
}
