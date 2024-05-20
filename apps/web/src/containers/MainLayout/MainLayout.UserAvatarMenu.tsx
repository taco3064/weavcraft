import Avatar from '@mui/material/Avatar';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

import { MenuDialog } from '~web/components';
import { SIGNIN_OPTIONS, USER_MENU_ITEMS } from '~web/hooks';
import { useAuth, type SigninMethod } from '~web/hooks';
import { useMenuStyles } from './MainLayout.styles';

export default function UserAvatarMenu() {
  const [open, setOpen] = useState(false);

  const { isAuthenticated, signin, signout } = useAuth();
  const { classes } = useMenuStyles({ isAuthenticated });

  const handleItemClick = (label: string) => {
    if (label === 'btn-signout') {
      signout();
    } else if (label.startsWith('btn-signin-with-')) {
      signin(label.replace(/^.+-/, '') as SigninMethod);
    }

    setOpen(false);
  };

  return (
    <>
      <IconButton size="large" sx={{ p: 0 }} onClick={() => setOpen(true)}>
        <Avatar className={classes.thumb} />
      </IconButton>

      <MenuDialog
        open={open}
        title="ttl-user-options"
        indicator={<Core.Icon code="faTerminal" />}
        onClose={() => setOpen(false)}
        onItemClick={handleItemClick}
        items={[
          ...USER_MENU_ITEMS.map((item) =>
            item.auth !== false && !isAuthenticated ? null : item
          ),
          isAuthenticated
            ? {
                icon: 'faArrowRightFromBracket',
                label: 'btn-signout',
              }
            : {
                icon: 'faArrowRightToBracket',
                label: 'btn-signin',
                items: SIGNIN_OPTIONS,
              },
        ]}
      />
    </>
  );
}
