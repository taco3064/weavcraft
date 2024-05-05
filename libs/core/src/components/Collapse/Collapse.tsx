import MuiCollapse from '@mui/material/Collapse';
import { useState } from 'react';

import PortalContainer from '../PortalContainer';
import { withGenerateData } from '../../contexts';
import type { CollapseProps, MappablePropNames } from './Collapse.types';

export default withGenerateData<CollapseProps, MappablePropNames>(
  function Collapse({ children, containerId, toggle, ...props }) {
    const { type: Toggle, props: toggleProps } = toggle || {};
    const [expanded, setExpanded] = useState(false);

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

        <PortalContainer id={containerId}>
          <MuiCollapse {...props} data-testid="Collapse">
            {!expanded ? null : children}
          </MuiCollapse>
        </PortalContainer>
      </>
    );
  }
);
