import MuiCollapse from '@mui/material/Collapse';
import { useState } from 'react';
import type { JsonObject } from 'type-fest';

import PortalContainer from '../PortalContainer';
import { useGenerateProps } from '../../hooks';
import type { CollapseProps } from './Collapse.types';

export default function Collapse<D extends JsonObject>(
  props: CollapseProps<D>
) {
  const [
    GeneratePropsProvider,
    { children, containerId, toggle, ...collapseProps },
  ] = useGenerateProps<D, CollapseProps<D>>(props);

  const { type: Toggle, props: toggleProps } = toggle || {};
  const [expanded, setExpanded] = useState(false);

  return (
    <GeneratePropsProvider>
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
        <MuiCollapse {...collapseProps} in={expanded} data-testid="Collapse">
          {!expanded ? null : children}
        </MuiCollapse>
      </PortalContainer>
    </GeneratePropsProvider>
  );
}
