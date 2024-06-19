import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Core from '@weavcraft/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'next-i18next';
import type { FormEventHandler } from 'react';

import type { FieldModifyDialogProps } from './DataStructureView.types';

export default function FieldModifyDialog({
  open,
  title,
  value,
  onClose,
  onConfirm,
}: FieldModifyDialogProps) {
  const { t } = useTranslation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formdata = new FormData(e.currentTarget);

    e.preventDefault();
    onConfirm(formdata.get('fieldPath') as string);
  };

  return (
    <Dialog
      {...{ open, onClose }}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        <Core.Icon code="faBezierCurve" />
        {title}
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          required
          key={open ? 'open' : 'close'}
          color="secondary"
          name="fieldPath"
          label={t('widgets:lbl-field-path')}
          defaultValue={value}
          inputProps={{
            pattern: '[a-zA-Z0-9 ,@&\\.\\-\\(\\)\\u4e00-\\u9fa5]*',
          }}
        />
      </DialogContent>

      <ButtonGroup
        component={DialogActions}
        fullWidth
        size="large"
        variant="contained"
      >
        <Button
          color="inherit"
          startIcon={<Core.Icon code="faClose" />}
          onClick={onClose}
        >
          {t('btn-cancel')}
        </Button>

        <Button
          color="secondary"
          type="submit"
          startIcon={<Core.Icon code="faCheck" />}
        >
          {t('btn-confirm')}
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}
