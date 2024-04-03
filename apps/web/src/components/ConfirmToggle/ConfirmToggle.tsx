import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Trans } from 'next-i18next';
import { forwardRef, isValidElement, cloneElement, useState } from 'react';

import { useToggleStyles } from './ConfirmToggle.styles';
import type { ConfirmToggleProps } from './ConfirmToggle.types';

export default forwardRef<HTMLButtonElement, ConfirmToggleProps>(
  function ConfirmToggle(
    { message, severity = 'warning', subject, toggle, onConfirm },
    ref
  ) {
    const { classes } = useToggleStyles();
    const [open, setOpen] = useState(false);

    return !isValidElement(toggle) ? null : (
      <>
        {cloneElement(toggle, { ref, onClick: () => setOpen(true) })}
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
);
