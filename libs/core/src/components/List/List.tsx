import MuiList from '@mui/material/List';
import MuiListSubheader from '@mui/material/ListSubheader';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';

import Icon from '../Icon';
import ListItem, { type ListItemVariant } from '../ListItem';
import { useSlotPropsTransformation } from '../../hooks';
import type { GenericData } from '../../types';
import type { ListProps } from './List.types';

export default function List<
  D extends GenericData,
  V extends ListItemVariant = 'item'
>({
  //* Subheader
  title,
  icon,
  action,
  disableSubheaderSticky,
  disableSubheaderGutters,

  //* ListItem
  itemAction,
  itemIndicator,
  itemProps,
  itemVariant,
  items = [],
  onItemActionClick,
  onItemIndicatorClick,

  //* List
  ...props
}: ListProps<D, V>) {
  const ItemAction = useSlotPropsTransformation(itemAction, onItemActionClick);

  const ItemIndicator = useSlotPropsTransformation(
    itemIndicator,
    onItemIndicatorClick
  );

  return (
    <MuiList
      {...props}
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
                {icon && <Icon {...icon} fontSize="inherit" />}
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
      {items.map((item, i) => (
        <ListItem
          {...itemProps}
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
