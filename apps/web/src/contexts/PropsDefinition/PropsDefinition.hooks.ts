import { createContext, useContext } from 'react';

import type { PropsDefinition, WidgetType } from '~web/services';
import type { PropsDefinitionContextValue } from './PropsDefinition.types';

// function getDefinitionsByType<T extends PropType>(
//   targetType: T,
//   propsType: PropsType
// ): Record<
//   string,
//   NonNullable<Extract<PropTypeDefinitions.PropTypes, { type: T }>['definition']>
// > {
//   return Object.entries(propsType).reduce(
//     (acc, [path, { type, definition }]) => {
//       if (type === targetType) {
//         return { ...acc, [path]: definition };
//       } else if (type !== 'object') {
//         return acc;
//       }

//       const result = getDefinitionsByType(
//         targetType,
//         (definition || {}) as PropsType
//       );

//       return Object.entries(result).reduce(
//         (subAcc, [subPath, subDefinition]) => ({
//           ...subAcc,
//           [`${path}.${subPath}`]: subDefinition,
//         }),
//         acc
//       );
//     },
//     {}
//   );
// }

export const PropsDefinitionContext =
  createContext<PropsDefinitionContextValue>([]);

export function usePropsDefinition() {
  const definitions = useContext(PropsDefinitionContext);

  return {
    definitions,

    getDefinition: (widgetId: WidgetType) =>
      definitions.find(
        ({ componentName }) => componentName === widgetId
      ) as PropsDefinition,
  };
}
