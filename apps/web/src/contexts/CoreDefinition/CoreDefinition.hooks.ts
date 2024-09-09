import { createContext } from 'react';
import type { CoreDefinitionContextValue } from './CoreDefinition.types';

export const CoreDefinitionContext =
  createContext<CoreDefinitionContextValue | null>(null);
