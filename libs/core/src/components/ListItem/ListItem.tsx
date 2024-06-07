import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';
import MuiToolbar from '@mui/material/Toolbar';
import type { JsonObject } from 'type-fest';

import { useGenerateProps, useUrlValidation } from '../../hooks';
import type { ListItemProps } from './ListItem.types';

export default function ListItem<D extends JsonObject>(
  props: ListItemProps<D>
) {
  const [
    GeneratePropsProvider,
    {
      action,
      disabled,
      href,
      indicator,
      nestedContent,
      id,
      primary,
      secondary,
      selected,
      variant = 'item',
      onItemClick,
      ...listItemProps
    },
    { data },
  ] = useGenerateProps<D, ListItemProps<D>>(props);

  const isHrefValid = useUrlValidation(href);

  const children = (
    <>
      {indicator && (
        <MuiListItemIcon data-testid="ListItemIndicator">
          {indicator}
        </MuiListItemIcon>
      )}

      <MuiListItemText
        {...{ primary, secondary }}
        data-testid="ListItemText"
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

      {action && (
        <MuiToolbar
          disableGutters
          variant="regular"
          data-testid="ListItemAction"
        >
          {action}
        </MuiToolbar>
      )}
    </>
  );

  return (
    <GeneratePropsProvider>
      {variant === 'item' ? (
        <MuiListItem {...listItemProps} data-testid="ListItem">
          {children}
        </MuiListItem>
      ) : (
        <MuiListItemButton
          {...listItemProps}
          {...{ disabled, selected }}
          {...(variant === 'link' &&
            isHrefValid && { LinkComponent: 'a', href })}
          {...(variant === 'button' && {
            onClick: () => onItemClick?.(data),
          })}
          data-testid={`ListItem${variant === 'link' ? 'Link' : 'Button'}`}
        >
          {children}
        </MuiListItemButton>
      )}

      {!nestedContent && !id ? null : (
        <MuiListItem disableGutters id={id} data-testid="ListItemNested">
          {nestedContent}
        </MuiListItem>
      )}
    </GeneratePropsProvider>
  );
}
