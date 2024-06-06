import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Core from '@weavcraft/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import _set from 'lodash/set';
import { useEffect, useState, type FormEventHandler } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'next-i18next';

import { createHierarchyData, updateHierarchyData } from '~web/services';
import { useTutorialMode } from '~web/contexts';

import type {
  MutationMode,
  UpsertedData,
  UpsertDialogProps,
} from './HierarchyList.types';

export default function UpsertDialog<P>({
  data,
  icon,
  title,
  onClose,
  onSuccess,
}: UpsertDialogProps<P>) {
  const [hierarchy, setHierarchy] = useState<UpsertedData<P>>();

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const isTutorialMode = useTutorialMode();
  const categoryLabel = t(`ttl-breadcrumbs.${data?.category}.label`);

  const mutation = {
    create: useMutation({
      mutationFn: createHierarchyData,
      onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
      onSuccess: (data) => {
        onClose();
        onSuccess('create', data);

        enqueueSnackbar(t('msg-success-create', { name: data.title }), {
          variant: 'success',
        });
      },
    }),
    update: useMutation({
      mutationFn: updateHierarchyData,
      onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
      onSuccess: (data) => {
        onClose();
        onSuccess('update', data);

        enqueueSnackbar(t('msg-success-update', { name: data.title }), {
          variant: 'success',
        });
      },
    }),
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (data) {
      const formdata = new FormData(e.currentTarget);
      const mode: MutationMode = data?.id ? 'update' : 'create';
      const mutate = mutation[mode].mutate;
      const input = { ...data } as Parameters<typeof mutate>[0]['input'];

      formdata.forEach((value, key) => _set(input, key, value));
      mutate({ input, isTutorialMode });
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
          <Core.Icon code={icon} />
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
          label={t(`lbl-hierarchy-name.${data?.type}`, {
            category: categoryLabel,
          })}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          color="secondary"
          name="description"
          defaultValue={data?.description}
          label={t('lbl-description')}
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
          onClick={() => {
            setHierarchy(undefined);
            onClose();
          }}
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
