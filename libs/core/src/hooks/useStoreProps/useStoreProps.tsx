import type { JsonObject } from 'type-fest';

import { useGenerateData } from '../../contexts';
import { usePropsGetter } from '../usePropsGetter';
import type { BaseProps } from './useStoreProps.types';

export function useStoreProps<D extends JsonObject, P extends BaseProps<D>>(
  props: P
) {
  const { data } = useGenerateData<D>();
  const getProps = usePropsGetter<D>();

  return getProps({ ...props, data });
}
