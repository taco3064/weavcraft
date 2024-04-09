import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { DndContext } from '@dnd-kit/core';
import { Fragment, useId, useMemo, useState } from 'react';
import { Trans } from 'next-i18next';
import { nanoid } from 'nanoid';

import FilterToggle from './HierarchyList.FilterToggle';
import HierarchyListItem from './HierarchyList.Item';
import HierarchySkeleton from './HierarchyList.Skeleton';
import HierarchyToolbar from './HierarchyList.Toolbar';
import UpsertDialog from './HierarchyList.UpsertDialog';
import { useBreakpointMatches } from '~web/hooks';
import { useDndContextProps, useHierarchyData } from './HierarchyList.hooks';
import { useHierarchyStyles } from './HierarchyList.styles';
import type { HierarchyListProps, UpsertedState } from './HierarchyList.types';
import type { PortalContainerEl } from '~web/components';

export default function HierarchyList<P>({
  PreviewComponent,
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
}: HierarchyListProps<P>) {
  const [filterEl, setFilterEl] = useState<PortalContainerEl>(null);
  const [upserted, setUpserted] = useState<UpsertedState<P>>();

  const { classes } = useHierarchyStyles();
  const { matched: cols } = useBreakpointMatches({ xs: 2, sm: 3 });

  const {
    group,
    isLoading,
    item,
    params,
    selecteds,
    onDataSelect,
    onParamsChange,
  } = useHierarchyData({ PreviewComponent, category, initialData, superior });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderKey = useMemo(() => nanoid(), [params]);
  const ids = { group: useId(), item: useId() };
  const contextProps = useDndContextProps(ids);

  return isLoading ? (
    <HierarchySkeleton {...{ cols, disableGutters, maxWidth }} />
  ) : (
    <Container {...{ disableGutters, maxWidth }} className={classes.root}>
      <HierarchyToolbar
        {...{ category, disableGroup, toolbarEl }}
        ref={setFilterEl}
        onAdd={setUpserted}
        onMoveToSuperiorFolder={
          !superior || !selecteds.length ? undefined : console.log
        }
      >
        <FilterToggle
          containerEl={filterEl}
          renderKey={renderKey}
          values={params}
          onSearch={onParamsChange}
        />

        <UpsertDialog
          {...upserted}
          onClose={() => setUpserted(undefined)}
          onSuccess={onMutationSuccess}
        />
      </HierarchyToolbar>

      <DndContext {...contextProps} key={renderKey}>
        {Object.entries({ group, item }).map(([type, data]) => (
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
                  className={classes.list}
                  variant="h5"
                  color="text.disabled"
                  justifyContent="center"
                >
                  <Trans i18nKey="msg-no-data" />
                </Typography>
              ) : (
                <ImageList
                  id={ids[type as keyof typeof ids]}
                  variant="masonry"
                  className={classes.list}
                  cols={cols}
                  gap={16}
                >
                  {data.map((item) =>
                    item.type !== type ? null : (
                      <HierarchyListItem
                        {...{ PreviewComponent, cols, icon }}
                        key={item._id}
                        data={item}
                        disableDrag={group.length < 1}
                        selected={selecteds.includes(item._id)}
                        onDeleteConfirm={console.log}
                        onEditClick={setUpserted}
                        onSelect={!superior ? undefined : onDataSelect}
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
