import _omit from 'lodash/omit';
import _set from 'lodash/set';
import { create } from 'zustand';
import type { JsonObject } from 'type-fest';

import { createContext, useContext, useId, useMemo, useState } from 'react';

import type {
  DataStructure,
  DataStructureContextValue,
  DataValue,
  ValueTypeMapping,
} from './GenerateDataProps.types';

//* - Variables
const VALUE_TYPE_MAP: ValueTypeMapping = {
  boolean: 'boolean',
  number: 'number',
  string: 'string',
};

//* - Zustand
export const useStructure = create(() => {
  let structure: DataStructure = {};

  function getDataType(value: any): DataValue | undefined {
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
export const GenerateDataContext = createContext<
  ReturnType<typeof useState<any>>
>([undefined, () => undefined]);

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

export function useDataStructure() {
  const { uid, paths } = useContext(DataStructureContext) || {};
  const newId = useSymbolId();

  return {
    root: uid || newId,
    paths: useMemo(() => paths || [], [paths]),
  };
}

export function useGenerateData<D extends JsonObject>(propData?: D) {
  const dataState = useState<D>(propData!);
  const type: 'props' | 'context' = propData ? 'props' : 'context';

  const [data, setData] = useContext(GenerateDataContext) as ReturnType<
    typeof useState<D>
  >;

  return type === 'props'
    ? {
        type,
        data: propData!,
        onChange: dataState[1],
      }
    : {
        type,
        data: data!,
        onChange: setData,
      };
}
