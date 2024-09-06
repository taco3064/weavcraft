import type { ReactNode } from 'react';
import type { ComponentDefinition, CoreComponent } from '../imports.types';

export type CoreDefinitionContextValue = Record<
  CoreComponent,
  ComponentDefinition
>;

export interface CoreDefinitionProviderProps {
  children: ReactNode;
}
