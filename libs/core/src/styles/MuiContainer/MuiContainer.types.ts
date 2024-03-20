import MuiContainer from '@mui/material/Container';
import type { ComponentProps, ReactElement } from 'react';
import type { Property } from 'csstype';

type BaseContainerProps = ComponentProps<typeof MuiContainer>;

export interface WidgetWrapperProps
  extends Omit<BaseContainerProps, 'children' | 'disableGutters' | 'style'> {
  children?: ReactElement | null;
  direction?: Property.FlexDirection;
  footer?: ReactElement | null;
  header?: ReactElement | null;
  height?: Property.Height;
}
