import { useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';

import { GenerateDataProvider, useGenerateData } from '../../contexts';
import { usePropsGetter } from '../usePropsGetter';
import type { BaseProps } from './useGenerateProps.types';

export function useGenerateProps<D extends JsonObject, P extends BaseProps<D>>({
  data: outerData,
  ...props
}: P) {
  const { type, data, onChange } = useGenerateData<D>(outerData);
  const getProps = usePropsGetter<D>();

  return [
    useMemo<FC<{ children: ReactNode }>>(
      () =>
        ({ children }) =>
          type === 'context' ? (
            children
          ) : (
            <GenerateDataProvider value={[data, onChange]}>
              {children}
            </GenerateDataProvider>
          ),
      [type, data, onChange]
    ),

    getProps({ ...props, data }),
    { data, onChange },
  ] as const;
}
