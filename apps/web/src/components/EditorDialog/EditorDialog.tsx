import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Core from '@weavcraft/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'next-i18next';
import type { FormEventHandler } from 'react';

import type { EditorDialogProps } from './EditorDialog.types';

export default function EditorDialog({
  TransitionComponent,
  children,
  icon,
  maxWidth = 'xs',
  open,
  title,
  onClose,
  onSubmit,
}: EditorDialogProps) {
  const { t } = useTranslation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(new FormData(e.currentTarget));
  };

  return (
    <Dialog
      {...{ TransitionComponent, maxWidth, open, onClose }}
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      {(icon || title) && (
        <DialogTitle>
          {icon && <Core.Icon code={icon} />}
          {title}
        </DialogTitle>
      )}

      <DialogContent>{children}</DialogContent>

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
