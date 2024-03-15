import MuiDivider from '@mui/material/Divider';

import { withGenerateDataProps } from '../../contexts';
import type { DividerProps, MappablePropNames } from './Divider.types';

export default withGenerateDataProps<DividerProps, MappablePropNames>(
  function Divider({ text, ...props }) {
    return (
      <MuiDivider {...props} data-testid="Divider">
        {text}
      </MuiDivider>
    );
  }
);
