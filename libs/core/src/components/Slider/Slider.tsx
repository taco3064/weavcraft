import MuiSlider from '@mui/material/Slider';

import { withGenerateDataProps } from '../../contexts';
import type { SliderProps, MappablePropNames } from './Slider.types';

export default withGenerateDataProps<SliderProps, MappablePropNames>(
  function Slider(props) {
    return <MuiSlider {...props} data-testid="Slider" />;
  }
);
