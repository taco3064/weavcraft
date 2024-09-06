import Core from '@weavcraft/core';
import { lazy } from 'react';

import { CoreDefinitionContext } from './CoreDefinition.hooks';
import { getPropsDefinition } from '~web/services';
import type { CoreComponent } from '../imports.types';

import type {
  CoreDefinitionProviderProps,
  CoreDefinitionContextValue,
} from './CoreDefinition.types';

export default lazy(async () => {
  const definitions = await Promise.all(
    Object.keys(Core)
      .filter((widgetId) => widgetId !== 'fontawesomes')
      .map((widgetId) => getPropsDefinition(widgetId as CoreComponent))
  );

  const value = definitions.reduce(
    (acc, definition) => ({
      ...acc,
      [definition.componentName]: definition,
    }),
    {} as CoreDefinitionContextValue
  );

  return {
    default: function CorePropsDefinitionProvider({
      children,
    }: CoreDefinitionProviderProps) {
      return (
        <CoreDefinitionContext.Provider value={value}>
          {children}
        </CoreDefinitionContext.Provider>
      );
    },
  };
});
