import MuiSlider from '@mui/material/Slider';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';

type BaseSliderProps = Pick<
  ComponentProps<typeof MuiSlider>,
  | 'color'
  | 'disabled'
  | 'marks'
  | 'max'
  | 'min'
  | 'name'
  | 'orientation'
  | 'shiftStep'
  | 'size'
  | 'step'
  | 'track'
  | 'value'
  | 'valueLabelDisplay'
  | 'onChange'
>;

export type SliderProps<D extends JsonObject> = PropsWithMappedData<
  D,
  BaseSliderProps,
  'disabled' | 'marks' | 'max' | 'min' | 'name' | 'value'
>;
