import _set from 'lodash/set';
import { ThemeProvider, type ThemeOptions } from '@mui/material/styles';
import { useCallback } from 'react';

import type { DefaultPropsProviderProps } from './WidgetEditor.types';

export default function DefaultPropsProvider({
  children,
}: DefaultPropsProviderProps) {
  const getDefaultPropsTheme = useCallback(
    ({ components, ...outer }: Required<ThemeOptions>) => {
      _set(components, ['MuiButton', 'defaultProps', 'children'], 'Button');

      return {
        ...outer,
        components,
      };
    },
    []
  );

  return <ThemeProvider theme={getDefaultPropsTheme}>{children}</ThemeProvider>;
}
