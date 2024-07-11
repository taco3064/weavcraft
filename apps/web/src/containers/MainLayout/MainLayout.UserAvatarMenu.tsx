import Avatar from '@mui/material/Avatar';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import { useMemo, useState } from 'react';

import { MenuDialog } from '~web/components';
import { USER_SETTINGS } from '../UserSettings';
import { useAuth, SIGNIN_OPTIONS } from '~web/hooks';
import { useMenuStyles } from './MainLayout.styles';
import type { MenuItemOptions, SigninMethod } from '../imports.types';

export default function UserAvatarMenu() {
  const [open, setOpen] = useState(false);

  const { isAuthenticated, signin, signout } = useAuth();
  const { classes } = useMenuStyles({ isAuthenticated });

  const settings = useMemo(
    () =>
      USER_SETTINGS.reduce<MenuItemOptions[]>((acc, { id, icon, auth }) => {
        const label = `lbl-${id}`;
        const href = `/user-settings#${id}`;

        if (!auth || isAuthenticated) {
          acc.push({ icon, label, href });
        }

        return acc;
      }, []),
    [isAuthenticated]
  );

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
          ...settings,
          settings.length > 1 ? 'divider' : null,
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
