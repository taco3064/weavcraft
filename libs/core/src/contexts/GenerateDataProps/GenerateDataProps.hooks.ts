import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _set from 'lodash/set';
import { create } from 'zustand';

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  type ComponentType,
} from 'react';

import type {
  DataStructure,
  DataStructureContextValue,
  DataValue,
  GenericData,
  MappableProps,
  SlotElement,
  ValueTypeMapping,
} from './GenerateDataProps.types';

//* - Variables
const VALUE_TYPE_MAP: ValueTypeMapping = {
  bigint: 'bigint',
  boolean: 'boolean',
  number: 'number',
  string: 'string',
};

//* - Zustand
const useStructure = create(() => {
  let structure: DataStructure = {};

  function getDataType(value: any): DataValue | undefined {
    if (value instanceof Date) {
      return 'date';
    }

    if (Array.isArray(value) && value.length) {
      const type = getDataType(value[0])?.replace('[]', '');

      return type && value.every((v) => getDataType(v) === type)
        ? `${type as Exclude<DataValue, `${string}[]`>}[]`
        : undefined;
    }

    const { [typeof value as keyof ValueTypeMapping]: type } = VALUE_TYPE_MAP;

    return type || undefined;
  }

  return {
    get: (): DataStructure => structure,

    set: (uid: symbol, paths: string[], value?: any) => {
      const type = getDataType(value);

      if (type) {
        _set(structure, [uid, ...paths], type);
      }
    },
    destroy: (uid: symbol, paths?: string[]) => {
      if (paths?.length) {
        structure = _omit(structure, [uid, ...paths]) as DataStructure;
      } else {
        delete structure[uid];
      }
    },
  };
});

//* - Context
export const ComponentDataContext = createContext<GenericData | undefined>(
  undefined
);

export const DataStructureContext = createContext<
  DataStructureContextValue | undefined
>(undefined);

//* - Custom Hooks
export function useSymbolId() {
  /**
   * ! 這個做法可以產生一個唯一的 Symbol ID
   * ! 並且確保在重新渲染時不會改變
   *
   * ? 但是後續如果牽扯到資料設定的話，會導致從後端取得的資料設定與此結構對不上
   *
   * * 預計在 StoreProps 增加 structure uid 的設定
   * * 並在渲染期間將 structure uid 傳入到這個 hook 中
   * * 後續透過 Symbol.describe 取得進行比對
   */
  const id = useId();

  return useMemo(() => Symbol(id), [id]);
}

export function useComponentData<D extends GenericData>(propData?: D) {
  const data = useContext(ComponentDataContext) as D;

  return {
    type: (propData ? 'props' : 'context') as 'props' | 'context',
    data: propData || data,
  };
}

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
    root: uid || newId,
    paths: useMemo(() => paths || [], [paths]),
  };
}

export function usePropsGetter<D extends GenericData>() {
  const { root, paths } = useDataStructure();
  const { set, destroy } = useStructure();
  const destroyRef = useRef(() => destroy(root, paths));

  useEffect(() => destroyRef.current, [destroyRef]);

  return function <
    P extends MappableProps<D>,
    R = Omit<P, 'data' | 'propMapping'>
  >({ data, propMapping, ...props }: P & MappableProps<D>) {
    return Object.entries(propMapping || {}).reduce((result, [key, path]) => {
      const propValue = _get(props, key);
      const dataValue = _get(data, path as string);

      //* - The prop value must be undefined
      if (propValue === undefined && dataValue !== undefined) {
        set(root, [...paths, key], dataValue);

        return { ...result, [key]: dataValue };
      }

      return { ...result, [key]: propValue };
    }, props) as R;
  };
}
