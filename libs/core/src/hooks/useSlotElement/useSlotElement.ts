import type { ComponentType } from 'react';
import type { JsonObject } from 'type-fest';

import { usePropsGetter } from '../usePropsGetter';
import type { SlotElement } from './useSlotElement.types';

export function useSlotElement<D extends JsonObject>(
  action?: SlotElement,
  onItemToggle?: (item: D) => void
) {
  const { type: Slot, props } = action || {};
  const getProps = usePropsGetter();

  return {
    Slot: Slot as ComponentType<typeof props> | undefined,

    getSlotProps: (data: D) =>
      ({
        ...getProps({ ...props, data }), // Specify the type of getProps function
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
