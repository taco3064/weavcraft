import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Display } from '@weavcraft/core';
import { useState } from 'react';

import { MenuDialog } from '~web/components';
import { SIGNIN_OPTIONS } from '../UserSettings';
import { USER_MENU_ITEMS } from './MainLayout.const';
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
        indicator={<Display.Icon code="faTerminal" />}
        onClose={() => setOpen(false)}
        onItemClick={handleItemClick}
        items={[
          ...USER_MENU_ITEMS.map((item) =>
            item.auth !== false && !isAuthenticated ? null : item
          ),
          isAuthenticated
            ? {
                indicator: <Display.Icon code="faArrowRightFromBracket" />,
                label: 'btn-signout',
              }
            : {
                indicator: <Display.Icon code="faArrowRightToBracket" />,
                label: 'btn-signin',
                items: SIGNIN_OPTIONS,
              },
        ]}
      />
    </>
  );
}
