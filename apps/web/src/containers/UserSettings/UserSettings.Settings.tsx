import AccordionDetails from '@mui/material/AccordionDetails';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Trans } from 'next-i18next';

import { PALETTES } from '~web/themes';
import { useAppSettings } from '~web/contexts';
import { useSettingsStyles } from './UserSettings.styles';
import type { BaseSettingProps } from './UserSettings.types';
import type { LanguageCode, PaletteCode } from '../imports.types';

export default function Settings({ className }: BaseSettingProps) {
  const { classes } = useSettingsStyles();

  const { language, languages, palette, setLanguage, setPalette } =
    useAppSettings();

  return (
    <AccordionDetails className={className}>
      <TextField
        fullWidth
        select
        label={<Trans i18nKey="lbl-language" />}
        value={language}
        onChange={(e) => setLanguage?.(e.target.value as LanguageCode)}
      >
        {languages.map((value) => (
          <MenuItem key={value} value={value}>
            <Trans i18nKey={`opt-language.${value}`} />
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label={<Trans i18nKey="lbl-theme" />}
        value={palette}
        onChange={(e) => setPalette?.(e.target.value as PaletteCode)}
        SelectProps={{
          renderValue: (value) => <Trans i18nKey={`opt-theme.${value}`} />,
        }}
      >
        {Object.entries(PALETTES).map(
          ([
            value,
            { background, primary, secondary, info, success, warning, error },
          ]) => (
            <MenuItem key={value} value={value}>
              <ListItemText
                primary={<Trans i18nKey={`opt-theme.${value}`} />}
                secondary={
                  <AvatarGroup
                    className={classes.palettes}
                    max={6}
                    sx={{ bgcolor: background?.paper }}
                  >
                    {[primary, secondary, info, success, warning, error].map(
                      (color, i) => {
                        if (color && 'main' in color) {
                          const { main, contrastText } = color;

                          return (
                            <Avatar
                              key={i}
                              className={classes.color}
                              sx={{ bgcolor: main, color: contrastText }}
                            >
                              &nbsp;
                            </Avatar>
                          );
                        }

                        return null;
                      }
                    )}
                  </AvatarGroup>
                }
              />
            </MenuItem>
          )
        )}
      </TextField>
    </AccordionDetails>
  );
}
