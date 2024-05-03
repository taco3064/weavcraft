import { useMemo, type ComponentType } from 'react';

import {
  DataStructureContext,
  ComponentDataContext,
  useDataStructure,
  useComponentData,
  usePropsGetter,
  useSymbolId,
} from './GenerateDataProps.hooks';

import type {
  GenericData,
  PropsWithMappedData,
  PropsWithMappedStore,
  PropsWithStore,
} from './GenerateDataProps.types';

//* - HOC
export const withGenerateDataProps = <P, K extends keyof P = keyof P>(
  Component: ComponentType<P>
) =>
  function GenerateDataWrapper<D extends GenericData>(
    props: PropsWithMappedData<D, P, K>
  ) {
    const getProps = usePropsGetter();
    const { type, data, onChange } = useComponentData<D>(props.data);
    const consumer = <Component {...getProps({ ...props, data })} />;

    return type === 'context' ? (
      consumer
    ) : (
      <ComponentDataContext.Provider value={[data, onChange]}>
        {consumer}
      </ComponentDataContext.Provider>
    );
  };

export const withStoreProps = <
  D extends GenericData,
  P extends PropsWithStore<D>,
  K extends keyof P = 'records'
>(
  Component: ComponentType<P>
): ComponentType<PropsWithMappedStore<D, P, K>> =>
  function GenerateStoreWrapper(props) {
    const { records, propMapping } = props;
    const { root, paths } = useDataStructure();

    const getProps = usePropsGetter();
    const { data } = useComponentData();
    const uid = useSymbolId();
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
        return { uid: root, paths: [...paths, propMapping.records] };
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
