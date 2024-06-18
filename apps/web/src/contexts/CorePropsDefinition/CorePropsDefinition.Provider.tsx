import Core from '@weavcraft/core';
import { lazy } from 'react';

import { CorePropsDefinitionContext } from './CorePropsDefinition.hooks';
import { getPropsDefinition, type WidgetType } from '~web/services';

import type {
  CorePropsDefinitionProviderProps,
  CorePropsDefinitionContextValue,
} from './CorePropsDefinition.types';

export default lazy(async () => {
  const definitions = await Promise.all(
    Object.keys(Core)
      .filter((widgetId) => widgetId !== 'fontawesomes')
      .map((widgetId) => getPropsDefinition(widgetId as WidgetType))
  );

  const value = definitions.reduce(
    (acc, definition) => ({
      ...acc,
      [definition.componentName]: definition,
    }),
    {} as CorePropsDefinitionContextValue
  );

  return {
    default: function CorePropsDefinitionProvider({
      children,
    }: CorePropsDefinitionProviderProps) {
      return (
        <CorePropsDefinitionContext.Provider value={value}>
          {children}
        </CorePropsDefinitionContext.Provider>
      );
    },
  };
});
