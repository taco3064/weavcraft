import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { Display } from '@weavcraft/core';
import { Trans, useTranslation } from 'next-i18next';
import { useState, type FormEventHandler } from 'react';

import { useFilterStyles } from './HierarchyList.styles';
import type { FilterModalProps } from './HierarchyList.types';

export default function FilterModal({
  containerEl,
  renderKey,
  values,
  onSearch,
}: FilterModalProps) {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { classes } = useFilterStyles();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);

    e.preventDefault();
    setOpen(false);

    onSearch({
      ...values,
      keyword: formData.get('keyword')?.toString().trim() || undefined,
    });
  };

  return !containerEl ? null : (
    <>
      <Tooltip title={<Trans i18nKey="btn-search" />}>
        <IconButton color="primary" onClick={() => setOpen(!open)}>
          <Display.Icon code="faSearch" />
        </IconButton>
      </Tooltip>

      <Dialog
        fullWidth
        keepMounted
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          key: renderKey,
          className: classes.root,
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogContent dividers={false}>
          <TextField
            autoFocus
            fullWidth
            variant="filled"
            size="small"
            margin="none"
            name="keyword"
            placeholder={t('msg-filter-placeholder')}
            defaultValue={values?.keyword || ''}
            InputProps={{ className: classes.input }}
          />
        </DialogContent>

        <Divider />

        <DialogActions>
          <Button
            variant="contained"
            size="large"
            color="error"
            startIcon={<Display.Icon code="faXmark" />}
            onClick={() => {
              setOpen(false);
              onSearch({ ...values, keyword: undefined });
            }}
          >
            <Trans i18nKey="btn-clear" />
          </Button>

          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<Display.Icon code="faSearch" />}
            type="submit"
          >
            <Trans i18nKey="btn-search" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
