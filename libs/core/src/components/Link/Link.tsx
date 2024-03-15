import MuiLink from '@mui/material/Link';

import Icon from '../Icon';
import { withGenerateDataProps } from '../../contexts';
import type { LinkProps, MappablePropNames } from './Link.types';

export default withGenerateDataProps<LinkProps, MappablePropNames>(
  function Link({ align, children, icon, ...props }) {
    return (
      <MuiLink
        {...props}
        data-testid="Link"
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
      </MuiLink>
    );
  }
);
