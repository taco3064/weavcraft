import type { ComponentProps, ComponentType, ReactNode } from 'react';
import type { PortalContainerEl } from '../imports.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortalWrapperProps<W extends ComponentType<any>> =
  ComponentProps<W> & {
    children: ReactNode;
    containerEl?: PortalContainerEl;
    WrapperComponent?: W;
  };
