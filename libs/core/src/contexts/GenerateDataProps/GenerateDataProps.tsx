import { useMemo, type ComponentType } from 'react';
import type { JsonObject } from 'type-fest';

import {
  DataStructureContext,
  GenerateDataContext,
  useDataStructure,
  useGenerateData,
  usePropsGetter,
  useSymbolId,
} from './GenerateDataProps.hooks';

import type {
  PropsWithMappedData,
  PropsWithMappedStore,
} from './GenerateDataProps.types';

//* - HOC
export const withGenerateData = <P, K extends keyof P = keyof P>(
  Component: ComponentType<P>
) =>
  function GenerateDataWrapper<D extends JsonObject>(
    props: PropsWithMappedData<D, P, K>
  ) {
    const getProps = usePropsGetter();
    const { type, data, onChange } = useGenerateData<D>(props.data);
    const consumer = <Component {...getProps({ ...props, data })} />;

    return type === 'context' ? (
      consumer
    ) : (
      <GenerateDataContext.Provider value={[data, onChange]}>
        {consumer}
      </GenerateDataContext.Provider>
    );
  };

export const withDataStructure = (Component: ComponentType<any>) =>
  function StoreProvider<
    D extends JsonObject,
    P = {},
    K extends keyof P | never = never
  >(props: PropsWithMappedStore<D, P, K>) {
    const { records, propMapping } = props;
    const { root, paths } = useDataStructure();
    const { data } = useGenerateData();

    const uid = useSymbolId();
    const getProps = usePropsGetter();
    const consumer = <Component {...getProps({ ...props, data })} />;

    const value = useMemo(() => {
      if (records) {
        /**
         * ? If there are records: (Root Case)
         * * - Generate a new uid
         * * - Leave paths empty
         */
        return { uid, paths: [] };
      } else if (propMapping?.records) {
        /**
         * ? If the propMapping is defined: (Leaf Case)
         * * - Use the root uid
         * * - Append 'propMapping.records' to paths
         */
        return { uid: root, paths: [...paths, propMapping.records as string] };
      }

      //* - Bypass
      return null;
    }, [root, uid, paths, records, propMapping?.records]);

    return !value ? (
      consumer
    ) : (
      <DataStructureContext.Provider value={value}>
        {consumer}
      </DataStructureContext.Provider>
    );
  };
