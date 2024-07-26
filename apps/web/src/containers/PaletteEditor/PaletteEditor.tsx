import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { HexAlphaColorPicker } from 'react-colorful';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import { ColorInput, EditorList, PaletteViewer } from '~web/components';
import { PortalWrapper, useTogglePortal, useTutorialMode } from '~web/contexts';
import { upsertThemePalette } from '~web/services';
import { useMainStyles } from './PaletteEditor.styles';
import { usePalettePreview } from './PaletteEditor.hooks';
import type { PaletteEditorProps } from './PaletteEditor.types';
import type { ColorName, PaletteColor, ThemePalette } from '../imports.types';

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

  const handleColorChange = ({ name, color }: PaletteColor) =>
    setValue({ ..._set(value, name, color?.toUpperCase()) });

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
          <EditorList
            key={editing?.join('|')}
            title={t('themes:ttl-editor')}
            onClose={() => onToggle(false)}
            render={(editorClasses) =>
              editing?.map((name) => {
                const color = _get(value, name);

                return (
                  <ListItem key={name}>
                    <ListItemAvatar className={editorClasses.avatar}>
                      <Avatar>
                        <Core.Icon fontSize="large" code="faPalette" />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={t(`themes:lbl-color.${name}`)}
                      primaryTypographyProps={{
                        color: 'secondary',
                        fontWeight: 600,
                      }}
                      secondaryTypographyProps={{
                        className: classes.colorPicker,
                        component: 'div',
                      }}
                      secondary={
                        <>
                          <HexAlphaColorPicker
                            color={color}
                            onChange={(color) =>
                              handleColorChange({ name, color })
                            }
                          />

                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label={t('themes:lbl-color-code')}
                            onChange={(e) =>
                              handleColorChange({ name, color: e.toString() })
                            }
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                              inputComponent: ColorInput as never,
                              inputProps: {
                                prefixed: true,
                                alpha: true,
                                color,
                              },
                            }}
                          />
                        </>
                      }
                    />
                  </ListItem>
                );
              })
            }
          />
        </PortalWrapper>
      </Container>
    </Slide>
  );
}
