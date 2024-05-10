import { useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';

import { DataStructureProvider, useGenerateData } from '../../contexts';
import { usePropsGetter } from '../usePropsGetter';
import type { BaseProps } from './useStoreProps.types';

export function useStoreProps<D extends JsonObject, P extends BaseProps<D>>(
  props: P
) {
  const { records, propMapping } = props;
  const { data } = useGenerateData<D>();

  const getProps = usePropsGetter<D>();
  const recordsMappingPath = propMapping?.records as string;

  return [
    useMemo<FC<{ children: ReactNode }>>(
      () =>
        ({ children }) =>
          (
            <DataStructureProvider
              records={records}
              recordsMappingPath={recordsMappingPath}
            >
              {children}
            </DataStructureProvider>
          ),
      [records, recordsMappingPath]
    ),

    getProps({ ...props, data }),
  ] as const;
}
