import { MobileDateTimePicker as MuiMobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import type { ComponentProps } from 'react';

import type { BaseFieldWithoutInputProps } from '../BaseField';

type MuiMobileDateTimePickerProps = Pick<
  ComponentProps<typeof MuiMobileDateTimePicker>,
  'disableFuture' | 'disablePast' | 'openTo' | 'views'
>;

export interface DateTimePickerFieldProps
  extends MuiMobileDateTimePickerProps,
    BaseFieldWithoutInputProps<string> {
  dateFormat?: string;
  timeFormat?: string;
  maxDate?: string;
  minDate?: string;
  maxTime?: string;
  minTime?: string;
  maxDateTime?: string;
  minDateTime?: string;
}
