import type { Breakpoint } from '@mui/material/styles';
import type { ContainerProps } from '@mui/material/Container';

export type FrameStyle = 'mobile' | 'tablet' | 'laptop';

export interface StyleParams extends Pick<ViewportFrameProps, 'breakpoint'> {
  scale: number;
  translateY: number;
}

export interface ViewportFrameProps<T = unknown>
  extends Pick<ContainerProps, 'maxWidth'> {
  breakpoint: Breakpoint;
  config?: T;
  variant: 'pages';
}
