import MuiList from '@mui/material/List';
import MuiListSubheader from '@mui/material/ListSubheader';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import type { JsonObject } from 'type-fest';

import Icon from '../Icon';
import ListItem, { type ListItemVariant } from '../ListItem';
import { useSlotElement, useStoreProps } from '../../hooks';
import type { ListProps } from './List.types';

export default function List<
  D extends JsonObject,
  V extends ListItemVariant = ListItemVariant
>(props: ListProps<D, V>) {
  const {
    //* - Subheader
    title,
    icon,
    action,
    disableSubheaderSticky,
    disableSubheaderGutters,

    //* - ListItem
    itemProps,
    itemVariant,
    records = [],

    onItemClick,
    onItemActionClick,
    onItemIndicatorClick,

    ...listProps
  } = useStoreProps(props);

  const ItemAction = useSlotElement(itemProps?.action, onItemActionClick);

  const ItemIndicator = useSlotElement(
    itemProps?.indicator,
    onItemIndicatorClick
  );

  return (
    <MuiList
      {...listProps}
      data-testid="List"
      subheader={
        ![title, icon, action].some(Boolean) ? null : (
          <MuiListSubheader
            disableSticky={disableSubheaderSticky}
            disableGutters={disableSubheaderGutters}
            data-testid="ListSubheader"
          >
            <MuiToolbar disableGutters variant="dense">
              <MuiTypography
                variant="subtitle1"
                color="primary"
                display="flex"
                gap={8}
                marginRight="auto"
              >
                {icon && (
                  <Icon code={icon} color="inherit" fontSize="inherit" />
                )}
                {title}
              </MuiTypography>

              <MuiToolbar disableGutters variant="dense">
                {action}
              </MuiToolbar>
            </MuiToolbar>
          </MuiListSubheader>
        )
      }
    >
      {records.map((item, i) => (
        <ListItem
          {...itemProps}
          {...(itemVariant === 'button' && { onItemClick })}
          key={i}
          variant={itemVariant || 'item'}
          data={item}
          indicator={
            ItemIndicator.Slot && (
              <ItemIndicator.Slot {...ItemIndicator.getSlotProps(item)} />
            )
          }
          action={
            ItemAction.Slot && (
              <ItemAction.Slot {...ItemAction.getSlotProps(item)} />
            )
          }
        />
      ))}
    </MuiList>
  );
}
