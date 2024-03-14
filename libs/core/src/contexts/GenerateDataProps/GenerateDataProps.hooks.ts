import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _set from 'lodash/set';
import { create } from 'zustand';
import { useEffect, useRef } from 'react';

import {
  createContext,
  useContext,
  useId,
  useMemo,
  type ComponentType,
} from 'react';

import type {
  DataStructure,
  DataStructureContextValue,
  DataValue,
  GenericData,
  MappableProps,
  SlotElement,
  StructureState,
  ValueTypeMapping,
} from './GenerateDataProps.types';

//* Variables
const VALUE_TYPE_MAP: ValueTypeMapping = {
  bigint: 'bigint',
  boolean: 'boolean',
  number: 'number',
  string: 'string',
};

//* Context
export const ComponentDataContext = createContext<GenericData | undefined>(
  undefined
);

export const DataStructureContext = createContext<
  DataStructureContextValue | undefined
>(undefined);

//* Zustand
const useStructure = create<StructureState>(() => {
  let structure: DataStructure = {};

  function getDataType(value: any): DataValue {
    if (value instanceof Date) {
      return 'date';
    }

    if (Array.isArray(value) && value.length) {
      const type = getDataType(value[0]).replace('[]', '');

      return value.every((v) => getDataType(v) === type)
        ? `${type as Exclude<DataValue, `${string}[]`>}[]`
        : 'undefined[]';
    }

    const { [typeof value as keyof ValueTypeMapping]: type } = VALUE_TYPE_MAP;

    return type || 'undefined';
  }

  return {
    get: () => structure,

    set: (uid, paths, value) =>
      _set(structure, [uid, ...paths], getDataType(value)),

    destroy: (uid, paths) => {
      if (paths?.length) {
        structure = _omit(structure, [uid, ...paths]) as DataStructure;
      } else {
        delete structure[uid];
      }
    },
  };
});

//* Custom Hooks
export function useSymbolId() {
  const id = useId();

  return useMemo(() => Symbol(id), [id]);
}

export const useComponentData = <D extends GenericData>() =>
  useContext(ComponentDataContext) as D;

export function useComponentSlot<D extends GenericData>(
  action?: SlotElement,
  onItemToggle?: (item: D) => void
) {
  const { type: Slot, props } = action || {};
  const getProps = usePropsGetter();

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

export function useDataStructure() {
  const { uid, paths } = useContext(DataStructureContext) || {};
  const newId = useSymbolId();

  return {
    superior: uid || newId,
    paths: useMemo(() => paths || [], [paths]),
  };
}

export function usePropsGetter<D extends GenericData>() {
  const { superior, paths } = useDataStructure();
  const { set, destroy } = useStructure();
  const destroyRef = useRef(() => destroy(superior, paths));

  useEffect(() => destroyRef.current, [destroyRef]);

  return function <
    P extends MappableProps<D>,
    R = Omit<P, 'data' | 'propMapping'>
  >({ data, propMapping, ...props }: P & MappableProps<D>) {
    return Object.entries(propMapping || {}).reduce((result, [key, path]) => {
      const propValue = _get(props, key);

      if (propValue === undefined) {
        const dataValue = _get(data, path as string);

        set(superior, [...paths, key], dataValue);
      }

      return {
        ...result,
        [key]: _get(result, key) || _get(data, path as string),
      };
    }, props) as R;
  };
}
