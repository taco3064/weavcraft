import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import { forwardRef } from 'react';

import { useLinkStyles } from './Link.styles';
import type { LinkProps } from './Link.types';

export default forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, href, ...props },
  ref
) {
  const { classes } = useLinkStyles();

  return (
    <MuiLink
      {...props}
      ref={ref}
      className={classes.root}
      href={href as string}
      component={NextLink}
    >
      {children}
    </MuiLink>
  );
});
