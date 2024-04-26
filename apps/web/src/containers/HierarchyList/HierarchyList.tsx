import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grow from '@mui/material/Grow';
import ImageList from '@mui/material/ImageList';
import Typography from '@mui/material/Typography';
import { DndContext } from '@dnd-kit/core';
import { Fragment, useId, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'next-i18next';
import { nanoid } from 'nanoid';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import FilterToggle from './HierarchyList.FilterToggle';
import HierarchyListItem from './HierarchyList.Item';
import HierarchySkeleton from './HierarchyList.Skeleton';
import HierarchyToolbar from './HierarchyList.Toolbar';
import UpsertDialog from './HierarchyList.UpsertDialog';
import { deleteHierarchyData, getHierarchyData } from '~web/services';
import { useBreakpointMatches } from '~web/hooks';
import { useHierarchyStyles } from './HierarchyList.styles';
import { useTutorialMode, type PortalContainerEl } from '~web/contexts';
import type { HierarchyListProps, UpsertedState } from './HierarchyList.types';

import {
  useDataStore,
  useDndContextProps,
  useQueryVariables,
} from './HierarchyList.hooks';

export default function HierarchyList<P>({
  category,
  disableGroup,
  disableGutters,
  disablePublish = false,
  icon,
  initialData,
  maxWidth = false,
  superior,
  toolbarEl,
  renderPreview,
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
    useQueryVariables({ category, superior, renderPreview });

  const {
    data = initialData || [],
    refetch: onRefetch,
    ...query
  } = useQuery({
    enabled: Boolean(params.keyword?.trim()) || isTutorialMode,
    queryKey: [params, isTutorialMode],
    queryFn: getHierarchyData,
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
  const ids = { group: useId(), item: useId() };
  const contextProps = useDndContextProps(ids);
  const isLoading = [variables, query].some(({ isLoading }) => isLoading);
  const { group, item, selecteds, onDataSelect } = useDataStore(data);

  return isLoading ? (
    <HierarchySkeleton {...{ cols, disableGutters, maxWidth }} />
  ) : (
    <Grow key={JSON.stringify(params)} in timeout={1200}>
      <Container {...{ disableGutters, maxWidth }} className={classes.root}>
        <HierarchyToolbar
          {...{ category, disableGroup, isTutorialMode, superior, toolbarEl }}
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
            onSuccess={(...e) => {
              onRefetch();
              onMutationSuccess?.(...e);
            }}
          />
        </HierarchyToolbar>

        <DndContext {...contextProps} key={renderKey}>
          {Object.entries({ group, item }).map(([type, data]) => (
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
                        {...{ cols, icon, renderPreview }}
                        key={item._id}
                        data={item}
                        disableDrag={group.length < 1}
                        selected={selecteds.includes(item._id)}
                        onDeleteConfirm={(input) =>
                          onDelete({ input, isTutorialMode })
                        }
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
            </Fragment>
          ))}
        </DndContext>
      </Container>
    </Grow>
  );
}
