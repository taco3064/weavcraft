import MuiFab from '@mui/material/Fab';
import { useState } from 'react';
import type { JsonObject } from 'type-fest';
import type { Property } from 'csstype';

import Icon from '../Icon';
import PortalContainer from '../PortalContainer';
import { useGenerateProps, useUrlValidation } from '../../hooks';
import type { FabProps } from './Fab.types';

export default function Fab<D extends JsonObject>(props: FabProps<D>) {
  const [
    GeneratePropsProvider,
    { containerId, href, icon, text, position = 'bottom-right', ...fabProps },
  ] = useGenerateProps<D, FabProps<D>>(props);

  const [cssPosition, setCssPosition] = useState<Property.Position>('fixed');
  const isHrefValid = useUrlValidation(href);

  return (
    <GeneratePropsProvider>
      <PortalContainer
        key={containerId}
        id={containerId}
        onContainerRetrieved={(container) => {
          setCssPosition('absolute');
          container.style.position = 'relative';
        }}
      >
        <MuiFab
          {...fabProps}
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
    </GeneratePropsProvider>
  );
}
