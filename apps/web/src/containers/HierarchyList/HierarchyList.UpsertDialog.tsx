import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import _set from 'lodash/set';
import { Display } from '@weavcraft/core';
import { Trans, useTranslation } from 'next-i18next';
import { useEffect, useState, type FormEventHandler } from 'react';

import type {
  MutationMode,
  UpsertedData,
  UpsertDialogProps,
} from './HierarchyList.types';

export default function UpsertDialog({
  data,
  icon,
  title,
  onClose,
  onUpsertSuccess,
}: UpsertDialogProps) {
  const [hierarchy, setHierarchy] = useState<UpsertedData>();

  const { t } = useTranslation();
  const categoryLabel = t(`ttl-breadcrumbs.${data?.category}.label`);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (data) {
      const formdata = new FormData(e.currentTarget);
      const mode: MutationMode = data?._id ? 'update' : 'create';
      const upserted: UpsertedData = { ...data };

      formdata.forEach((value, key) => _set(upserted, key, value));
      console.log(mode, upserted);
    }
  };

  useEffect(() => {
    setHierarchy(data);
  }, [data]);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={Boolean(hierarchy)}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      {!icon && !title ? null : (
        <DialogTitle>
          <Display.Icon code={icon} />
          {title}
        </DialogTitle>
      )}

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          required
          color="secondary"
          name="title"
          defaultValue={data?.title}
          label={
            <Trans
              i18nKey={`lbl-hierarchy-name.${data?.type}`}
              values={{
                category: categoryLabel,
              }}
            />
          }
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          color="secondary"
          name="description"
          defaultValue={data?.description}
          label={<Trans i18nKey="lbl-description" />}
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
          startIcon={<Display.Icon code="faClose" />}
          onClick={() => {
            setHierarchy(undefined);
            onClose();
          }}
        >
          <Trans i18nKey="btn-cancel" />
        </Button>

        <Button
          color="secondary"
          type="submit"
          startIcon={<Display.Icon code="faCheck" />}
        >
          <Trans i18nKey="btn-confirm" />
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}
