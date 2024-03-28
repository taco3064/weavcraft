import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Display } from '@weavcraft/core';
import { useState } from 'react';

import { MenuDialog } from '~web/components';
import { USER_MENU_ITEMS } from './MainLayout.const';
import { useMenuStyles } from './MainLayout.styles';
import type { UserAvatarMenuProps } from './MainLayout.types';

export default function UserAvatarMenu({
  onSignIn,
  onSignOut,
}: UserAvatarMenuProps) {
  const [open, setOpen] = useState(false);
  const { classes } = useMenuStyles();

  const handleItemClick = (label: string) => {
    if (label === 'app:btn-signout') {
      onSignOut?.();
    } else if (label === 'app:btn-signin') {
      onSignIn?.();
    }
  };

  return (
    <>
      <IconButton size="large" onClick={() => setOpen(true)}>
        {!onSignOut ? (
          <Display.Icon code="faUser" />
        ) : (
          <Avatar className={classes.thumb} />
        )}
      </IconButton>

      <MenuDialog
        open={open}
        title="app:ttl-user-options"
        indicator={<Display.Icon code="faTerminal" />}
        items={USER_MENU_ITEMS.map((item) =>
          item.auth !== false && !onSignOut ? null : item
        )}
        onClose={() => setOpen(false)}
        onItemClick={handleItemClick}
      />
    </>
  );
}
