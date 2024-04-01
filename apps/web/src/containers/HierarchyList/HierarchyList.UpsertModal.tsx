import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Display } from '@weavcraft/core';
import { Trans, useTranslation } from 'next-i18next';
import { useEffect, useState, type FormEventHandler } from 'react';

import type {
  MutationMode,
  UpsertedData,
  UpsertModalProps,
} from './HierarchyList.types';

export default function UpsertModal({
  data,
  icon,
  title,
  onClose,
  onUpsertSuccess,
}: UpsertModalProps) {
  const [hierarchy, setHierarchy] = useState<UpsertedData>();

  const { t } = useTranslation();
  const mode: MutationMode = data?._id ? 'update' : 'create';
  const categoryLabel = t(`ttl-breadcrumbs.${data?.category}.label`);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
          label={<Trans i18nKey="lbl-description" />}
        />
      </DialogContent>

      <ButtonGroup
        component={DialogActions}
        fullWidth
        size="large"
        variant="contained"
        onClick={onClose}
      >
        <Button
          color="inherit"
          startIcon={<Display.Icon code="faClose" />}
          onClick={() => setHierarchy(undefined)}
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
