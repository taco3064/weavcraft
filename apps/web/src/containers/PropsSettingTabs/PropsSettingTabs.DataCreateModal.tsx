import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Core from '@weavcraft/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import _set from 'lodash/set';
import { Trans } from 'next-i18next';
import type { FormEvent, MouseEvent } from 'react';
import type { JsonObject } from 'type-fest';

import { useDataCreate } from './PropsSettingTabs.hooks';
import type { DataCreateModalProps } from './PropsSettingTabs.types';

export default function DataCreateModal({
  bindingFields,
  data,
  open,
  widget,
  onChange,
  onClose,
}: DataCreateModalProps) {
  const dataFields = useDataCreate(widget, bindingFields);

  console.log(TextField, dataFields);

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (e: FormEvent<HTMLFormElement>) => {
          const formdata = new FormData(e.currentTarget);
          const input: JsonObject = {};

          e.preventDefault();
          formdata.forEach((value, key) => _set(input, key, value));
          onChange(input);
          onClose();
        },
      }}
    >
      <DialogTitle>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="inherit" color="inherit">
            <Trans
              i18nKey={data ? 'widgets:btn-edit-data' : 'widgets:btn-add-data'}
            />
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent></DialogContent>

      <ButtonGroup
        fullWidth
        variant="contained"
        size="large"
        component={DialogActions}
      >
        <Button
          color="inherit"
          startIcon={<Core.Icon code="faClose" />}
          onClick={handleClose}
        >
          <Trans i18nKey="btn-cancel" />
        </Button>

        <Button
          color="secondary"
          startIcon={<Core.Icon code="faCheck" />}
          type="submit"
        >
          <Trans i18nKey="btn-confirm" />
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}
