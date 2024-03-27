import MuiContainer from '@mui/material/Container';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import type { Property } from 'csstype';

type BaseContainerProps = ComponentProps<typeof MuiContainer>;

export interface WidgetWrapperProps
  extends Omit<
    BaseContainerProps,
    'children' | 'classes' | 'disableGutters' | 'style'
  > {
  children?: ReactNode;
  direction?: Property.FlexDirection;
  header?: ReactElement | null;
  height?: Property.Height;

  classes?: BaseContainerProps['classes'] & {
    content?: string;
  };
}
