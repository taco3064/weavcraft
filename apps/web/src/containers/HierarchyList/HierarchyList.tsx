import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grow from '@mui/material/Grow';
import ImageList from '@mui/material/ImageList';
import Typography from '@mui/material/Typography';
import { DndContext } from '@dnd-kit/core';
import { Fragment, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import { useBreakpointMatches } from '@weavcraft/core';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'next-i18next';

import FilterToggle from './HierarchyList.FilterToggle';
import HierarchyListItem from './HierarchyList.Item';
import HierarchySkeleton from './HierarchyList.Skeleton';
import HierarchyToolbar from './HierarchyList.Toolbar';
import MoveToParentFolderFab from './HierarchyList.MoveToParentFolderFab';
import UpsertDialog from './HierarchyList.UpsertDialog';
import { deleteHierarchyData, searchHierarchies } from '~web/services';
import { useHierarchyStyles } from './HierarchyList.styles';
import { useTutorialMode } from '~web/hooks';
import type { HierarchyListProps, UpsertedState } from './HierarchyList.types';
import type { PortalContainerEl } from '../imports.types';

import {
  useDataCollections,
  useQueryVariables,
  useSuperiorMutation,
} from './HierarchyList.hooks';

export default function HierarchyList<P>({
  category,
  disableGroup,
  disableGutters,
  disablePublish = false,
  icon,
  initialData,
  maxWidth = false,
  superiors,
  toolbarEl,
  renderContent,
  onMutationSuccess,
}: HierarchyListProps<P>) {
  const isTutorialMode = useTutorialMode();

  const [filterEl, setFilterEl] = useState<PortalContainerEl>(null);
  const [upserted, setUpserted] = useState<UpsertedState<P>>();

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useHierarchyStyles();
  const { matched: cols } = useBreakpointMatches({ xs: 2, sm: 3 });

  const { isFiltering, params, onParamsChange, ...variables } =
    useQueryVariables({ category, superiors, renderContent });

  const {
    data = initialData || [],
    refetch: onRefetch,
    ...query
  } = useQuery({
    enabled: Boolean(params.keyword?.trim()) || isTutorialMode,
    queryKey: [params, isTutorialMode],
    queryFn: searchHierarchies,
  });

  const { ids, isDragging, contextProps } = useSuperiorMutation({
    initialData: data,
    superiors,
    onMutationSuccess: (...e) => {
      onRefetch();
      onMutationSuccess?.(...e);
    },
  });

  const { mutate: onDelete } = useMutation({
    mutationFn: deleteHierarchyData,
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
    onSuccess: (_res, { input }) => {
      onRefetch();

      enqueueSnackbar(t('msg-success-delete', { name: input.title }), {
        variant: 'success',
      });
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderKey = useMemo(() => nanoid(), [isTutorialMode, params]);
  const collections = useDataCollections(data);
  const isLoading = [variables, query].some(({ isLoading }) => isLoading);

  return isLoading ? (
    <HierarchySkeleton {...{ cols, disableGutters, maxWidth }} />
  ) : (
    <Grow key={JSON.stringify(params)} in timeout={1200}>
      <Container {...{ disableGutters, maxWidth }} className={classes.root}>
        <HierarchyToolbar
          {...{ category, disableGroup, isTutorialMode, toolbarEl }}
          ref={setFilterEl}
          superior={superiors[superiors.length - 1]?.id}
          onAdd={setUpserted}
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
            onSuccess={(...e) => {
              onRefetch();
              onMutationSuccess?.(...e);
            }}
          />
        </HierarchyToolbar>

        <DndContext {...contextProps} key={renderKey}>
          {isDragging && (
            <MoveToParentFolderFab
              className={classes.toParentFab}
              disabled={!superiors.length}
              id={ids.fab}
            />
          )}

          {Object.entries(collections).map(([type, data]) => (
            <Fragment key={type}>
              <Divider>
                {t(isFiltering ? 'ttl-filter-result' : '{{type}}', {
                  type: t(
                    type === 'group'
                      ? 'lbl-hierarchy-groups'
                      : `ttl-breadcrumbs.${category}.label`
                  ),
                })}
              </Divider>

              {!data.length ? (
                <Typography
                  className={classes.list}
                  variant="h5"
                  color="text.disabled"
                  justifyContent="center"
                >
                  {t('msg-no-data')}
                </Typography>
              ) : (
                <ImageList
                  variant="quilted"
                  className={classes.list}
                  cols={cols}
                  gap={16}
                  {...(type === 'group' && { id: ids.group })}
                >
                  {data.map((item) =>
                    item.type.toLowerCase() !== type ? null : (
                      <HierarchyListItem
                        {...{ cols, icon, renderContent }}
                        key={item.id}
                        data={item}
                        disableDrag={
                          collections.group.length <
                            (type === 'group' ? 2 : 1) && !superiors.length
                        }
                        onEditClick={(e) => setUpserted(e)}
                        onDeleteConfirm={(input) =>
                          onDelete({ input, isTutorialMode })
                        }
                        onPublishClick={
                          disablePublish ? undefined : console.log
                        }
                      />
                    )
                  )}
                </ImageList>
              )}
            </Fragment>
          ))}
        </DndContext>
      </Container>
    </Grow>
  );
}
