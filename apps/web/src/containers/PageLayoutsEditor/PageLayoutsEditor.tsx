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

import * as Comp from '~web/components';
import * as Hooks from '~web/hooks';
import EventFlowManager, { type ActiveEvent } from '../EventFlowManager';
import EventList from '../EventList';
import WidgetActions from './PageLayoutsEditor.WidgetActions';
import WidgetCreateButton from './PageLayoutsEditor.WidgetCreateButton';
import { ViewModeEnum } from './PageLayoutsEditor.types';
import { upsertPageLayouts } from '~web/services';
import { useChangeEvents } from './PageLayoutsEditor.hooks';
import { useMainStyles } from './PageLayoutsEditor.styles';
import { withCoreDefinition } from '~web/contexts';
import type { PageLayoutConfigs } from '../imports.types';
import type { PageLayoutsEditorProps } from './PageLayoutsEditor.types';

export default withCoreDefinition(function PageLayoutsEditor({
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

  const isTutorialMode = Hooks.useTutorialMode();
  const margin = Hooks.useMainMargin();
  const layout = value.layouts?.find(({ id }) => id === editingLayoutId);

  const { t } = useTranslation();
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useMainStyles({ margin, marginTop });

  const [
    managerRef,
    hierarchyWidgets,
    { onCreate, onLayoutChange, onManagerDone, onRemove, onResize, onResort },
  ] = useChangeEvents(breakpoint, viewMode, config, value, setValue);

  const { containerEl, onToggle } = Hooks.useTogglePortal(() => {
    setEditingLayoutId(undefined);
    onManagerDone();
  });

  const generate = Hooks.useWidgetRender((WidgetEl, { key, props }) => (
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
          <Comp.PortalWrapper
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
          </Comp.PortalWrapper>

          {viewMode === ViewModeEnum.Preview ? (
            <Comp.ViewportFrame
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
        <Comp.BreakpointStepper
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
        <Comp.PortalWrapper containerEl={containerEl}>
          {!activeEvent ? (
            <EventList
              hierarchyWidget={hierarchyWidgets[layout.widgetId]}
              onActive={setActiveEvent}
              onClose={() => onToggle(false)}
            />
          ) : (
            <EventFlowManager
              ref={managerRef}
              active={activeEvent}
              config={layout}
              layouts={Object.fromEntries(
                value.layouts.map(({ id, widgetId }) => [
                  id,
                  hierarchyWidgets[widgetId].payload,
                ])
              )}
              onClose={(config) =>
                startTransition(() => {
                  onLayoutChange(config);
                  setActiveEvent(undefined);
                })
              }
            />
          )}
        </Comp.PortalWrapper>
      )}
    </>
  );
});
