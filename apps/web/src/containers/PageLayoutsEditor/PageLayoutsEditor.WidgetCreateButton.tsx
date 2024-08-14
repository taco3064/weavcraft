import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import _get from 'lodash/get';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import { AddIconButton, MenuDialog } from '~web/components';
import { EnumHierarchyType } from '~web/services';
import { NAV_ITEMS } from '~web/hooks';
import { useWidgetCreate } from './PageLayoutsEditor.hooks';
import type { WidgetCreateButtonProps } from './PageLayoutsEditor.types';

export default function WidgetCreateButton({
  onCreate,
}: WidgetCreateButtonProps) {
  const { t } = useTranslation();
  const title = t('pages:btn-add-widget');

  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const { hierarchies, onItemClick } = useWidgetCreate(title, (id, widget) =>
    startTransition(() => {
      onCreate(_get(widget, ['id']) as string, widget);
      setOpen(false);
    })
  );

  return (
    <>
      <Tooltip title={title}>
        <IconButton color="primary" size="large" onClick={() => setOpen(true)}>
          <Core.Icon code="faAdd" />
        </IconButton>
      </Tooltip>

      <MenuDialog
        {...{ open, title, onItemClick }}
        onClose={() => setOpen(false)}
        items={
          hierarchies.map(({ type, title, payloadId }) => ({
            label: title,
            icon:
              type === EnumHierarchyType.GROUP
                ? 'faFolder'
                : NAV_ITEMS.widgets.icon,
          })) || []
        }
      />
    </>
  );
}
