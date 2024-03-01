import _get from 'lodash/get';
import type { ComponentType } from 'react';

import type { ActionElement, BaseActionProps, GenericData } from '../../types';
import type { TargetProps } from './usePropsTransformation.types';

function getProps<P extends TargetProps>({ data, propMapping, ...props }: P) {
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

export function useActionPropsTransformation<
  D extends GenericData,
  P extends BaseActionProps
>(action?: ActionElement<D, P>, onItemToggle?: (item: D) => void) {
  const { type: Action, props } = action || {};

  return {
    Action: Action as ComponentType<P> | undefined,

    getActionProps: (data: D): P =>
      ({
        ...getProps({ ...props, data }),
        onClick: () => onItemToggle?.(data),
      } as P),
  };
}
