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
    if (data) {
      setHierarchy(data);
    }
  }, [data]);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={Boolean(hierarchy)}
      onClose={() => setHierarchy(undefined)}
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
          label={t(`lbl-hierarchy-name.${data?.type}`, {
            category: categoryLabel,
          })}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          maxRows={3}
          name="description"
          label={t('lbl-description')}
        />
      </DialogContent>

      <DialogActions>Actions</DialogActions>
    </Dialog>
  );
}
