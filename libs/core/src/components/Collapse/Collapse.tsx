import MuiBox from '@mui/material/Box';
import MuiCollapse from '@mui/material/Collapse';
import { useState } from 'react';
import type { JsonObject } from 'type-fest';

import PortalContainer from '../PortalContainer';
import { useCommonStyles } from '../../styles';
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
  const { classes } = useCommonStyles();
  const [expanded, setExpanded] = useState(false);

  return (
    <GeneratePropsProvider>
      <MuiBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className={classes.fullWidth}
      >
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
          <MuiCollapse
            {...collapseProps}
            in={expanded}
            data-testid="Collapse"
            classes={{
              root: classes.fullWidth,
              wrapperInner: classes.flexColumn,
            }}
          >
            {!expanded ? null : children}
          </MuiCollapse>
        </PortalContainer>
      </MuiBox>
    </GeneratePropsProvider>
  );
}
