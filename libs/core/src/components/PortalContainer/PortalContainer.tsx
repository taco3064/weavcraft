import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';

import type { PortalContainerProps } from './PortalContainer.types';

export default function PortalContainer({
  id,
  children,
  onContainerRetrieved,
}: PortalContainerProps) {
  const [container, setContainer] = useState<HTMLElement>();
  const retrievedRef = useRef(onContainerRetrieved);

  useEffect(() => {
    if (id) {
      const { current: handleRetrieved } = retrievedRef;
      const el = document.getElementById(id) || undefined;

      setContainer(el);
      el && handleRetrieved?.(el);
    }
  }, [id]);

  return !container ? children : createPortal(children, container);
}
