import MuiFab from '@mui/material/Fab';
import { useState } from 'react';
import type { Property } from 'csstype';

import Icon from '../Icon';
import PortalContainer from '../PortalContainer';
import { useUrlValidation } from '../../hooks';
import { withGenerateData } from '../../contexts';
import type { FabProps, MappablePropNames } from './Fab.types';

export default withGenerateData<FabProps, MappablePropNames>(function Fab({
  containerId,
  href,
  icon,
  text,
  position = 'bottom-right',
  ...props
}) {
  const [cssPosition, setCssPosition] = useState<Property.Position>('fixed');
  const isHrefValid = useUrlValidation(href);

  return (
    <PortalContainer
      id={containerId}
      onContainerRetrieved={(container) => {
        setCssPosition('absolute');
        container.style.position = 'relative';
      }}
    >
      <MuiFab
        {...props}
        {...(isHrefValid && {
          LinkComponent: 'a',
          href,
        })}
        data-testid="Fab"
        variant={text ? 'extended' : 'circular'}
        sx={(theme) => ({
          position: cssPosition,
          ...Object.fromEntries(
            position.split('-').map((pos) => [pos, theme.spacing(1)])
          ),
        })}
      >
        {icon && <Icon code={icon} />}
        {text}
      </MuiFab>
    </PortalContainer>
  );
});
