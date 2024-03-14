import { useMemo, type ComponentType } from 'react';

import {
  DataStructureContext,
  GenerateDataPropsContext,
  useDataStructure,
  useGenerateData,
  usePropsGenerator,
  useSymbolId,
} from './GenerateDataProps.hooks';

import type {
  GenericData,
  PropsWithMappedData,
  PropsWithMappedStore,
  PropsWithStore,
} from './GenerateDataProps.types';

//* HOC
export const withGenerateDataProps = <P, K extends keyof P = keyof P>(
  Component: ComponentType<P>
) =>
  function GenerateDataWrapper<D extends GenericData>(
    props: PropsWithMappedData<D, P, K>
  ) {
    const getProps = usePropsGenerator();
    const context = useGenerateData<D>();
    const data = props.data || context;
    const consumer = <Component {...getProps({ ...props, data })} />;

    return !props.data ? (
      consumer
    ) : (
      <GenerateDataPropsContext.Provider value={data}>
        {consumer}
      </GenerateDataPropsContext.Provider>
    );
  };

export function makeStoreProps<
  R extends PropsWithStore<{}>,
  K extends keyof R = 'records'
>() {
  return (Component: ComponentType<R>) =>
    function GenerateStoreWrapper<
      D extends GenericData,
      P = PropsWithStore<D, Omit<R, 'records'>>
    >(props: PropsWithMappedStore<D, P, Extract<K, keyof P>>) {
      const { records, propMapping } = props;
      const { superior, paths } = useDataStructure();

      const getProps = usePropsGenerator();
      const data = useGenerateData();
      const uid = useSymbolId();

      const value = useMemo(
        () => ({
          uid: !records && propMapping?.records ? superior : uid,
          paths:
            records || !propMapping?.records
              ? paths
              : [...paths, propMapping.records],
        }),
        [superior, uid, paths, records, propMapping?.records]
      );

      return (
        <DataStructureContext.Provider value={value}>
          <Component {...getProps({ ...props, data })} />
        </DataStructureContext.Provider>
      );
    };
}
