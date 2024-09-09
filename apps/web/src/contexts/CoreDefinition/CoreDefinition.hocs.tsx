import type { ComponentProps, ComponentType } from 'react';
import CoreDefinitionProvider from './CoreDefinition.Provider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withCoreDefinition<E extends ComponentType<any>>(
  TargetComponent: E
) {
  return function CoreDefinitionWrapper(props: ComponentProps<E>) {
    return (
      <CoreDefinitionProvider>
        <TargetComponent {...props} />
      </CoreDefinitionProvider>
    );
  };
}
