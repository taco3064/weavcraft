import Core from '@weavcraft/core';
import { lazy } from 'react';

import { PropsDefinitionContext } from './PropsDefinition.hooks';
import { getPropsDefinition, type WidgetType } from '~web/services';
import type { PropsDefinitionProviderProps } from './PropsDefinition.types';

export default lazy(async () => {
  const definitions = await Promise.all(
    Object.keys(Core)
      .filter((widgetId) => widgetId !== 'fontawesomes')
      .map((widgetId) => getPropsDefinition(widgetId as WidgetType))
  );

  return {
    default: function PropsDefinitionProvider({
      children,
    }: PropsDefinitionProviderProps) {
      return (
        <PropsDefinitionContext.Provider value={definitions}>
          {children}
        </PropsDefinitionContext.Provider>
      );
    },
  };
});
