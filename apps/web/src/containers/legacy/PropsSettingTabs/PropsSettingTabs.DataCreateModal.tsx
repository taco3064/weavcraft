import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Core from '@weavcraft/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import { Trans } from 'next-i18next';
import { useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import type { JsonObject } from 'type-fest';

import { PrimitiveFields } from '~web/components';
import { useDataCreate } from './PropsSettingTabs.hooks';
import type { DataCreateModalProps } from './PropsSettingTabs.types';

export default function DataCreateModal({
  basePropPath,
  bindingFields,
  data,
  open,
  widget,
  onChange,
  onClose,
}: DataCreateModalProps) {
  const dataFields = useDataCreate(widget, basePropPath, bindingFields);
  const [input, setInput] = useState<JsonObject>(data || {});

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();

    if (!_isEmpty(input)) {
      onChange(input);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
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

      <DialogContent>
        {dataFields.map(([fieldName, { type, definition, required }]) => {
          const { [type]: render } = PrimitiveFields;

          return render(
            {
              label: fieldName,
              name: fieldName,
              required,
              size: 'small',
              value: _get(input, fieldName, ''),
              variant: 'outlined',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange: (value: any) =>
                setInput({ ..._set(input, fieldName, value) }),
            },
            definition as never
          );
        })}
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
