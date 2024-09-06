import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

import { MenuDialog } from '~web/components';
import { useAuth, useUserSettings } from '~web/hooks';
import { useMenuStyles } from './MainLayout.styles';
import type { Notifications, SigninProvider } from '../imports.types';
import type { UserAvatarMenuProps } from './MainLayout.types';

export default function UserAvatarMenu({
  isPending,
  open,
  providers,
  onSignin,
  onToggle,
}: UserAvatarMenuProps) {
  const setting = useUserSettings();

  const { t } = useTranslation();
  const { data: session } = useSession();
  const { isAuth, userinfo, onSignout } = useAuth();
  const { classes } = useMenuStyles({ isAuth });

  const [notifications] = useState<Notifications>({
    total: 0,
    unread: 0,
    items: [],
  });

  const handleItemClick = (label: string) => {
    if (label === 'btn-signout') {
      onSignout();
    } else if (label.startsWith('btn-signin-with-')) {
      onSignin(label.replace(/^btn-signin-with-/, '') as SigninProvider);
    }

    onToggle(false);
  };

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      onToggle(true);
    }
  }, [session?.error, onToggle]);

  return (
    <>
      <Tooltip title={t('ttl-user-options')}>
        <Badge
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={notifications.unread}
          color="error"
        >
          <IconButton size="large" sx={{ p: 0 }} onClick={() => onToggle(true)}>
            <Avatar className={classes.thumb} src={userinfo?.avatarUrl} />
          </IconButton>
        </Badge>
      </Tooltip>

      <MenuDialog
        isLoading={isPending}
        open={open}
        title="ttl-user-options"
        indicator={<Core.Icon code="faTerminal" />}
        onClose={() => onToggle(false)}
        onItemClick={handleItemClick}
        items={[
          ...setting.options,
          setting.options.length > 1 ? 'divider' : null,
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
