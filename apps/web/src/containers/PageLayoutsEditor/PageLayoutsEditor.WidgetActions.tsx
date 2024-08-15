import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next';

import { ConfirmToggle } from '~web/components';
import type { WidgetActionsProps } from './PageLayoutsEditor.types';

export default function WidgetActions({ name, onRemove }: WidgetActionsProps) {
  const { t } = useTranslation();

  return (
    <ConfirmToggle
      subject={t('ttl-delete-confirm')}
      onConfirm={onRemove}
      message={t('msg-delete-confirm', { name })}
      toggle={
        <Tooltip title={t('btn-delete')}>
          <IconButton color="primary">
            <Core.Icon code="faTrash" />
          </IconButton>
        </Tooltip>
      }
    />
  );
}
