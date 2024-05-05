import MuiDivider from '@mui/material/Divider';

import { withGenerateData } from '../../contexts';
import type { DividerProps, MappablePropNames } from './Divider.types';

export default withGenerateData<DividerProps, MappablePropNames>(
  function Divider({ text, ...props }) {
    return (
      <MuiDivider {...props} data-testid="Divider">
        {text}
      </MuiDivider>
    );
  }
);
