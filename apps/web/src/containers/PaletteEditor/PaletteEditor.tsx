import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import _set from 'lodash/set';
import { Display } from '@weavcraft/core';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';

import ColorEditor from './PaletteEditor.ColorEditor';
import { PaletteViewer } from '~web/components';
import { upsertThemePalette } from '~web/services';
import { useMainStyles } from './PaletteEditor.styles';
import type { ColorName } from '~web/components';
import type { PaletteEditorProps } from './PaletteEditor.types';
import type { ThemePalette } from '~web/services';

import {
  PortalWrapper,
  usePalettePreview,
  useTogglePortal,
  useTutorialMode,
} from '~web/contexts';

export default function PaletteEditor({
  config,
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
  const { classes } = useMainStyles({ size });

  const { containerEl, onToggle } = useTogglePortal(() =>
    setEditing(undefined)
  );

  const { mutate: upsert } = useMutation({
    mutationFn: upsertThemePalette,
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
    onSuccess: () =>
      enqueueSnackbar(
        t(`msg-success-${!config ? 'create' : 'update'}`, { name: title }),
        {
          variant: 'success',
        }
      ),
  });

  return (
    <Slide in direction="left" timeout={1200}>
      <Container disableGutters className={classes.root} maxWidth={maxWidth}>
        <PortalWrapper
          WrapperComponent={Toolbar}
          containerEl={toolbarEl}
          variant="dense"
        >
          <Tooltip title={t(`btn-${isPreviewMode ? 'undo' : 'preview'}`)}>
            <IconButton
              color="secondary"
              size="large"
              onClick={() => onPaletteApply(isPreviewMode ? undefined : value)}
            >
              <Display.Icon
                code={isPreviewMode ? 'faUndo' : 'faWandMagicSparkles'}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('btn-save')}>
            <IconButton
              color="secondary"
              size="large"
              onClick={() =>
                upsert({
                  input: { ...value, id: query.id as string } as ThemePalette,
                  isTutorialMode,
                })
              }
            >
              <Display.Icon code="faSave" />
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
            action={
              <IconButton onClick={() => onToggle(false)}>
                <Display.Icon code="faAngleRight" />
              </IconButton>
            }
            onChange={({ name, color }) =>
              setValue({ ..._set(value, name, color?.toUpperCase()) })
            }
          />
        </PortalWrapper>
      </Container>
    </Slide>
  );
}
