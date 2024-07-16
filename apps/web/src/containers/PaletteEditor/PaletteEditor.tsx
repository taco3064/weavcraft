import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import _set from 'lodash/set';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import ColorEditor from './PaletteEditor.ColorEditor';
import { PaletteViewer } from '~web/components';
import { PortalWrapper, useTogglePortal, useTutorialMode } from '~web/contexts';
import { upsertThemePalette } from '~web/services';
import { useMainStyles } from './PaletteEditor.styles';
import { usePalettePreview } from './PaletteEditor.hooks';
import type { PaletteEditorProps } from './PaletteEditor.types';
import type { ColorName, ThemePalette } from '../imports.types';

export default function PaletteEditor({
  config,
  marginTop,
  maxWidth,
  size,
  title,
  toolbarEl,
}: PaletteEditorProps) {
  const isTutorialMode = useTutorialMode();

  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<ColorName[]>();

  const [value, setValue] = useState<Partial<ThemePalette>>(() =>
    !config ? {} : JSON.parse(JSON.stringify(config))
  );

  const { t } = useTranslation();
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { isPreviewMode, onPaletteApply } = usePalettePreview();
  const { classes } = useMainStyles({ marginTop, size });

  const { containerEl, onToggle } = useTogglePortal(() =>
    setEditing(undefined)
  );

  const { mutate: upsert } = useMutation({
    mutationFn: upsertThemePalette,
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
    onSuccess: () =>
      enqueueSnackbar(
        t(`msg-success-${!config ? 'create' : 'update'}`, { name: title }),
        { variant: 'success' }
      ),
  });

  return (
    <Slide in direction="up" timeout={1200}>
      <Container disableGutters className={classes.root} maxWidth={maxWidth}>
        <PortalWrapper
          WrapperComponent={Toolbar}
          containerEl={toolbarEl}
          variant="dense"
        >
          <Tooltip title={t(`btn-${isPreviewMode ? 'undo' : 'preview'}`)}>
            <IconButton
              color="primary"
              size="large"
              onClick={() => onPaletteApply(isPreviewMode ? undefined : value)}
            >
              <Core.Icon
                code={isPreviewMode ? 'faUndo' : 'faWandMagicSparkles'}
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
                  input: value as ThemePalette,
                  isTutorialMode,
                })
              }
            >
              <Core.Icon code="faSave" />
            </IconButton>
          </Tooltip>
        </PortalWrapper>

        <PaletteViewer
          disableResponsiveText
          config={value}
          size={size}
          onColorClick={(e) =>
            startTransition(() => {
              setEditing(e.map(({ name }) => name));
              onToggle(true);
            })
          }
        />

        <PortalWrapper containerEl={containerEl}>
          <ColorEditor
            items={editing}
            value={value}
            onClose={() => onToggle(false)}
            onChange={({ name, color }) =>
              setValue({ ..._set(value, name, color?.toUpperCase()) })
            }
          />
        </PortalWrapper>
      </Container>
    </Slide>
  );
}
