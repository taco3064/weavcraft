import type { ComponentType } from 'react';
import PropsDefinitionProvider from './PropsDefinition.Provider';

export function withPropsDefinition<P>(TargetComponent: ComponentType<P>) {
  return function PropsDefinitionWrapper(props: P) {
    return (
      <PropsDefinitionProvider>
        <TargetComponent
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(props as any)
          }
        />
      </PropsDefinitionProvider>
    );
  };
}
