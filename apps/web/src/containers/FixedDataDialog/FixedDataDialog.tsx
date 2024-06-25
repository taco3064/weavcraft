import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Core from '@weavcraft/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { useFixedData } from './FixedDataDialog.hooks';
import type { FixedDataDialogProps } from './FixedDataDialog.types';

export default function FixedDataDialog({ config }: FixedDataDialogProps) {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { data, dataPropName } = useFixedData(config);

  return (
    <>
      <ButtonGroup fullWidth color="error" size="large" variant="contained">
        <Button onClick={() => setOpen(true)}>
          {t('widgets:btn-fixed-data')}
        </Button>

        <Button fullWidth={false} sx={{ opacity: 0.8 }}>
          <Core.Icon code="faTrash" />
        </Button>
      </ButtonGroup>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: 'form',
          onSubmit: console.log,
        }}
      >
        <DialogTitle>
          <Core.Icon code="faEdit" />
          {t('widgets:ttl-injection-mode.Fixed')}
        </DialogTitle>

        <DialogContent>Content</DialogContent>

        <ButtonGroup
          fullWidth
          variant="contained"
          size="large"
          component={DialogActions}
        >
          <Button
            color="inherit"
            startIcon={<Core.Icon code="faClose" />}
            onClick={() => setOpen(false)}
          >
            {t('btn-cancel')}
          </Button>

          <Button
            color="secondary"
            startIcon={<Core.Icon code="faCheck" />}
            type="submit"
          >
            {t('btn-confirm')}
          </Button>
        </ButtonGroup>
      </Dialog>
    </>
  );
}
