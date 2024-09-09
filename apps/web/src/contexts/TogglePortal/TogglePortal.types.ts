import type { MutableRefObject, ReactNode } from 'react';

type ToggleEventHandler = (open: boolean) => void;

export type PortalContainerEl = HTMLElement | undefined | null;

export interface TogglePortalContextValue {
  containerEl?: HTMLElement;
  open: boolean;
  toggleRef?: MutableRefObject<ToggleEventHandler>;
}

export interface TogglePortalProviderProps
  extends Pick<TogglePortalContextValue, 'open'> {
  render: (containerRef: (el: PortalContainerEl) => void) => ReactNode;
  onToggle: ToggleEventHandler;
}
