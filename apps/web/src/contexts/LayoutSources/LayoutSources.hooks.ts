import { createContext } from 'react';
import type { LayoutSourcesContextValue } from './LayoutSources.types';

export const LayoutSourcesContext = createContext<LayoutSourcesContextValue>(
  {}
);
