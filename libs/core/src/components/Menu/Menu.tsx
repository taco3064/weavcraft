import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { useId, useState } from 'react';

import ListItem from '../ListItem';
import type { MenuItemVariant, MenuProps } from './Menu.types';

import { useGenerateStoreProps, type GenericData } from '../../contexts';

export default function Menu<D extends GenericData, V extends MenuItemVariant>(
  props: MenuProps<D, V>
) {
  const { toggle, itemProps, itemVariant, records, onItemClick, ...menuProps } =
    useGenerateStoreProps(props);

  const { type: Toggle, props: toggleProps } = toggle || {};
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      {Toggle && (
        <Toggle
          {...toggleProps}
          data-testid="MenuToggle"
          id={id}
          onClick={(...e: any[]) => {
            setOpen(true);
            toggleProps?.onClick?.(...e);
          }}
        />
      )}

      <MuiMenu
        {...menuProps}
        anchorEl={() => document.getElementById(id)!}
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            'data-testid': 'Menu',
            onClick: () => setOpen(false),
          } as never,
        }}
      >
        {records?.map((item, i) => (
          <MuiMenuItem
            key={i}
            disableGutters
            onClick={() => onItemClick?.(item)}
          >
            <ListItem
              {...itemProps}
              variant={itemVariant || 'button'}
              data={item}
            />
          </MuiMenuItem>
        ))}
      </MuiMenu>
    </>
  );
}
