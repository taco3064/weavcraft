import type { ComponentType } from 'react';

import {
  GenerateDataPropsContext,
  getProps,
  useGenerateData,
} from './GenerateDataProps.hooks';

import type {
  GenerateDataWrapperProps,
  GenericData,
} from './GenerateDataProps.types';

//* HOC
export const withGenerateDataProps = <P, K extends keyof P = keyof P>(
  Target: ComponentType<P>
) =>
  function ComponentWrapper<D extends GenericData>(
    props: GenerateDataWrapperProps<D, P, K>
  ) {
    const generateData = useGenerateData<D>();
    const data = props.data || generateData;
    const componentProps = getProps({ ...props, data });

    return (
      <GenerateDataPropsContext.Provider value={data}>
        <Target {...(componentProps as P & JSX.IntrinsicAttributes)} />
      </GenerateDataPropsContext.Provider>
    );
  };
