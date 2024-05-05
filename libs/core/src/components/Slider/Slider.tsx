import MuiSlider from '@mui/material/Slider';

import { withGenerateData } from '../../contexts';
import type { SliderProps, MappablePropNames } from './Slider.types';

export default withGenerateData<SliderProps, MappablePropNames>(function Slider(
  props
) {
  return <MuiSlider {...props} data-testid="Slider" />;
});
