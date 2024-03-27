import * as Notistack from 'notistack';
import { forwardRef } from 'react';

import { useContentStyles } from './Notistack.styles';
import type { MaterialDesignContentProps } from './Notistack.types';

export default forwardRef<never, MaterialDesignContentProps>(
  function MaterialDesignContent({ className, variant, ...props }, ref) {
    const { cx, classes } = useContentStyles({ variant });

    return (
      <Notistack.MaterialDesignContent
        {...props}
        ref={ref}
        className={cx(classes?.root, className)}
        variant={variant}
      />
    );
  }
);
