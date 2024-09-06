import TextField from '@mui/material/TextField';
import _set from 'lodash/set';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'next-i18next';

import { EditorDialog } from '~web/components';
import { createHierarchyData, updateHierarchyData } from '~web/services';
import { useTutorialMode } from '~web/hooks';

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

  useEffect(() => {
    setHierarchy(data);
  }, [data]);

  return (
    <EditorDialog
      {...{ icon, title }}
      open={Boolean(hierarchy)}
      onClose={() => {
        setHierarchy(undefined);
        onClose();
      }}
      onSubmit={(formData) => {
        if (data) {
          const mode: MutationMode = data?.id ? 'update' : 'create';
          const mutate = mutation[mode].mutate;
          const input = { ...data } as Parameters<typeof mutate>[0]['input'];

          formData.forEach((value, key) => _set(input, key, value));
          mutate({ input, isTutorialMode });
        }
      }}
    >
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
    </EditorDialog>
  );
}
