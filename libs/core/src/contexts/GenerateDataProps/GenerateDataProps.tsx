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
