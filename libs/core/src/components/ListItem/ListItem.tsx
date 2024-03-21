import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';
import MuiToolbar from '@mui/material/Toolbar';

import {
  useComponentData,
  withGenerateDataProps,
  type GenericData,
} from '../../contexts';
import { useUrlValidation } from '../../hooks';

import type {
  MappablePropNames,
  ListItemProps,
  ListItemVariant,
} from './ListItem.types';

export default withGenerateDataProps<
  ListItemProps<ListItemVariant, any>,
  MappablePropNames
>(function ListItem<D extends GenericData>({
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
  ...props
}: ListItemProps<ListItemVariant, D>) {
  const data = useComponentData<D>();
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
        <MuiListItem {...props} data-testid="ListItem">
          {children}
        </MuiListItem>
      ) : (
        <MuiListItemButton
          {...props}
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

      {!nested && !nestedId ? null : (
        <MuiListItem disableGutters id={nestedId} data-testid="ListItemNested">
          {nested}
        </MuiListItem>
      )}
    </>
  );
});
