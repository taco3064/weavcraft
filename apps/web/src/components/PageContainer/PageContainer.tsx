import Container from '@mui/material/Container';

import { useMainStyles } from './PageContainer.styles';
import type { PageContainerProps } from './PageContainer.types';

export default function PageContainer({
  className,
  ...props
}: PageContainerProps) {
  const { classes, cx } = useMainStyles();

  return (
    <Container
      component="main"
      className={cx(classes.root, className)}
      {...props}
    />
  );
}
