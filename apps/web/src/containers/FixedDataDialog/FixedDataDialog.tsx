import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Core from '@weavcraft/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { JsonObject } from 'type-fest';

import DataDetail from './FixedDataDialog.DataDetail';
import EditorDialog from './FixedDataDialog.DataEditorDialog';
import { ConfirmToggle } from '~web/components';
import { useDataModifyProps, useFixedData } from './FixedDataDialog.hooks';
import type { FixedDataDialogProps } from './FixedDataDialog.types';

export default function FixedDataDialog({
  config,
  onDataChange,
}: FixedDataDialogProps) {
  const { t } = useTranslation();

  const fixedData = useFixedData(config);
  const stringify = JSON.stringify(fixedData);

  const [detailOpen, setDetailOpen] = useState(false);
  const [value, setValue] = useState<JsonObject | JsonObject[]>();

  const [{ open: editorOpen, ...editorProps }, detailProps] =
    useDataModifyProps(value as typeof fixedData, setValue);

  useEffect(() => {
    if (detailOpen) {
      setValue(JSON.parse(stringify));

      return () => setValue(undefined);
    }
  }, [stringify, detailOpen]);

  return (
    <>
      <ButtonGroup fullWidth color="error" size="large" variant="contained">
        <Button onClick={() => setDetailOpen(true)}>
          {t('widgets:btn-fixed-data')}
        </Button>

        <ConfirmToggle
          subject={t('ttl-delete-confirm')}
          onConfirm={() => onDataChange()}
          message={t('widgets:msg-delete-confirm.clear-fixed-data')}
          toggle={
            <Button
              disabled={_isEmpty(fixedData)}
              fullWidth={false}
              sx={{ opacity: 0.8 }}
            >
              <Core.Icon code="faTrash" />
            </Button>
          }
        />
      </ButtonGroup>

      <EditorDialog {...editorProps} config={config} open={editorOpen} />

      <Dialog
        fullWidth
        maxWidth="xs"
        open={detailOpen && !editorOpen}
        onClose={() => setDetailOpen(false)}
      >
        <DialogTitle>
          <Core.Icon code="faDatabase" />
          {t('widgets:ttl-source-mode.Fixed')}
        </DialogTitle>

        <DialogContent>
          <DataDetail
            {...detailProps}
            data={value as JsonObject | JsonObject[]}
          />
        </DialogContent>

        <ButtonGroup
          fullWidth
          variant="contained"
          size="large"
          component={DialogActions}
        >
          <Button
            color="inherit"
            startIcon={<Core.Icon code="faClose" />}
            onClick={() => setDetailOpen(false)}
          >
            {t('btn-cancel')}
          </Button>

          <Button
            color="secondary"
            disabled={_isEqual(fixedData, value)}
            startIcon={<Core.Icon code="faCheck" />}
            onClick={() => {
              setDetailOpen(false);
              onDataChange(value);
            }}
          >
            {t('btn-done')}
          </Button>
        </ButtonGroup>
      </Dialog>
    </>
  );
}
