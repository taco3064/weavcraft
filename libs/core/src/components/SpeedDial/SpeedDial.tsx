import MuiSpeedDial from '@mui/material/SpeedDial';
import { useState } from 'react';
import type { JsonObject } from 'type-fest';
import type { Property } from 'csstype';

import Icon from '../Icon';
import PortalContainer from '../PortalContainer';
import SpeedDialAction from '../SpeedDialAction';
import { useStoreProps } from '../../hooks';

import type { Origin, PositionSplit, SpeedDialProps } from './SpeedDial.types';

//* - Config
const ORIGIN: Origin = {
  'bottom-left': {
    direction: 'up',
    tooltipPlacement: 'right',
  },
  'bottom-right': {
    direction: 'up',
    tooltipPlacement: 'left',
  },
  'top-left': {
    direction: 'down',
    tooltipPlacement: 'right',
  },
  'top-right': {
    direction: 'down',
    tooltipPlacement: 'left',
  },
};

//* - Components
export default function SpeedDial<D extends JsonObject>(
  props: SpeedDialProps<D>
) {
  const {
    ariaLabel = 'SpeedDial',
    containerId,
    icon,
    itemProps,
    openIcon,
    position = 'bottom-left',
    records,
    onItemClick,
  } = useStoreProps(props);

  const [cssPosition, setCssPosition] = useState<Property.Position>('fixed');
  const [vertical, horizontal] = position.split('-') as PositionSplit;
  const { direction, tooltipPlacement } = ORIGIN[`${vertical}-${horizontal}`];

  return (
    <PortalContainer
      key={containerId}
      id={containerId}
      onContainerRetrieved={(container) => {
        setCssPosition('absolute');
        container.style.position = 'relative';
      }}
    >
      <MuiSpeedDial
        data-testid="SpeedDial"
        ariaLabel={ariaLabel}
        direction={direction}
        icon={<Icon code={icon} />}
        openIcon={<Icon code={openIcon} />}
        sx={(theme) => ({
          position: cssPosition,
          [vertical]: theme.spacing(1),
          [horizontal]: theme.spacing(1),
        })}
      >
        {records?.map((item, i) => (
          <SpeedDialAction
            {...itemProps}
            data-testid="SpeedDialAction"
            key={i}
            data={item}
            tooltipPlacement={tooltipPlacement}
            onClick={() => onItemClick?.(item)}
          />
        ))}
      </MuiSpeedDial>
    </PortalContainer>
  );
}
