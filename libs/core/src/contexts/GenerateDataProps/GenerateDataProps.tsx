import type { ComponentType } from 'react';

import {
  GenerateDataPropsContext,
  getProps,
  useGenerateData,
} from './GenerateDataProps.hooks';

import type {
  GenerateDataWrappedProps,
  GenericData,
} from './GenerateDataProps.types';

//* HOC
export const withGenerateDataProps = <P, K extends keyof P = keyof P>(
  Target: ComponentType<P>
) =>
  function ComponentWrapper<D extends GenericData>(
    props: GenerateDataWrappedProps<D, P, K>
  ) {
    const generateData = useGenerateData<D>();
    const data = props.data || generateData;
    const componentProps = getProps({ ...props, data });

    const children = (
      <Target {...(componentProps as P & JSX.IntrinsicAttributes)} />
    );

    return !props.data ? (
      children
    ) : (
      <GenerateDataPropsContext.Provider value={data}>
        {children}
      </GenerateDataPropsContext.Provider>
    );
  };
