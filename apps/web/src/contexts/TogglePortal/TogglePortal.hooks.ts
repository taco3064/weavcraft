import { createContext } from 'react';
import type { TogglePortalContextValue } from './TogglePortal.types';

export const TogglePortalContext = createContext<TogglePortalContextValue>({
  open: false,
});
