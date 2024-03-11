import MuiTextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { MobileDateTimePicker as MuiMobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import BaseField from '../BaseField';
import type { DateTimePickerFieldProps } from './DateTimePickerField.types';

export default function DateTimePickerField({
  disableFuture,
  disablePast,
  dateFormat = 'YYYY-MM-DD',
  timeFormat = 'HH:mm',
  label,
  maxDate,
  minDate,
  maxTime,
  minTime,
  maxDateTime,
  minDateTime,
  name,
  openTo,
  views,
  value,
  onChange,
  ...props
}: DateTimePickerFieldProps) {
  const format = `${dateFormat} ${timeFormat}`;

  return (
    <MuiMobileDateTimePicker
      {...{
        disableFuture,
        disablePast,
        format,
        openTo,
        views,
      }}
      closeOnSelect
      disableIgnoringDatePartForTimeValidation
      ampm={false}
      maxTime={!maxTime ? undefined : dayjs(maxTime, timeFormat)}
      minTime={!minTime ? undefined : dayjs(minTime, timeFormat)}
      maxDate={!maxDate ? undefined : dayjs(maxDate, dateFormat)}
      minDate={!minDate ? undefined : dayjs(minDate, dateFormat)}
      maxDateTime={!maxDateTime ? undefined : dayjs(maxDateTime, format)}
      minDateTime={!minDateTime ? undefined : dayjs(minDateTime, format)}
      label={label}
      name={name}
      value={!value ? '' : dayjs(value, format)}
      onChange={(newValue) =>
        onChange?.(!newValue ? undefined : dayjs(newValue).format(format), name)
      }
      slots={{ textField: BaseField as typeof MuiTextField }}
      slotProps={{
        mobilePaper: {
          'data-testid': 'DateTimePickerFieldMenu',
        } as never,
        textField: {
          ...props,
          name,
          'data-testid': 'DateTimePickerField',
        } as never,
      }}
    />
  );
}
