import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { Display } from '@weavcraft/core';
import { Trans, useTranslation } from 'next-i18next';
import { useState, type FormEvent } from 'react';

import { useFilterStyles } from './HierarchyList.styles';
import type { FilterToggleProps } from './HierarchyList.types';

export default function FilterToggle({
  containerEl,
  renderKey,
  values,
  onSearch,
}: FilterToggleProps) {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { classes } = useFilterStyles();

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e?.currentTarget);
    const keyword = formData.get('keyword')?.toString().trim() || undefined;

    e?.preventDefault();
    setOpen(false);

    if (values.keyword !== keyword) {
      onSearch({ ...values, keyword });
    }
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
        <DialogTitle>
          <Display.Icon code="faSearch" />

          <Trans
            i18nKey="ttl-hierarchy-search"
            values={{ name: t(`ttl-breadcrumbs.${values.category}.label`) }}
          />
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            variant="filled"
            size="small"
            margin="none"
            name="keyword"
            placeholder={t('msg-filter-placeholder')}
            defaultValue={values?.keyword || ''}
            InputProps={{
              className: classes.input,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleSubmit()}>
                    <Display.Icon code="faUndo" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>

        <ButtonGroup
          fullWidth
          variant="contained"
          size="large"
          component={DialogActions}
        >
          <Button
            color="inherit"
            startIcon={<Display.Icon code="faClose" />}
            onClick={() => setOpen(false)}
          >
            <Trans i18nKey="btn-cancel" />
          </Button>

          <Button
            color="secondary"
            startIcon={<Display.Icon code="faFilter" />}
            type="submit"
          >
            <Trans i18nKey="btn-filter" />
          </Button>
        </ButtonGroup>
      </Dialog>
    </>
  );
}
