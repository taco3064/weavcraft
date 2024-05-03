import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { useId, useState } from 'react';

import ListItem from '../ListItem';
import { withStoreProps, type GenericData } from '../../contexts';
import type { MenuItemVariant, MenuProps } from './Menu.types';

export default (<D extends GenericData, V extends MenuItemVariant>() =>
  withStoreProps<D, MenuProps<D, V>>(function Menu({
    toggle,
    itemProps,
    itemVariant,
    records,
    onItemClick,
    ...props
  }) {
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
          {...props}
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
  }))();
