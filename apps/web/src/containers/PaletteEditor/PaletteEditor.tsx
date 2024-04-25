import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { HexAlphaColorPicker } from 'react-colorful';
import { Display } from '@weavcraft/core';
import { Trans } from 'next-i18next';
import { useState, useTransition } from 'react';

import ColorInput from './PaletteEditor.ColorInput';
import { PaletteViewer } from '~web/components';
import { PortalWrapper, useTogglePortal } from '~web/contexts';
import { useEditorStyles } from './PaletteEditor.styles';
import type { ColorName, PaletteColor } from '~web/components';
import type { ThemePalette } from '~web/services';

import type { PaletteEditorProps } from './PaletteEditor.types';

export default function PaletteEditor({
  config,
  maxWidth,
  size,
  toolbarEl,
}: PaletteEditorProps) {
  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<ColorName[]>();
  const [value, setValue] = useState<Partial<ThemePalette>>(config || {});

  const { classes } = useEditorStyles();

  const { containerEl, onToggle } = useTogglePortal(() =>
    setEditing(undefined)
  );

  const handleColorChange = ({ name, color }: PaletteColor) =>
    setValue({ ..._set(value, name, color?.toUpperCase()) });

  return (
    <Slide in direction="up" timeout={1200}>
      <Container disableGutters maxWidth={maxWidth}>
        <PortalWrapper
          WrapperComponent={Toolbar}
          containerEl={toolbarEl}
          variant="dense"
        >
          TEST
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
          <List
            className={classes.list}
            subheader={
              <>
                <ListSubheader>
                  <ListItemAvatar>
                    <IconButton onClick={() => onToggle(false)}>
                      <Display.Icon code="faAngleRight" />
                    </IconButton>
                  </ListItemAvatar>

                  <ListItemText
                    primary={<Trans i18nKey="themes:ttl-editor" />}
                    primaryTypographyProps={{
                      variant: 'h6',
                      color: 'text.primary',
                      fontWeight: 600,
                    }}
                  />
                </ListSubheader>

                <Divider />
              </>
            }
          >
            {editing?.map((name) => {
              const color = _get(value, name);

              return (
                <ListItem key={name}>
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar>
                      <Display.Icon fontSize="large" code="faPalette" />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={<Trans i18nKey={`themes:lbl-color.${name}`} />}
                    primaryTypographyProps={{
                      color: 'secondary',
                      fontWeight: 600,
                    }}
                    secondaryTypographyProps={{
                      className: classes.colorPicker,
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
                          variant="outlined"
                          size="small"
                          label={<Trans i18nKey="themes:lbl-color-code" />}
                          style={{ width: 200 }}
                          onChange={(e) =>
                            handleColorChange({
                              name,
                              color: e as unknown as string,
                            })
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
            })}
          </List>
        </PortalWrapper>
      </Container>
    </Slide>
  );
}
