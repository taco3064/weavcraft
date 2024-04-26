import { createPortal } from 'react-dom';
import type { ComponentType } from 'react';

import type { PortalWrapperProps } from './TogglePortal.types';

export default function PortalWrapper<W extends ComponentType<any>>({
  WrapperComponent,
  children,
  containerEl,
  ...props
}: PortalWrapperProps<W>) {
  return containerEl ? (
    createPortal(children, containerEl)
  ) : !WrapperComponent ? null : (
    <WrapperComponent {...props}>{children}</WrapperComponent>
  );
}
