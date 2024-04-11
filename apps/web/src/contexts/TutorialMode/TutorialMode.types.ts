import type { ReactNode } from 'react';

export type TutorialModeContextValue = boolean;

export interface TutorialModeProviderProps {
  children: ReactNode;
  enabled?: boolean;
}
