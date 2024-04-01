import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { Display } from '@weavcraft/core';
import { Trans, useTranslation } from 'next-i18next';
import { createPortal } from 'react-dom';
import { nanoid } from 'nanoid';
import { useState, type FormEventHandler } from 'react';

import { useFilterStyles } from './HierarchyList.styles';
import type { FilterProps } from './HierarchyList.types';

export default function HierarchyFilter({
  containerEl,
  onSearch,
}: FilterProps) {
  const [renderKey, setRenderKey] = useState(nanoid());
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { classes } = useFilterStyles();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);

    e.preventDefault();

    onSearch({
      keyword: formData.get('keyword')?.toString().trim() || undefined,
    });
  };

  return !containerEl ? null : (
    <>
      <Tooltip title={<Trans i18nKey="btn-search" />}>
        <IconButton color="secondary" onClick={() => setOpen(!open)}>
          <Display.Icon code="faSearch" />
        </IconButton>
      </Tooltip>

      {createPortal(
        <Collapse
          key={renderKey}
          in={open}
          className={classes.root}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            variant="filled"
            size="small"
            name="keyword"
            placeholder={t('msg-filter-placeholder')}
            InputProps={{
              className: classes.input,
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title={<Trans i18nKey="btn-clear-filter" />}>
                    <IconButton
                      onClick={() => {
                        onSearch({});
                        setRenderKey(nanoid());
                      }}
                    >
                      <Display.Icon code="faXmark" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Collapse>,
        containerEl
      )}
    </>
  );
}
