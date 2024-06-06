import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next';

import { ConfirmToggle } from '~web/components';
import type { ActionProps } from './ElementNodeList.types';

export default function Action({
  config,
  paths,
  onDelete,
  onEdit,
}: ActionProps) {
  const { t } = useTranslation();
  const { widget } = config;

  return (
    <Toolbar
      disableGutters
      variant="dense"
      onClick={(e) => e.stopPropagation()}
    >
      <ConfirmToggle
        subject={t('ttl-delete-confirm')}
        onConfirm={() => onDelete({ target: config, paths })}
        message={t('widgets:msg-delete-widget-confirm', {
          widget: t(`widgets:lbl-widgets.${widget}`),
        })}
        toggle={
          <Tooltip title={t('widgets:btn-delete-widget')}>
            <IconButton>
              <Core.Icon code="faTrash" color="disabled" />
            </IconButton>
          </Tooltip>
        }
      />

      <Tooltip title={t('widgets:btn-edit-widget')}>
        <IconButton
          color="info"
          onClick={(e) => {
            e.stopPropagation();
            onEdit({ target: config, paths });
          }}
        >
          <Core.Icon code="faGear" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
