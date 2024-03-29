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
  const { classes } = useMenuStyles();

  const handleItemClick = (label: string) => {
    if (label === 'app:btn-signout') {
      signout();
    } else if (label.startsWith('app:btn-signin-with-')) {
      signin(label.replace(/^.+-/, '') as SigninMethod);
    }

    setOpen(false);
  };

  return (
    <>
      <IconButton size="large" onClick={() => setOpen(true)}>
        {!isAuthenticated ? (
          <Display.Icon code="faUser" />
        ) : (
          <Avatar className={classes.thumb} />
        )}
      </IconButton>

      <MenuDialog
        open={open}
        title="app:ttl-user-options"
        indicator={<Display.Icon code="faTerminal" />}
        items={[
          ...USER_MENU_ITEMS.map((item) =>
            item.auth !== false && !isAuthenticated ? null : item
          ),
          isAuthenticated
            ? {
                indicator: <Display.Icon code="faArrowRightFromBracket" />,
                label: 'app:btn-signout',
              }
            : {
                indicator: <Display.Icon code="faArrowRightToBracket" />,
                label: 'app:btn-signin',
                items: SIGNIN_OPTIONS,
              },
        ]}
        onClose={() => setOpen(false)}
        onItemClick={handleItemClick}
      />
    </>
  );
}
