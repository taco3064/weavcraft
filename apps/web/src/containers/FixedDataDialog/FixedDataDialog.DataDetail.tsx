import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import _isEmpty from 'lodash/isEmpty';
import { JSONTree } from 'react-json-tree';
import { useTranslation } from 'next-i18next';

import { ConfirmToggle } from '~web/components';
import type { DataDetailProps } from './FixedDataDialog.types';

export default function DataDetail({
  data,
  onAdd,
  onEdit,
  onRemove,
}: DataDetailProps) {
  const { t } = useTranslation();

  return (
    <>
      <Toolbar
        disableGutters
        variant="dense"
        sx={{ justifyContent: 'flex-end' }}
      >
        {!_isEmpty(data) && !Array.isArray(data) ? (
          <Button
            color="info"
            size="small"
            variant="outlined"
            startIcon={<Core.Icon code="faEdit" />}
            onClick={() => onEdit(data)}
          >
            {t('widgets:btn-edit.fixed-data')}
          </Button>
        ) : (
          <Button
            color="info"
            size="small"
            variant="outlined"
            startIcon={<Core.Icon code="faPlus" />}
            onClick={onAdd}
          >
            {t('widgets:btn-add.fixed-data')}
          </Button>
        )}
      </Toolbar>

      {_isEmpty(data) ? (
        <Typography
          variant="subtitle1"
          color="text.disabled"
          justifyContent="center"
          fontWeight={600}
          lineHeight={3}
        >
          {t('widgets:msg-no-fixed-data')}
        </Typography>
      ) : (
        <JSONTree
          hideRoot
          theme="monokai"
          data={data}
          shouldExpandNodeInitially={() => true}
          labelRenderer={(keyPath) => {
            const index = keyPath[0] as number;

            const showActions =
              keyPath.length === 1 && typeof keyPath[0] === 'number';

            return !showActions ? (
              `${keyPath[0]}:`
            ) : (
              <ConfirmToggle
                triggerBy="onDelete"
                subject={t('ttl-delete-confirm')}
                onConfirm={() => onRemove(index)}
                message={t('widgets:msg-delete-confirm.fixed-data')}
                toggle={
                  <Tooltip title={t('widgets:btn-edit.fixed-data')}>
                    <Chip
                      color="warning"
                      label={t('widgets:lbl-row', { row: index + 1 })}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(index);
                      }}
                    />
                  </Tooltip>
                }
              />
            );
          }}
        />
      )}
    </>
  );
}
