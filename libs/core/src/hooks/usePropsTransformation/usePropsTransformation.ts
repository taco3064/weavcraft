import _get from 'lodash/get';
import type { ComponentType } from 'react';

import type { ActionElement, BaseActionProps, GenericData } from '../../types';
import type { TargetProps } from './usePropsTransformation.types';

export function getProps<P extends TargetProps>({
  data,
  propMapping,
  ...props
}: P) {
  return Object.entries(propMapping || {}).reduce(
    (result, [key, path]) => ({
      ...result,
      [key]: _get(data, path as string),
    }),
    { ...props } as Omit<P, 'data' | 'propMapping'>
  );
}

export function usePropsTransformation<P extends TargetProps>(
  props: P
): Omit<P, 'data' | 'propMapping'> {
  return getProps(props);
}

export function useSlotPropsTransformation<
  D extends GenericData,
  P extends BaseActionProps
>(action?: ActionElement<D, P>, onItemToggle?: (item: D) => void) {
  const { type: Slot, props } = action || {};

  return {
    Slot: Slot as ComponentType<P> | undefined,

    getSlotProps: (data: D): P =>
      ({
        ...getProps({ ...props, data }),
        ...(onItemToggle && {
          onClick: (...args) => {
            args.forEach((arg) => arg?.stopPropagation());
            onItemToggle(data);
          },
        }),
      } as P),
  };
}
