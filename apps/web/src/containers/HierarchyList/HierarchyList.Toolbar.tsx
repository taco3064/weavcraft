import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { Trans, useTranslation } from 'next-i18next';
import { forwardRef } from 'react';
import { useRouter } from 'next/router';

import { ConfirmToggle, Link } from '~web/components';
import { EnumHierarchyType } from '~web/services';
import { useToolbarStyles } from './HierarchyList.styles';
import { PortalWrapper, useTutorialMode } from '~web/contexts';
import type { HierarchyToolbarProps } from './HierarchyList.types';

export default forwardRef<HTMLDivElement, HierarchyToolbarProps>(
  function HierarchyToolbar(
    {
      category,
      children,
      disableGroup = false,
      superior,
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
    const isTutorialMode = useTutorialMode();

    return (
      <>
        <PortalWrapper
          WrapperComponent={Toolbar}
          containerEl={toolbarEl}
          variant="dense"
        >
          {!isTutorialMode && (
            <ConfirmToggle
              severity="info"
              subject={t('ttl-navigation-confirm')}
              onConfirm={() => push(`/tutorial/${category}`)}
              message={t('tutorial:msg-sandbox-confirm', {
                name: t(`ttl-breadcrumbs.${category}.label`),
              })}
              toggle={
                <Tooltip title={t('tutorial:btn-sandbox-mode')}>
                  <IconButton
                    LinkComponent={Link}
                    size="large"
                    href={`/tutorial/${category}`}
                  >
                    <Core.Icon code="faFlask" />
                  </IconButton>
                </Tooltip>
              }
            />
          )}

          {onMoveToSuperiorFolder && (
            <Tooltip title={t('btn-move-to-superior-folder')}>
              <IconButton
                color="warning"
                size="large"
                onClick={onMoveToSuperiorFolder}
              >
                <Core.Icon code="faArrowUpFromBracket" />
              </IconButton>
            </Tooltip>
          )}

          {!disableGroup && (
            <Tooltip title={<Trans i18nKey="btn-add-group" />}>
              <IconButton
                color="warning"
                size="large"
                onClick={() =>
                  onAdd({
                    title: t('btn-add-group'),
                    icon: 'faFolderPlus',
                    data: { category, superior, type: EnumHierarchyType.GROUP },
                  })
                }
              >
                <Core.Icon code="faFolderPlus" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title={t('btn-add-item', { category: categoryLabel })}>
            <IconButton
              color="primary"
              size="large"
              onClick={() =>
                onAdd({
                  title: t('btn-add-item', { category: categoryLabel }),
                  icon: 'faPlus',
                  data: { category, superior, type: EnumHierarchyType.ITEM },
                })
              }
            >
              <Core.Icon code="faPlus" />
            </IconButton>
          </Tooltip>

          {children}
        </PortalWrapper>

        <Toolbar ref={ref} variant="dense" className={classes.filter} />
      </>
    );
  }
);
