import MuiList from '@mui/material/List';
import MuiListSubheader from '@mui/material/ListSubheader';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';

import Icon from '../Icon';
import ListItem, { type ListItemVariant } from '../ListItem';
import type { ListProps, MappablePropNames } from './List.types';

import {
  withStoreProps,
  useComponentSlot,
  type GenericData,
} from '../../contexts';

export default (<D extends GenericData, V extends ListItemVariant>() =>
  withStoreProps<D, ListProps<D, V>, MappablePropNames>(function List({
    //* - Subheader
    title,
    icon,
    action,
    disableSubheaderSticky,
    disableSubheaderGutters,

    //* - ListItem
    itemAction,
    itemIndicator,
    itemProps,
    itemVariant,
    records = [],

    onItemClick,
    onItemActionClick,
    onItemIndicatorClick,

    ...props
  }) {
    const ItemAction = useComponentSlot(itemAction, onItemActionClick);
    const ItemIndicator = useComponentSlot(itemIndicator, onItemIndicatorClick);

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
  }))();
