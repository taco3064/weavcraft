import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import { forwardRef } from 'react';

import type { LinkProps } from './Link.types';

export default forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, href, ...props },
  ref
) {
  return (
    <MuiLink {...props} ref={ref} href={href as string} component={NextLink}>
      {children}
    </MuiLink>
  );
});
