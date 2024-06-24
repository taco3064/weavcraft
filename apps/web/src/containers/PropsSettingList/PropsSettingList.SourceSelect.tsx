import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';

import { DataPropNameEnum } from './PropsSettingList.types';
import {
  useDataSourceOptions,
  useIndexesValue,
} from './PropsSettingList.hooks';
import type { SourceSelectProps } from './PropsSettingList.types';

export default function SourceSelect({
  dataPropName,
  paths,
  value,
  widget,
  onChange,
}: SourceSelectProps) {
  const { t } = useTranslation();

  const { isExtensionAllowed, recordsOptions } = useDataSourceOptions(
    dataPropName,
    { paths, widget }
  );

  const [selectValue, handleChange] = useIndexesValue(
    dataPropName,
    value,
    onChange
  );

  return (
    <TextField
      fullWidth
      select
      variant="filled"
      size="small"
      color="secondary"
      label={t(`widgets:lbl-source-setting.${dataPropName}`)}
      value={selectValue}
      onChange={handleChange}
      SelectProps={{ IconComponent: Fragment }}
      InputProps={{
        disableUnderline: false,
        endAdornment: (
          <InputAdornment position="end">
            {!value ? (
              <ArrowDropDownIcon />
            ) : (
              <Tooltip title={t('btn-reset')}>
                <IconButton onClick={() => onChange(dataPropName)}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            )}
          </InputAdornment>
        ),
      }}
    >
      {dataPropName === DataPropNameEnum.Data && [
        <MenuItem key="root" value="[[root]]">
          {t('widgets:opt-source-setting.root')}
        </MenuItem>,
        !isExtensionAllowed ? null : (
          <MenuItem key="extension" value="[[extension]]">
            {t('widgets:opt-source-setting.extension')}
          </MenuItem>
        ),
      ]}

      {Object.entries(recordsOptions || {})
        .map(([group, options]) =>
          !options.length
            ? null
            : [
                <ListSubheader
                  {...{ muiSkipListHighlight: true }}
                  key={`group:${group}`}
                  sx={{ background: 'transparent' }}
                >
                  <Typography variant="caption" color="text.disabled">
                    {t(`widgets:opt-source-setting.${group}`)}
                  </Typography>
                </ListSubheader>,

                ...options.map(({ fieldPath, indexes }) => (
                  <MenuItem
                    key={`${group}:${fieldPath}`}
                    value={JSON.stringify(indexes)}
                  >
                    {fieldPath}
                  </MenuItem>
                )),
              ]
        )
        .flat()}
    </TextField>
  );
}
