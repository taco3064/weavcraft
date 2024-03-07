import MuiTextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { MobileDatePicker as MuiMobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import BaseField from '../BaseField';
import type { DatePickerFieldProps } from './DatePickerField.types';

export default function DatePickerField({
  disableFuture,
  disablePast,
  format = 'YYYY-MM-DD',
  label,
  maxDate,
  minDate,
  name,
  openTo,
  views,
  value,
  onChange,
  ...props
}: DatePickerFieldProps) {
  return (
    <MuiMobileDatePicker
      {...{
        disableFuture,
        disablePast,
        format,
        openTo,
        views,
      }}
      closeOnSelect
      maxDate={!maxDate ? undefined : dayjs(maxDate, format)}
      minDate={!minDate ? undefined : dayjs(minDate, format)}
      label={label}
      name={name}
      value={!value ? '' : dayjs(value, format)}
      onChange={(newValue) =>
        onChange?.(!newValue ? undefined : dayjs(newValue).format(format), name)
      }
      slots={{ textField: BaseField as typeof MuiTextField }}
      slotProps={{
        mobilePaper: {
          'data-testid': 'DatePickerFieldMenu',
        } as never,
        textField: {
          ...props,
          name,
          'data-testid': 'DatePickerField',
        } as never,
      }}
    />
  );
}
