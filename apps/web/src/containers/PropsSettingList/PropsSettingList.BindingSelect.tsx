import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import _get from 'lodash/get';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';

import type { BindingSelectProps } from './PropsSettingList.types';

import {
  useFieldBindingOptions,
  useIndexesValue,
} from './PropsSettingList.hooks';

export default function BindingSelect({
  config,
  paths,
  propPath,
  widget,
  value,
  onFieldBinding,
}: BindingSelectProps) {
  const { t } = useTranslation();

  const defaultValue = _get(config, ['props', propPath, 'value']);
  const options = useFieldBindingOptions({ widget, config, paths, propPath });

  const [selectValue, handleChange] = useIndexesValue(
    propPath,
    value,
    onFieldBinding
  );

  return (
    <TextField
      SelectProps={{ IconComponent: Fragment }}
      fullWidth
      select
      variant="filled"
      size="small"
      color="warning"
      label={propPath}
      value={selectValue}
      onChange={handleChange}
      helperText={
        <Typography variant="caption" color="warning.main">
          {t('widgets:lbl-default-value', {
            value: defaultValue || t('lbl-none'),
          })}
        </Typography>
      }
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {!value ? (
              <ArrowDropDownIcon />
            ) : (
              <Tooltip title={t('btn-reset')}>
                <IconButton onClick={() => onFieldBinding(propPath)}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            )}
          </InputAdornment>
        ),
      }}
    >
      {options.map(({ fieldPath, indexes }) => (
        <MenuItem key={fieldPath} value={JSON.stringify(indexes)}>
          {fieldPath}
        </MenuItem>
      ))}
    </TextField>
  );
}
