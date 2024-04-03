import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Display } from '@weavcraft/core';
import { DndContext } from '@dnd-kit/core';
import { Fragment, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'next-i18next';
import { nanoid } from 'nanoid';
import { useSuspenseQuery } from '@tanstack/react-query';

import FilterModal from './HierarchyList.FilterModal';
import HierarchyListItem from './HierarchyList.Item';
import UpsertModal from './HierarchyList.UpsertModal';
import { PortalToolbar, type PortalContainerEl } from '~web/components';
import { getHierarchyData } from '~web/services';
import { useBreakpointMatches } from '~web/hooks';
import { useDndContextProps } from './HierarchyList.hooks';
import { useHierarchyStyles } from './HierarchyList.styles';
import type { HierarchyData, SearchHierarchyParams } from '~web/services';
import type { HierarchyListProps, UpsertedState } from './HierarchyList.types';

export default function HierarchyList({
  category,
  disableGroup,
  disableGutters,
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
  const contextProps = useDndContextProps();

  const { data } = useSuspenseQuery({
    ...(!params.keyword && { initialData }),
    queryKey: [params],
    queryFn: getHierarchyData,
  });

  const records = useMemo(
    () =>
      data?.reduce<
        Record<HierarchyData<string>['type'], HierarchyData<string>[]>
      >(
        (result, item) => ({
          ...result,
          [item.type]: [...result[item.type], item],
        }),
        { group: [], item: [] }
      ),
    [data]
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

      <DndContext {...contextProps} key={renderKey}>
        {Object.entries(records).map(([type, data]) => (
          <Fragment key={type}>
            <Slide
              in
              direction={type === 'group' ? 'right' : 'left'}
              timeout={600}
            >
              <Divider>
                <Trans
                  i18nKey={
                    type === 'group'
                      ? 'lbl-hierarchy-groups'
                      : `ttl-breadcrumbs.${category}.label`
                  }
                />
              </Divider>
            </Slide>

            <Slide in direction="up" timeout={type === 'group' ? 800 : 1200}>
              {!data.length ? (
                <Typography
                  className={classes.mb}
                  variant="h5"
                  color="text.disabled"
                  justifyContent="center"
                >
                  <Trans i18nKey="msg-no-data" />
                </Typography>
              ) : (
                <ImageList
                  variant="masonry"
                  className={classes.mb}
                  cols={cols}
                  gap={16}
                >
                  {data.map((item) =>
                    item.type !== type ? null : (
                      <HierarchyListItem
                        {...{ cols, icon }}
                        key={item._id}
                        data={item}
                        disableDrag={
                          records.group.length < (type === 'group' ? 2 : 1)
                        }
                        onDeleteConfirm={console.log}
                        onEditClick={setUpserted}
                        onPublishClick={
                          disablePublish ? undefined : console.log
                        }
                      />
                    )
                  )}
                </ImageList>
              )}
            </Slide>
          </Fragment>
        ))}
      </DndContext>
    </Container>
  );
}
