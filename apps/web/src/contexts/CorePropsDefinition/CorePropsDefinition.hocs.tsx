import type { ComponentProps, ComponentType } from 'react';
import PropsDefinitionProvider from './CorePropsDefinition.Provider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withCorePropsDefinition<E extends ComponentType<any>>(
  TargetComponent: E
) {
  return function CorePropsDefinitionWrapper(props: ComponentProps<E>) {
    return (
      <PropsDefinitionProvider>
        <TargetComponent {...props} />
      </PropsDefinitionProvider>
    );
  };
}
