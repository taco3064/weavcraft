import _get from 'lodash/get';
import { createContext, useContext, type ComponentType } from 'react';

import type {
  GenericData,
  MappableProps,
  SlotElement,
} from './GenerateDataProps.types';

//* Context
export const GenerateDataPropsContext = createContext<GenericData | undefined>(
  undefined
);

//* Custom Hooks
export function usePropsGenerator<D extends GenericData>() {
  return function <
    P extends MappableProps<D>,
    R = Omit<P, 'data' | 'propMapping'>
  >({ data, propMapping, ...props }: P & MappableProps<D>) {
    return Object.entries(propMapping || {}).reduce(
      (result, [key, path]) => ({
        ...result,
        [key]: _get(result, key) || _get(data, path as string),
      }),
      props
    ) as R;
  };
}

export function useGenerateData<D extends GenericData>() {
  return useContext(GenerateDataPropsContext) as D;
}

export function useGenerateSlotProps<D extends GenericData>(
  action?: SlotElement,
  onItemToggle?: (item: D) => void
) {
  const { type: Slot, props } = action || {};
  const getProps = usePropsGenerator();

  return {
    Slot: Slot as ComponentType<typeof props> | undefined,

    getSlotProps: (data: D) =>
      ({
        ...getProps({ ...props, data }),
        ...(onItemToggle && {
          onClick: (...args: any[]) => {
            args.forEach((arg) => arg?.stopPropagation?.());
            props?.onClick?.(...args);
            onItemToggle(data);
          },
        }),
      } as typeof props),
  };
}
