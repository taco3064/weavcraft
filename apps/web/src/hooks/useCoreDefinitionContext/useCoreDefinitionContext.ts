import _get from 'lodash/get';
import { useCallback, useContext } from 'react';
import { Context } from '~web/contexts';

import type {
  GetCorePropsFn,
  MappingPath,
} from './useCoreDefinitionContext.types';

export function useCorePropsGetter() {
  const definitions = useContext(Context.CoreDefinition);

  return useCallback<GetCorePropsFn>(
    (component) => {
      const { [component]: definition } = definitions as NonNullable<
        typeof definitions
      >;

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
