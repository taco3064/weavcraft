import * as Notistack from 'notistack';
import Core from '@weavcraft/core';
import { forwardRef } from 'react';

import MaterialDesignContent from './Notistack.Content';
import { useProviderStyles } from './Notistack.styles';
import type { NotistackProviderProps } from './Notistack.types';

export default forwardRef<never, NotistackProviderProps>(
  function NotistackProvider(props, ref) {
    const { classes } = useProviderStyles();

    return (
      <Notistack.SnackbarProvider
        {...props}
        ref={ref}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        iconVariant={{
          info: <Core.Icon code="faCircleInfo" className={classes.icon} />,
          success: <Core.Icon code="faCircleCheck" className={classes.icon} />,
          warning: (
            <Core.Icon code="faTriangleExclamation" className={classes.icon} />
          ),
          error: (
            <Core.Icon code="faCircleExclamation" className={classes.icon} />
          ),
        }}
        Components={{
          default: MaterialDesignContent,
          info: MaterialDesignContent,
          success: MaterialDesignContent,
          warning: MaterialDesignContent,
          error: MaterialDesignContent,
        }}
      />
    );
  }
);
