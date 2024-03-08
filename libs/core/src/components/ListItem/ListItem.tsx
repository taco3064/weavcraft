import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';
import MuiToolbar from '@mui/material/Toolbar';

import { usePropsTransformation, useUrlValidation } from '../../hooks';
import type { GenericData } from '../../types';
import type { ListItemProps, ListItemVariant } from './ListItem.types';

export default function ListItem<
  D extends GenericData,
  V extends ListItemVariant = 'item'
>(props: ListItemProps<D, V>) {
  const {
    action,
    disabled,
    href,
    indicator,
    nested,
    nestedId,
    primary,
    secondary,
    selected,
    variant = 'item',
    onItemClick,
    ...listItemProps
  } = usePropsTransformation(props);

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
    <>
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
            onClick: () => onItemClick?.(props.data as D),
          })}
          data-testid={`ListItem${variant === 'link' ? 'Link' : 'Button'}`}
        >
          {children}
        </MuiListItemButton>
      )}

      {!nested && !nestedId ? null : (
        <MuiListItem
          {...listItemProps}
          id={nestedId}
          data-testid="ListItemNested"
        >
          {nested}
        </MuiListItem>
      )}
    </>
  );
}
