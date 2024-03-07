import { MobileDatePicker as MuiDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import type { ComponentProps } from 'react';

import type { BaseFieldWithoutInputProps } from '../BaseField';

type MuiDatePickerProps = Pick<
  ComponentProps<typeof MuiDatePicker>,
  'disableFuture' | 'disablePast' | 'format' | 'openTo' | 'views'
>;

export interface DatePickerFieldProps
  extends MuiDatePickerProps,
    BaseFieldWithoutInputProps<string> {
  maxDate?: string;
  minDate?: string;
}
