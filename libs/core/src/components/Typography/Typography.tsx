import MuiTypography from '@mui/material/Typography';

import { withGenerateDataProps } from '../../contexts';
import type { TypographyProps, MappablePropNames } from './Typography.types';

export default withGenerateDataProps<TypographyProps, MappablePropNames>(
  function Typography({ align, ...props }) {
    return (
      <MuiTypography
        {...props}
        data-testid="Typography"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent={
          align === 'center'
            ? 'center'
            : align === 'right'
            ? 'flex-end'
            : 'flex-start'
        }
      />
    );
  }
);
