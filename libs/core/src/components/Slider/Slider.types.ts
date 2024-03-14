import MuiSlider from '@mui/material/Slider';
import type { ComponentProps } from 'react';

import type { GenericData, PropsWithMappedData } from '../../contexts';

export type SliderProps = Pick<
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

export type MappablePropNames = keyof Pick<
  SliderProps,
  'disabled' | 'marks' | 'max' | 'min' | 'name' | 'value'
>;

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  SliderProps,
  MappablePropNames
>;
