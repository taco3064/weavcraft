import MuiCollapse from '@mui/material/Collapse';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

import { withGenerateDataProps } from '../../contexts';
import type { CollapseProps } from './Collapse.types';

export default withGenerateDataProps<CollapseProps>(function Collapse({
  children,
  containerId,
  toggle,
  ...props
}) {
  const { type: Toggle, props: toggleProps } = toggle || {};
  const [container, setContainer] = useState<HTMLElement>();
  const [expanded, setExpanded] = useState(false);

  const collapse = (
    <MuiCollapse {...props} data-testid="Collapse">
      {!expanded ? null : children}
    </MuiCollapse>
  );

  useEffect(() => {
    if (containerId) {
      setContainer(document.getElementById(containerId) || undefined);
    }
  }, [containerId]);

  return (
    <>
      {Toggle && (
        <Toggle
          {...toggleProps}
          data-testid="CollapseToggle"
          onClick={(...e: any[]) => {
            setExpanded(!expanded);
            toggleProps?.onClick?.(...e);
          }}
        />
      )}

      {!container ? collapse : createPortal(collapse, container)}
    </>
  );
});
