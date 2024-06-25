import _get from 'lodash/get';
import { createContext, useCallback, useContext } from 'react';

import type {
  GetCorePropsFn,
  MappingPath,
  CorePropsDefinitionContextValue,
} from './CorePropsDefinition.types';

export function getBasePropPath(path: string) {
  return path.replace(/\.?propMapping$/, '');
}

export const CorePropsDefinitionContext =
  createContext<CorePropsDefinitionContextValue | null>(null);

export function useCorePropsGetter() {
  const definitions = useContext(
    CorePropsDefinitionContext
  ) as CorePropsDefinitionContextValue;

  return useCallback<GetCorePropsFn>(
    (widget) => {
      const definition = definitions[widget];

      const { dataBindingProps, elementNodeProps, primitiveValueProps } =
        definition;

      const dataBinding = Object.entries(dataBindingProps || {});

      const isStoreWidget = dataBinding.some(
        ([, { type, definition }]) =>
          type === 'data' && _get(definition, 'multiple')
      );

      const mappingPaths = dataBinding
        .filter(
          ([path]) =>
            _get(definition, ['dataBindingProps', path, 'type']) === 'mapping'
        )
        .map(([path]) => path) as MappingPath[];

      return {
        definition,
        isStoreWidget,
        mappingPaths,

        mappableProps: {
          ...elementNodeProps,
          ...primitiveValueProps,
        },
      };
    },
    [definitions]
  );
}
