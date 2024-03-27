import * as Notistack from 'notistack';
import { Display } from '@weavcraft/core';
import { forwardRef } from 'react';

import MaterialDesignContent from './Notistack.content';
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
          info: <Display.Icon code="faCircleInfo" className={classes.icon} />,
          success: (
            <Display.Icon code="faCircleCheck" className={classes.icon} />
          ),
          warning: (
            <Display.Icon
              code="faTriangleExclamation"
              className={classes.icon}
            />
          ),
          error: (
            <Display.Icon code="faCircleExclamation" className={classes.icon} />
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
