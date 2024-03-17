import MuiContainer from '@mui/material/Container';
import type { ComponentProps, ReactElement } from 'react';
import type { Property } from 'csstype';

type BaseContainerProps = ComponentProps<typeof MuiContainer>;

export interface LayoutWrapperProps
  extends Omit<BaseContainerProps, 'children'> {
  children?: ReactElement | null;
  footer?: ReactElement | null;
  header?: ReactElement | null;
  height?: Property.Height;
}
