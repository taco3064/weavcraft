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

import WidgetCreateButton from './PageLayoutsEditor.WidgetCreateButton';
import { BreakpointStepper } from '~web/components';
import { PortalWrapper, useTogglePortal, useTutorialMode } from '~web/contexts';
import { ViewModeEnum } from './PageLayoutsEditor.types';
import { upsertPageLayouts } from '~web/services';
import { useChangeEvents } from './PageLayoutsEditor.hooks';
import { useMainStyles } from './PageLayoutsEditor.styles';
import type { PageLayoutConfigs } from '../imports.types';
import type { PageLayoutsEditorProps } from './PageLayoutsEditor.types';

export default function PageLayoutsEditor({
  config,
  marginTop,
  title,
  toolbarEl,
}: PageLayoutsEditorProps) {
  const isTutorialMode = useTutorialMode();

  const [, startTransition] = useTransition();
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');
  const [editing, setEditing] = useState<unknown>();
  const [viewMode, setViewMode] = useState<ViewModeEnum>();

  const [value, setValue] = useState<PageLayoutConfigs>(() =>
    !config ? { layouts: [] } : JSON.parse(JSON.stringify(config))
  );

  const { t } = useTranslation();
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useMainStyles({ marginTop });

  const { containerEl, onToggle } = useTogglePortal(() =>
    setEditing(undefined)
  );

  const { onCreate, onRemove, onResize, onResort } = useChangeEvents(
    breakpoint,
    viewMode,
    value,
    setValue
  );

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
            {viewMode !== ViewModeEnum.Preview && (
              <WidgetCreateButton onCreate={onCreate} />
            )}

            <Tooltip
              title={
                viewMode === ViewModeEnum.Preview
                  ? t('btn-undo')
                  : t('pages:btn-layout-preview')
              }
            >
              <IconButton
                color="primary"
                size="large"
                onClick={() =>
                  setViewMode(
                    viewMode === ViewModeEnum.Preview
                      ? undefined
                      : ViewModeEnum.Preview
                  )
                }
              >
                <Core.Icon
                  code={viewMode === ViewModeEnum.Preview ? 'faUndo' : 'faEye'}
                />
              </IconButton>
            </Tooltip>

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

          <ResponsiveGrid
            {...{ onResize, onResort }}
            breakpoint={breakpoint}
            cols={process.env.NEXT_PUBLIC_DEFAULT_COLS}
            items={value.layouts}
            rowHeight={process.env.NEXT_PUBLIC_DEFAULT_ROW_HEIGHT}
            renderItem={({ id, spans }) => (
              <ResponsiveItem
                {...{ id, spans }}
                disableToolbar={viewMode === ViewModeEnum.Preview}
                actions={<>Actions</>}
              >
                <div style={{ background: 'red', height: '100%' }}>TES</div>
              </ResponsiveItem>
            )}
          />

          <PortalWrapper containerEl={containerEl}>
            Page Layouts Editor
          </PortalWrapper>
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
    </>
  );
}
