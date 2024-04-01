import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { Display } from '@weavcraft/core';
import { Trans, useTranslation } from 'next-i18next';
import { useState } from 'react';
import type { SearchHierarchyParams } from '@weavcraft/types';

import CollapseFilter from './HierarchyList.CollapseFilter';
import UpsertModal from './HierarchyList.UpsertModal';
import { PortalToolbar, type PortalContainerEl } from '~web/components';
import { useHierarchyStyles } from './HierarchyList.styles';

import type {
  HierarchyListProps,
  UpsertModalProps,
} from './HierarchyList.types';

export default function HierarchyList({
  category,
  disableGroup = false,
  disableGutters = false,
  disablePublish = false,
  maxWidth = false,
  toolbarEl,
  onMutationSuccess,
}: HierarchyListProps) {
  const { t } = useTranslation();
  const { classes } = useHierarchyStyles();
  const categoryLabel = t(`ttl-breadcrumbs.${category}.label`);

  const [filterEl, setFilterEl] = useState<PortalContainerEl>(null);
  const [params, setParams] = useState<SearchHierarchyParams>({});

  const [upserted, setUpserted] =
    useState<Pick<UpsertModalProps, 'data' | 'icon' | 'title'>>();

  console.log(params);

  return (
    <Container {...{ disableGutters, maxWidth }} className={classes.root}>
      <PortalToolbar variant="dense" containerEl={toolbarEl}>
        {!disableGroup && (
          <Tooltip title={<Trans i18nKey="btn-add-group" />}>
            <IconButton
              onClick={() =>
                setUpserted({
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
            onClick={() =>
              setUpserted({
                title: t('btn-add-item', { category: categoryLabel }),
                icon: 'faPlus',
                data: { category, type: 'item' },
              })
            }
          >
            <Display.Icon code="faPlus" />
          </IconButton>
        </Tooltip>

        <Divider flexItem orientation="vertical" />

        <CollapseFilter containerEl={filterEl} onSearch={setParams} />
      </PortalToolbar>

      <Toolbar ref={setFilterEl} variant="dense" className={classes.filter} />

      <UpsertModal
        {...upserted}
        onClose={() => setUpserted(undefined)}
        onUpsertSuccess={onMutationSuccess}
      />

      <>List...</>
    </Container>
  );
}
