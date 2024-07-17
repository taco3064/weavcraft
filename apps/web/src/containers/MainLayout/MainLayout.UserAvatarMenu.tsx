import Avatar from '@mui/material/Avatar';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import { useMemo } from 'react';

import { MenuDialog } from '~web/components';
import { USER_SETTINGS } from '../UserSettings';
import { useAuthState } from '~web/contexts';
import { useAuthMutation } from '~web/hooks';
import { useMenuStyles } from './MainLayout.styles';
import type { MenuItemOptions, SigninProvider } from '../imports.types';
import type { UserAvatarMenuProps } from './MainLayout.types';

export default function UserAvatarMenu({
  isPending,
  open,
  providers,
  onSignin,
  onSignout,
  onToggle,
}: UserAvatarMenuProps) {
  const { isAuth } = useAuthState();
  const { classes } = useMenuStyles({ isAuth });

  const settings = useMemo(
    () =>
      USER_SETTINGS.reduce<MenuItemOptions[]>((acc, { id, icon, auth }) => {
        const label = `lbl-${id}`;
        const href = `/user-settings/${id}`;

        if (!auth || isAuth) {
          acc.push({ icon, label, href });
        }

        return acc;
      }, []),
    [isAuth]
  );

  const handleItemClick = (label: string) => {
    if (label === 'btn-signout') {
      onSignout();
    } else if (label.startsWith('btn-signin-with-')) {
      onSignin(label.replace(/^btn-signin-with-/, '') as SigninProvider);
    }

    onToggle(false);
  };

  return (
    <>
      <IconButton size="large" sx={{ p: 0 }} onClick={() => onToggle(true)}>
        <Avatar className={classes.thumb} />
      </IconButton>

      <MenuDialog
        isLoading={isPending}
        open={open}
        title="ttl-user-options"
        indicator={<Core.Icon code="faTerminal" />}
        onClose={() => onToggle(false)}
        onItemClick={handleItemClick}
        items={[
          ...settings,
          settings.length > 1 ? 'divider' : null,
          isAuth
            ? {
                icon: 'faArrowRightFromBracket',
                label: 'btn-signout',
              }
            : {
                icon: 'faArrowRightToBracket',
                label: 'btn-signin',
                items: providers,
              },
        ]}
      />
    </>
  );
}
