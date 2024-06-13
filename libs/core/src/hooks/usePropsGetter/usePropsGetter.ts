import _get from 'lodash/get';
import type { JsonObject } from 'type-fest';

import type { MappableProps } from './usePropsGetter.types';

export function usePropsGetter<D extends JsonObject>() {
  return function <
    P extends MappableProps<D>,
    R = Omit<P, 'data' | 'propMapping'>
  >({ data, propMapping, ...props }: P & MappableProps<D>) {
    /**
     * * Note:
     * * - The key should not be a hierarchical path, and it should be a single identifier.
     * * - The propValue is the default value, used when the dataValue is undefined.
     */
    return Object.entries(propMapping || {}).reduce((result, [key, path]) => {
      const propValue = _get(props, key);
      const dataValue = _get(data, path as string);

      return {
        ...result,
        [key]: dataValue !== undefined ? dataValue : propValue,
      };
    }, props) as R;
  };
}
