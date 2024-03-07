import { MobileTimePicker as MuiTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import type { ComponentProps } from 'react';

import type { BaseFieldWithoutInputProps } from '../BaseField';

type MuiTimePickerProps = Pick<
  ComponentProps<typeof MuiTimePicker>,
  'disableFuture' | 'disablePast' | 'format' | 'openTo' | 'views'
>;

export interface TimePickerFieldProps
  extends MuiTimePickerProps,
    BaseFieldWithoutInputProps<string> {
  maxTime?: string;
  minTime?: string;
}
