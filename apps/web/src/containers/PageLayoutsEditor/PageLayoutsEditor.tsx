import Container from '@mui/material/Container';
import Core, { ResponsiveGrid, ResponsiveItem } from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';
import type { Breakpoint } from '@mui/material/styles';

import EventFlowManager, { type ActiveEvent } from '../EventFlowManager';
import EventList from '../EventList';
import WidgetActions from './PageLayoutsEditor.WidgetActions';
import WidgetCreateButton from './PageLayoutsEditor.WidgetCreateButton';
import { BreakpointStepper, ViewportFrame } from '~web/components';
import { ViewModeEnum } from './PageLayoutsEditor.types';
import { upsertPageLayouts } from '~web/services';
import { useChangeEvents } from './PageLayoutsEditor.hooks';
import { useMainMargin, useWidgetRender } from '~web/hooks';
import { useMainStyles } from './PageLayoutsEditor.styles';
import type { PageLayoutConfigs } from '../imports.types';
import type { PageLayoutsEditorProps } from './PageLayoutsEditor.types';

import {
  PortalWrapper,
  useTogglePortal,
  useTutorialMode,
  withCorePropsDefinition,
} from '~web/contexts';

export default withCorePropsDefinition(function PageLayoutsEditor({
  config,
  marginTop,
  title,
  toolbarEl,
}: PageLayoutsEditorProps) {
  const [, startTransition] = useTransition();
  const [activeEvent, setActiveEvent] = useState<ActiveEvent>();
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');
  const [editingLayoutId, setEditingLayoutId] = useState<string>();
  const [viewMode, setViewMode] = useState<ViewModeEnum>();

  const [value, setValue] = useState<PageLayoutConfigs>(() =>
    !config ? { layouts: [] } : JSON.parse(JSON.stringify(config))
  );

  const isTutorialMode = useTutorialMode();
  const margin = useMainMargin();
  const layout = value.layouts?.find(({ id }) => id === editingLayoutId);

  const { t } = useTranslation();
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useMainStyles({ margin, marginTop });

  const { containerEl, onToggle } = useTogglePortal(() => {
    setActiveEvent(undefined);
    setEditingLayoutId(undefined);
  });

  const [
    hierarchyWidgets,
    { onCreate, onLayoutChange, onRemove, onResize, onResort },
  ] = useChangeEvents(breakpoint, viewMode, config, value, setValue);

  const generate = useWidgetRender((WidgetEl, { key, props }) => (
    <WidgetEl key={key} {...props} />
  ));

  const { mutate: upsert } = useMutation({
    mutationFn: upsertPageLayouts,
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
    onSuccess: () =>
      enqueueSnackbar(
        t(`msg-success-${!config ? 'create' : 'update'}`, { name: title }),
        { variant: 'success' }
      ),
  });

  return (
    <>
      <Slide in direction="up" timeout={1200}>
        <Container disableGutters className={classes.root} maxWidth="xl">
          <PortalWrapper
            WrapperComponent={Toolbar}
            containerEl={toolbarEl}
            variant="dense"
          >
            {viewMode !== ViewModeEnum.Preview ? (
              <>
                <WidgetCreateButton onCreate={onCreate} />

                <Tooltip title={t('pages:btn-layout-preview')}>
                  <IconButton
                    color="primary"
                    size="large"
                    onClick={() => setViewMode(ViewModeEnum.Preview)}
                  >
                    <Core.Icon code="faEye" />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title={t('btn-undo')}>
                <IconButton
                  color="primary"
                  size="large"
                  onClick={() => setViewMode(undefined)}
                >
                  <Core.Icon code="faUndo" />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title={t('btn-save')}>
              <IconButton
                color="primary"
                size="large"
                onClick={() =>
                  upsert({
                    hierarchyId: query.id as string,
                    input: value as PageLayoutConfigs,
                    isTutorialMode,
                  })
                }
              >
                <Core.Icon code="faSave" />
              </IconButton>
            </Tooltip>
          </PortalWrapper>

          {viewMode === ViewModeEnum.Preview ? (
            <ViewportFrame
              variant="pages"
              breakpoint={breakpoint}
              config={value}
            />
          ) : (
            <ResponsiveGrid
              {...{ breakpoint, onResize, onResort }}
              enableGridlines
              items={value.layouts}
              cols={process.env.NEXT_PUBLIC_DEFAULT_COLS}
              rowHeight={process.env.NEXT_PUBLIC_DEFAULT_ROW_HEIGHT}
              sx={(theme) => ({
                '& > ul': {
                  paddingTop: theme.spacing(3),
                  paddingBottom: theme.spacing(3),
                },
              })}
              renderItem={(layout) => {
                const { id, spans, widgetId } = layout;
                const { [widgetId]: hierarchy } = hierarchyWidgets;

                return (
                  <ResponsiveItem
                    {...{ id, spans }}
                    actions={
                      hierarchy && (
                        <WidgetActions
                          name={hierarchy.title}
                          onRemove={() => onRemove(id)}
                          onEventsEdit={() =>
                            startTransition(() => {
                              onToggle(true);
                              setEditingLayoutId(layout.id);
                            })
                          }
                        />
                      )
                    }
                  >
                    {hierarchy?.payload &&
                      generate(hierarchy.payload, {
                        dataStructure: hierarchy.payload.dataStructure,
                      })}
                  </ResponsiveItem>
                );
              }}
            />
          )}
        </Container>
      </Slide>

      <Slide in direction="up" timeout={1200}>
        <BreakpointStepper
          disableNextButton={!value.layouts?.length}
          value={breakpoint}
          onChange={setBreakpoint}
          AppBarProps={{
            position: 'fixed',
            variant: 'outlined',
            className: classes.breakpointStepper,
          }}
        />
      </Slide>

      {layout?.widgetId && hierarchyWidgets[layout.widgetId] && (
        <PortalWrapper containerEl={containerEl}>
          {!activeEvent ? (
            <EventList
              hierarchyWidget={hierarchyWidgets[layout.widgetId]}
              onActive={setActiveEvent}
              onClose={() => onToggle(false)}
            />
          ) : (
            <EventFlowManager
              active={activeEvent}
              config={layout}
              widgets={Object.values(hierarchyWidgets).map(
                ({ payload }) => payload
              )}
              onClose={(config) =>
                startTransition(() => {
                  onLayoutChange(config);
                  setActiveEvent(undefined);
                })
              }
            />
          )}
        </PortalWrapper>
      )}
    </>
  );
});
