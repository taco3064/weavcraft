import Avatar from '@mui/material/Avatar';
import Core from '@weavcraft/core';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import _get from 'lodash/get';
import { HexAlphaColorPicker } from 'react-colorful';
import { useTranslation } from 'next-i18next';

import ColorInput from './PaletteEditor.ColorInput';
import { EditorList } from '~web/components';
import { useEditorStyles } from './PaletteEditor.styles';
import type { ColorEditorProps } from './PaletteEditor.types';

export default function ColorEditor({
  items,
  value,
  onClose,
  onChange,
}: ColorEditorProps) {
  const { t } = useTranslation();

  const {
    classes: { colorPicker: colorPickerClassName },
  } = useEditorStyles();

  return (
    <EditorList
      key={items?.join('|') || ''}
      title={t('themes:ttl-editor')}
      onClose={onClose}
      render={(classes) =>
        items?.map((name) => {
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
        })
      }
    />
  );
}
