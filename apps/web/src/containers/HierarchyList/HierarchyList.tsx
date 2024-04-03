import * as Dnd from '@dnd-kit/core';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { Display } from '@weavcraft/core';
import { Trans, useTranslation } from 'next-i18next';
import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import FilterModal from './HierarchyList.FilterModal';
import HierarchyListItem from './HierarchyList.Item';
import UpsertModal from './HierarchyList.UpsertModal';
import { PortalToolbar, type PortalContainerEl } from '~web/components';
import { getHierarchyData, type SearchHierarchyParams } from '~web/services';
import { useBreakpointMatches } from '~web/hooks';
import { useHierarchyStyles } from './HierarchyList.styles';
import type { HierarchyListProps, UpsertedState } from './HierarchyList.types';

export default function HierarchyList({
  category,
  disableGroup = false,
  disableGutters = false,
  disablePublish = false,
  icon,
  initialData,
  maxWidth = false,
  superior,
  toolbarEl,
  onMutationSuccess,
}: HierarchyListProps) {
  const { t } = useTranslation();
  const { classes } = useHierarchyStyles();
  const { matched: cols } = useBreakpointMatches({ xs: 2, md: 3 });

  const [filterEl, setFilterEl] = useState<PortalContainerEl>(null);
  const [upserted, setUpserted] = useState<UpsertedState>();

  const [params, setParams] = useState<SearchHierarchyParams>({
    category,
    superior,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderKey = useMemo(() => nanoid(), [params]);
  const categoryLabel = t(`ttl-breadcrumbs.${category}.label`);

  const { data } = useSuspenseQuery({
    ...(!params.keyword && { initialData }),
    queryKey: [params],
    queryFn: getHierarchyData,
  });

  const sensors = Dnd.useSensors(
    Dnd.useSensor(Dnd.MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    Dnd.useSensor(Dnd.TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return (
    <Container {...{ disableGutters, maxWidth }} className={classes.root}>
      <PortalToolbar variant="dense" containerEl={toolbarEl}>
        {!disableGroup && (
          <Tooltip title={<Trans i18nKey="btn-add-group" />}>
            <IconButton
              color="warning"
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
            color="primary"
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

        <FilterModal
          containerEl={filterEl}
          renderKey={renderKey}
          values={params}
          onSearch={setParams}
        />
      </PortalToolbar>

      <Toolbar ref={setFilterEl} variant="dense" className={classes.filter} />

      <UpsertModal
        {...upserted}
        onClose={() => setUpserted(undefined)}
        onUpsertSuccess={onMutationSuccess}
      />

      <Slide in direction="up" key={renderKey} timeout={800}>
        <ImageList variant="masonry" cols={cols} gap={16}>
          <Dnd.DndContext sensors={sensors}>
            {data?.map((item) => (
              <HierarchyListItem
                {...{ disablePublish, icon }}
                key={item._id}
                data={item}
                onDeleteConfirm={console.log}
                onEditClick={setUpserted}
                onPublishClick={disablePublish ? undefined : console.log}
              />
            ))}
          </Dnd.DndContext>
        </ImageList>
      </Slide>
    </Container>
  );
}
