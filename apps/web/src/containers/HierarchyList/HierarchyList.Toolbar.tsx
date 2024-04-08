import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { Display } from '@weavcraft/core';
import { Trans, useTranslation } from 'next-i18next';
import { forwardRef } from 'react';

import { PortalToolbar } from '~web/components';
import { useToolbarStyles } from './HierarchyList.styles';
import type { HierarchyToolbarProps } from './HierarchyList.types';

export default forwardRef<HTMLDivElement, HierarchyToolbarProps>(
  function HierarchyToolbar(
    { category, children, disableGroup, toolbarEl, onAdd },
    ref
  ) {
    const { t } = useTranslation();
    const { classes } = useToolbarStyles();

    const categoryLabel = t(`ttl-breadcrumbs.${category}.label`);

    return (
      <>
        <PortalToolbar variant="dense" containerEl={toolbarEl}>
          {!disableGroup && (
            <Tooltip title={<Trans i18nKey="btn-add-group" />}>
              <IconButton
                color="warning"
                onClick={() =>
                  onAdd({
                    title: t('btn-add-group'),
                    icon: 'faFolderPlus',
                    data: { category, type: 'group' },
                  })
                }
              >
                <Display.Icon code="faFolderPlus" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title={t('btn-add-item', { category: categoryLabel })}>
            <IconButton
              color="primary"
              onClick={() =>
                onAdd({
                  title: t('btn-add-item', { category: categoryLabel }),
                  icon: 'faPlus',
                  data: { category, type: 'item' },
                })
              }
            >
              <Display.Icon code="faPlus" />
            </IconButton>
          </Tooltip>

          {children}
        </PortalToolbar>

        <Toolbar ref={ref} variant="dense" className={classes.filter} />
      </>
    );
  }
);
