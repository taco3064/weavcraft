import { AppSettingsContext, AppSettingsProvider } from './AppSettings';
import { TogglePortalContext, TogglePortalProvider } from './TogglePortal';
import { LayoutSourcesContext, LayoutSourcesProvider } from './LayoutSources';

import {
  CoreDefinitionContext,
  CoreDefinitionProvider,
} from './CoreDefinition';

export { withCoreDefinition } from './CoreDefinition';
export type * from './AppSettings';
export type * from './CoreDefinition';
export type * from './LayoutSources';
export type * from './TogglePortal';

export const Context = {
  AppSettings: AppSettingsContext,
  CoreDefinition: CoreDefinitionContext,
  LayoutSources: LayoutSourcesContext,
  TogglePortal: TogglePortalContext,
};

export const Provider = {
  AppSettings: AppSettingsProvider,
  CoreDefinition: CoreDefinitionProvider,
  LayoutSources: LayoutSourcesProvider,
  TogglePortal: TogglePortalProvider,
};
