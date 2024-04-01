import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { Display } from '@weavcraft/core';
import { Trans } from 'next-i18next';
import { useState } from 'react';
import type { SearchHierarchyParams } from '@weavcraft/types';

import HierarchyFilter from './HierarchyList.Filter';
import { PortalToolbar, type PortalContainerEl } from '~web/components';
import { useHierarchyStyles } from './HierarchyList.styles';
import type { HierarchyListProps } from './HierarchyList.types';

export default function HierarchyList({
  category,
  disableGroup = false,
  disableGutters = false,
  disablePublish = false,
  maxWidth = false,
  toolbarEl,
  onMutationSuccess,
}: HierarchyListProps) {
  const [filterEl, setFilterEl] = useState<PortalContainerEl>(null);
  const [params, setParams] = useState<SearchHierarchyParams>({});
  const { classes } = useHierarchyStyles();

  console.log(params);

  return (
    <Container {...{ disableGutters, maxWidth }} className={classes.root}>
      <PortalToolbar variant="dense" containerEl={toolbarEl}>
        {!disableGroup && (
          <Tooltip title={<Trans i18nKey="btn-add-group" />}>
            <IconButton>
              <Display.Icon code="faFolderPlus" />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title={<Trans i18nKey={`btn-add-item.${category}`} />}>
          <IconButton>
            <Display.Icon code="faPlus" />
          </IconButton>
        </Tooltip>

        <Divider flexItem orientation="vertical" />

        <HierarchyFilter containerEl={filterEl} onSearch={setParams} />
      </PortalToolbar>

      <Toolbar ref={setFilterEl} variant="dense" className={classes.filter} />

      <>List...</>
    </Container>
  );
}
