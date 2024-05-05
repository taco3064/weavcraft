import MuiContainer from '@mui/material/Container';

import { withGenerateData } from '../../contexts';
import type { ContainerProps, MappablePropNames } from './Container.types';

export default withGenerateData<ContainerProps, MappablePropNames>(
  function Container(props) {
    return <MuiContainer {...props} data-testid="Container" />;
  }
);
