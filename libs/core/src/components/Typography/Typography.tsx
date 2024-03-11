import MuiTypography from '@mui/material/Typography';

import Icon from '../Icon';
import { withGenerateDataProps } from '../../contexts';
import type { TypographyProps, MappablePropNames } from './Typography.types';

export default withGenerateDataProps<TypographyProps, MappablePropNames>(
  function Typography({ align, children, icon, ...props }) {
    return (
      <MuiTypography
        {...props}
        data-testid="Typography"
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={1}
        justifyContent={
          align === 'center'
            ? 'center'
            : align === 'right'
            ? 'flex-end'
            : 'flex-start'
        }
      >
        {icon && <Icon color="inherit" fontSize="inherit" code={icon} />}
        {children}
      </MuiTypography>
    );
  }
);
