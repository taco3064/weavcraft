import type { ComponentProps, ComponentType } from 'react';
import PropsDefinitionProvider from './PropsDefinition.Provider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withPropsDefinition<E extends ComponentType<any>>(
  TargetComponent: E
) {
  return function PropsDefinitionWrapper(props: ComponentProps<E>) {
    return (
      <PropsDefinitionProvider>
        <TargetComponent {...props} />
      </PropsDefinitionProvider>
    );
  };
}
