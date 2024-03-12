import type { ReactNode } from 'react';

export interface PortalContainerProps {
  id?: string;
  children: ReactNode;
  onContainerRetrieved?: (container: HTMLElement) => void;
}
