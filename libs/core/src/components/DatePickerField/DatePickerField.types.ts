import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import type { ComponentProps } from 'react';

import type { BaseFieldWithoutInputProps } from '../BaseField';

type MuiMobileDatePickerProps = Pick<
  ComponentProps<typeof MobileDatePicker>,
  | 'closeOnSelect'
  | 'disableFuture'
  | 'disablePast'
  | 'format'
  | 'openTo'
  | 'views'
>;

export interface DatePickerFieldProps
  extends MuiMobileDatePickerProps,
    BaseFieldWithoutInputProps<string> {
  maxDate?: string;
  minDate?: string;
}
