import type * as React from 'react';

type ToggleEventHandler = (open: boolean) => void;

export type PortalContainerEl = HTMLElement | undefined | null;

export interface TogglePortalContextValue {
  containerEl?: HTMLElement;
  open: boolean;
  toggleRef?: React.MutableRefObject<ToggleEventHandler>;
}

export interface TogglePortalProviderProps
  extends Pick<TogglePortalContextValue, 'open'> {
  render: (containerRef: (el: PortalContainerEl) => void) => React.ReactNode;
  onToggle: ToggleEventHandler;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortalWrapperProps<W extends React.ComponentType<any>> =
  React.ComponentProps<W> & {
    children: React.ReactNode;
    containerEl?: PortalContainerEl;
    WrapperComponent?: W;
  };
