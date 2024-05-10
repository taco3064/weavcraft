import { useMemo } from 'react';
import type { JsonObject } from 'type-fest';
import type { DataStructureProviderProps } from './GenerateDataProps.types';

import {
  DataStructureContext,
  GenerateDataContext,
  useDataStructure,
  useSymbolId,
} from './GenerateDataProps.hooks';

//* - Provider
export const GenerateDataProvider = GenerateDataContext.Provider;

export function DataStructureProvider<D extends JsonObject>({
  children,
  records,
  recordsMappingPath,
}: DataStructureProviderProps<D>) {
  const uid = useSymbolId();
  const { root, paths } = useDataStructure();

  const value = useMemo(() => {
    if (records) {
      /**
       * ? If there are records: (Root Case)
       * * - Generate a new uid
       * * - Leave paths empty
       */
      return { uid, paths: [] };
    } else if (recordsMappingPath) {
      /**
       * ? If the propMapping is defined: (Leaf Case)
       * * - Use the root uid
       * * - Append 'propMapping.records' to paths
       */
      return { uid: root, paths: [...paths, recordsMappingPath] };
    }

    //* - Bypass
    return null;
  }, [root, uid, paths, records, recordsMappingPath]);

  return !value ? (
    children
  ) : (
    <DataStructureContext.Provider value={value}>
      {children}
    </DataStructureContext.Provider>
  );
}
