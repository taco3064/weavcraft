import MuiTextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { MobileTimePicker as MuiMobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

import BaseField from '../BaseField';
import type { TimePickerFieldProps } from './TimePickerField.types';

export default function TimePickerField({
  disableFuture,
  disablePast,
  format = 'HH:mm',
  label,
  maxTime,
  minTime,
  name,
  openTo,
  views,
  value,
  onChange,
  ...props
}: TimePickerFieldProps) {
  return (
    <MuiMobileTimePicker
      {...{
        disableFuture,
        disablePast,
        format,
        openTo,
        views,
      }}
      closeOnSelect
      ampm={false}
      maxTime={!maxTime ? undefined : dayjs(maxTime, format)}
      minTime={!minTime ? undefined : dayjs(minTime, format)}
      label={label}
      name={name}
      value={!value ? '' : dayjs(value, format)}
      onChange={(newValue) =>
        onChange?.(!newValue ? undefined : dayjs(newValue).format(format), name)
      }
      slots={{ textField: BaseField as typeof MuiTextField }}
      slotProps={{
        mobilePaper: {
          'data-testid': 'TimePickerFieldMenu',
        } as never,
        textField: {
          ...props,
          name,
          'data-testid': 'TimePickerField',
        } as never,
      }}
    />
  );
}
