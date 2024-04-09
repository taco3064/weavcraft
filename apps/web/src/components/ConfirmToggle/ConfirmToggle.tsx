import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Trans } from 'next-i18next';
import { isValidElement, cloneElement, useState, type MouseEvent } from 'react';

import { useToggleStyles } from './ConfirmToggle.styles';
import type { ConfirmToggleProps } from './ConfirmToggle.types';

export default function ConfirmToggle({
  message,
  severity = 'warning',
  subject,
  toggle,
  onConfirm,
}: ConfirmToggleProps) {
  const { classes } = useToggleStyles();
  const [open, setOpen] = useState(false);

  return !isValidElement(toggle) ? null : (
    <>
      {cloneElement(toggle, {
        onClick: (e: MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen(true);
        },
      })}

      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ className: classes.root }}
      >
        <Alert
          severity={severity}
          action={
            <Button variant="text" color={severity} onClick={onConfirm}>
              <Trans i18nKey="btn-confirm" />
            </Button>
          }
        >
          {subject && <AlertTitle>{subject}</AlertTitle>}
          {message}
        </Alert>
      </Dialog>
    </>
  );
}
