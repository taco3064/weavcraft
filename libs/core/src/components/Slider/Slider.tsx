import MuiSlider from '@mui/material/Slider';
import type { JsonObject } from 'type-fest';

import { useGenerateProps } from '../../hooks';
import type { SliderProps } from './Slider.types';

export default function Slider<D extends JsonObject>(props: SliderProps<D>) {
  const [GeneratePropsProvider, sliderProps] = useGenerateProps<
    D,
    SliderProps<D>
  >(props);

  return (
    <GeneratePropsProvider>
      <MuiSlider {...sliderProps} data-testid="Slider" />
    </GeneratePropsProvider>
  );
}
