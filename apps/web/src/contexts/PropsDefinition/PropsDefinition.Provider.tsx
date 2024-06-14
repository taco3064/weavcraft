import Core from '@weavcraft/core';
import { lazy } from 'react';

import { PropsDefinitionContext } from './PropsDefinition.hooks';
import { getPropsDefinition, type WidgetType } from '~web/services';

import type {
  PropsDefinitionProviderProps,
  PropsDefinitionContextValue,
} from './PropsDefinition.types';

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
    {} as PropsDefinitionContextValue
  );

  return {
    default: function PropsDefinitionProvider({
      children,
    }: PropsDefinitionProviderProps) {
      return (
        <PropsDefinitionContext.Provider value={value}>
          {children}
        </PropsDefinitionContext.Provider>
      );
    },
  };
});
