import _get from 'lodash/get';
import { createContext, useContext, type ComponentType } from 'react';

import type {
  GenerateStoreWrapperProps,
  GenericData,
  MappableProps,
  SlotElement,
  StoreProps,
} from './GenerateDataProps.types';

//* Methods
export function getProps<D extends GenericData, P extends MappableProps<D>>({
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

//* Custom Hooks
export const GenerateDataPropsContext = createContext<GenericData | undefined>(
  undefined
);

export function useGenerateData<D extends GenericData>() {
  return useContext(GenerateDataPropsContext) as D;
}

export function useGenerateDataProps<P>(
  propMapping?: MappableProps<GenericData, P>
) {
  const data = useGenerateData();

  return getProps({ data, propMapping }) as P;
}

export function useGenerateStoreProps<
  D extends GenericData,
  P extends StoreProps<D>,
  K extends keyof P = 'records'
>(props: GenerateStoreWrapperProps<D, P, K>) {
  const data = useGenerateData();

  return getProps({ ...props, data });
}

export function useGenerateSlotProps<D extends GenericData>(
  action?: SlotElement,
  onItemToggle?: (item: D) => void
) {
  const { type: Slot, props } = action || {};

  return {
    Slot: Slot as ComponentType<typeof props> | undefined,

    getSlotProps: (data: D) =>
      ({
        ...getProps({ ...props, data }),
        ...(onItemToggle && {
          onClick: (...args: any[]) => {
            args.forEach((arg) => arg?.stopPropagation?.());
            onItemToggle(data);
          },
        }),
      } as typeof props),
  };
}
