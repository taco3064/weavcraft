import Avatar from '@mui/material/Avatar';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import TextField from '@mui/material/TextField';
import _get from 'lodash/get';
import { HexAlphaColorPicker } from 'react-colorful';
import { Trans } from 'next-i18next';

import ColorInput from './PaletteEditor.ColorInput';
import { useEditorStyles } from './PaletteEditor.styles';
import type { ColorEditorProps } from './PaletteEditor.types';

export default function ColorEditor({
  action,
  items,
  value,
  onChange,
}: ColorEditorProps) {
  const { classes } = useEditorStyles();

  return (
    <Fade key={items?.join('|') || ''} in timeout={1200}>
      <List
        className={classes.root}
        subheader={
          <>
            <ListSubheader>
              {action && <ListItemAvatar>{action}</ListItemAvatar>}

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
        {items?.map((name, i) => {
          const color = _get(value, name);

          return (
            <ListItem key={name}>
              <ListItemAvatar className={classes.avatar}>
                <Avatar>
                  <Core.Icon fontSize="large" code="faPalette" />
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
                      label={<Trans i18nKey="themes:lbl-color-code" />}
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
