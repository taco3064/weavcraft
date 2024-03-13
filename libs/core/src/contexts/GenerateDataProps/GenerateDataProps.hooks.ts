import _get from 'lodash/get';
import { createContext, useContext, type ComponentType } from 'react';

import type {
  GenerateStoreWrappedProps,
  GenericData,
  MappableProps,
  SlotElement,
  StoreProps,
} from './GenerateDataProps.types';

//* Context
export const GenerateDataPropsContext = createContext<GenericData | undefined>(
  undefined
);

//* Custom Hooks
export function usePropsGenerator() {
  return function <D extends GenericData, P extends MappableProps<D>>({
    data,
    propMapping,
    ...props
  }: P) {
    return Object.entries(propMapping || {}).reduce(
      (result, [key, path]) => ({
        ...result,
        [key]: _get(result, key) || _get(data, path as string),
      }),
      props
    );
  };
}

export function useGenerateData<D extends GenericData>() {
  return useContext(GenerateDataPropsContext) as D;
}

export function useGenerateStoreProps<
  D extends GenericData,
  P,
  K extends keyof (P & StoreProps<D>) = 'records'
>(props: GenerateStoreWrappedProps<D, P, K>) {
  const data = useGenerateData<D>();
  const getProps = usePropsGenerator();

  return getProps({ ...props, data });
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
