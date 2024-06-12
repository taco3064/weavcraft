import _get from 'lodash/get';
import { useEffect, useRef } from 'react';
import type { JsonObject } from 'type-fest';

import { useDataStructure, useStructure } from '../../contexts';
import type { MappableProps } from './usePropsGetter.types';

export function usePropsGetter<D extends JsonObject>() {
  const { root, paths } = useDataStructure();
  const { set, destroy } = useStructure();
  const destroyRef = useRef(() => destroy(root, paths));

  useEffect(() => destroyRef.current, [destroyRef]);

  return function <
    P extends MappableProps<D>,
    R = Omit<P, 'data' | 'propMapping'>
  >({ data, propMapping, ...props }: P & MappableProps<D>) {
    return Object.entries(propMapping || {}).reduce((result, [key, path]) => {
      const propValue = _get(props, key);
      const dataValue = _get(data, path as string);

      //* - The prop value is default value, if the data value is undefined.
      if (dataValue !== undefined) {
        set(root, [...paths, key], dataValue);

        return { ...result, [key]: dataValue };
      }

      return { ...result, [key]: propValue };
    }, props) as R;
  };
}
