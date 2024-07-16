import Avatar from '@mui/material/Avatar';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import { useMemo, useState } from 'react';

import { MenuDialog } from '~web/components';
import { USER_SETTINGS } from '../UserSettings';
import { useAuth } from '~web/contexts';
import { useSigninOptions } from '~web/hooks';
import { useMenuStyles } from './MainLayout.styles';
import type { MenuItemOptions, SigninProvider } from '../imports.types';

export default function UserAvatarMenu() {
  const [open, setOpen] = useState(false);

  const {
    options: signinOptions,
    onSignin,
    ...options
  } = useSigninOptions(!open);
  const { isAuthenticated, onSignout, ...auth } = useAuth();
  const { classes } = useMenuStyles({ isAuthenticated });

  const isLoading = [options, auth].some(({ isLoading }) => isLoading);

  const settings = useMemo(
    () =>
      USER_SETTINGS.reduce<MenuItemOptions[]>((acc, { id, icon, auth }) => {
        const label = `lbl-${id}`;
        const href = `/user-settings/${id}`;

        if (!auth || isAuthenticated) {
          acc.push({ icon, label, href });
        }

        return acc;
      }, []),
    [isAuthenticated]
  );

  const handleItemClick = (label: string) => {
    if (label === 'btn-signout') {
      onSignout();
    } else if (label.startsWith('btn-signin-with-')) {
      onSignin(label.replace(/^btn-signin-with-/, '') as SigninProvider);
    }

    setOpen(false);
  };

  return (
    <>
      <IconButton size="large" sx={{ p: 0 }} onClick={() => setOpen(true)}>
        <Avatar className={classes.thumb} />
      </IconButton>

      <MenuDialog
        isLoading={isLoading}
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
                items: signinOptions,
              },
        ]}
      />
    </>
  );
}
