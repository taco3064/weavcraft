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

import { PortalWrapper, useTogglePortal, useTutorialMode } from '~web/contexts';
import { upsertPageLayouts } from '~web/services';
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
  const [editing, setEditing] = useState<unknown>();

  const [value, setValue] = useState<Partial<PageLayoutConfigs>>(() =>
    !config ? {} : JSON.parse(JSON.stringify(config))
  );

  const { t } = useTranslation();
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useMainStyles({ marginTop });

  const { containerEl, onToggle } = useTogglePortal(() =>
    setEditing(undefined)
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
    <Slide in direction="up" timeout={1200}>
      <Container disableGutters className={classes.root} maxWidth="xl">
        <PortalWrapper
          WrapperComponent={Toolbar}
          containerEl={toolbarEl}
          variant="dense"
        >
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
          items={value.layouts}
          rowHeight={64}
          onResize={console.log}
          onResort={console.log}
          renderItem={({ id, spans }) => (
            <ResponsiveItem {...{ id, spans }} actions={<>TEST</>}>
              <div style={{ background: 'red' }}>TES</div>
            </ResponsiveItem>
          )}
        />

        <PortalWrapper containerEl={containerEl}>
          Page Layouts Editor
        </PortalWrapper>
      </Container>
    </Slide>
  );
}
