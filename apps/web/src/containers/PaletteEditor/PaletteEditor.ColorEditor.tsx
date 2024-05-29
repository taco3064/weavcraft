import Avatar from '@mui/material/Avatar';
import Core from '@weavcraft/core';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import _get from 'lodash/get';
import { HexAlphaColorPicker } from 'react-colorful';
import { useTranslation } from 'next-i18next';

import ColorInput from './PaletteEditor.ColorInput';
import { EditorSubheader } from '~web/components';
import { useEditorListStyles } from '~web/styles';
import { useEditorStyles } from './PaletteEditor.styles';
import type { ColorEditorProps } from './PaletteEditor.types';

export default function ColorEditor({
  items,
  value,
  onClose,
  onChange,
}: ColorEditorProps) {
  const { t } = useTranslation();
  const { classes } = useEditorListStyles();

  const {
    classes: { colorPicker: colorPickerClassName },
  } = useEditorStyles();

  return (
    <Fade key={items?.join('|') || ''} in timeout={1200}>
      <List
        className={classes.root}
        subheader={
          <EditorSubheader title={t('themes:ttl-editor')} onClose={onClose} />
        }
      >
        {items?.map((name) => {
          const color = _get(value, name);

          return (
            <ListItem key={name}>
              <ListItemAvatar className={classes.avatar}>
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
                  className: colorPickerClassName,
                  component: 'div',
                }}
                secondary={
                  <>
                    <HexAlphaColorPicker
                      color={color}
                      onChange={(color) => onChange({ name, color })}
                    />

                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label={t('themes:lbl-color-code')}
                      onChange={(e) => onChange({ name, color: e.toString() })}
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
    </Fade>
  );
}
