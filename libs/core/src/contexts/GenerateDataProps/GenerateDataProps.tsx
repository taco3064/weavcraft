import type { ComponentType } from 'react';

import {
  GenerateDataPropsContext,
  useGenerateData,
  usePropsGenerator,
} from './GenerateDataProps.hooks';

import type {
  GenericData,
  PropsWithMappedData,
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
