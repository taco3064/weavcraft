import { AppSettingsContext, AppSettingsProvider } from './AppSettings';
import { TogglePortalContext, TogglePortalProvider } from './TogglePortal';
import { HierarchyDataContext, HierarchyDataProvider } from './HierarchyData';

import {
  CoreDefinitionContext,
  CoreDefinitionProvider,
} from './CoreDefinition';

export { withCoreDefinition } from './CoreDefinition';
export type * from './AppSettings';
export type * from './CoreDefinition';
export type * from './HierarchyData';
export type * from './TogglePortal';

export const Context = {
  AppSettings: AppSettingsContext,
  CoreDefinition: CoreDefinitionContext,
  HierarchyData: HierarchyDataContext,
  TogglePortal: TogglePortalContext,
};

export const Provider = {
  AppSettings: AppSettingsProvider,
  CoreDefinition: CoreDefinitionProvider,
  HierarchyData: HierarchyDataProvider,
  TogglePortal: TogglePortalProvider,
};
