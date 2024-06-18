import Badge from '@mui/material/Badge';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

import { MenuDialog } from '~web/components';
import type { Notifications } from '../containers.types';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const [notifications] = useState<Notifications>({
    total: 0,
    unread: 0,
    items: [],
  });

  return !notifications.total ? null : (
    <>
      <Badge badgeContent={notifications.unread} color="error">
        <IconButton size="large" onClick={() => setOpen(true)}>
          <Core.Icon code="faBell" />
        </IconButton>
      </Badge>

      <MenuDialog items={[]} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
