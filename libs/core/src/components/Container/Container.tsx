import MuiContainer from '@mui/material/Container';

import { withGenerateDataProps } from '../../contexts';
import type { ContainerProps, MappablePropNames } from './Container.types';

export default withGenerateDataProps<ContainerProps, MappablePropNames>(
  function Container(props) {
    return <MuiContainer {...props} data-testid="Container" />;
  }
);
