import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Trans } from 'next-i18next';

import type { ConfirmDialogProps } from './ConfirmDialog.types';

export default function ConfirmDialog({
  TransitionComponent,
  message,
  open,
  severity = 'warning',
  subject,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog
      {...{ TransitionComponent, open }}
      PaperProps={{ sx: { background: 'transparent' } }}
      fullWidth
      maxWidth="xs"
      onClose={(e: MouseEvent) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <Alert
        severity={severity}
        onClick={(e) => e.stopPropagation()}
        action={
          <Button
            variant="text"
            color={severity}
            onClick={(e) => {
              e.stopPropagation();

              onClose();
              onConfirm();
            }}
          >
            <Trans i18nKey="btn-confirm" />
          </Button>
        }
      >
        {subject && <AlertTitle>{subject}</AlertTitle>}
        {message}
      </Alert>
    </Dialog>
  );
}
