import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { Display } from '@weavcraft/core';
import { Trans, useTranslation } from 'next-i18next';
import { forwardRef } from 'react';
import { useRouter } from 'next/router';

import { ConfirmToggle, Link, PortalToolbar } from '~web/components';
import { useToolbarStyles } from './HierarchyList.styles';
import type { HierarchyToolbarProps } from './HierarchyList.types';

export default forwardRef<HTMLDivElement, HierarchyToolbarProps>(
  function HierarchyToolbar(
    {
      category,
      children,
      disableGroup = false,
      isInTutorial,
      toolbarEl,
      onAdd,
      onMoveToSuperiorFolder,
    },
    ref
  ) {
    const { t } = useTranslation();
    const { push } = useRouter();
    const { classes } = useToolbarStyles();

    const categoryLabel = t(`ttl-breadcrumbs.${category}.label`);

    return (
      <>
        <PortalToolbar variant="dense" containerEl={toolbarEl}>
          {!isInTutorial && (
            <ConfirmToggle
              severity="info"
              subject={t('ttl-navigation-confirm')}
              message={t('msg-tutorial-confirm', {
                name: t(`ttl-breadcrumbs.${category}.label`),
              })}
              onConfirm={() => push(`/tutorials/${category}`)}
              toggle={
                <Tooltip title={t('btn-tutorial')}>
                  <IconButton
                    LinkComponent={Link}
                    href={`/tutorials/${category}`}
                  >
                    <Display.Icon code="faCircleInfo" />
                  </IconButton>
                </Tooltip>
              }
            />
          )}

          {onMoveToSuperiorFolder && (
            <Tooltip title={t('btn-move-to-superior-folder')}>
              <IconButton color="warning" onClick={onMoveToSuperiorFolder}>
                <Display.Icon code="faArrowUpFromBracket" />
              </IconButton>
            </Tooltip>
          )}

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
