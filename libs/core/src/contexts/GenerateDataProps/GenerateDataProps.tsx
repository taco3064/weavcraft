import type { ComponentType } from 'react';

import {
  GenerateDataPropsContext,
  useGenerateData,
  usePropsGenerator,
} from './GenerateDataProps.hooks';

import type {
  GenericData,
  PropsWithMappedData,
  PropsWithMappedStore,
  PropsWithStore,
  StoreProps,
} from './GenerateDataProps.types';

//* HOC
export const withGenerateDataProps = <P, K extends keyof P = keyof P>(
  Component: ComponentType<P>
) =>
  function GenerateDataWrapper<D extends GenericData>(
    props: PropsWithMappedData<D, P, K>
  ) {
    const getProps = usePropsGenerator();
    const generateData = useGenerateData<D>();
    const data = props.data || generateData;
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
      const getProps = usePropsGenerator();
      const data = useGenerateData();

      return <Component {...getProps({ ...props, data })} />;
    };
}

// export const withGenerateStoreProps = <
//   P extends PropsWithStore,
//   K extends keyof P = 'records'
// >(
//   Component: ComponentType<PropsWithStore<NonNullable<P['records']>[number], P>>
// ): FC<PropsWithMappedStore<NonNullable<P['records']>[number], P, K>> =>
//   function GenerateStoreWrapper(
//     props: PropsWithMappedStore<NonNullable<P['records']>[number], P, K>
//   ) {
//     const getProps = usePropsGenerator();
//     const data = useGenerateData<NonNullable<P['records']>[number]>();

//     return <Component {...getProps({ ...props, data })} />;
//   };
