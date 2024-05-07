import MuiSpeedDialAction from '@mui/material/SpeedDialAction';
import type { JsonObject } from 'type-fest';

import Icon from '../Icon';
import { useGenerateProps } from '../../hooks';
import type { SpeedDialActionProps } from './SpeedDialAction.types';

export default function SpeedDialAction<D extends JsonObject>(
  props: SpeedDialActionProps<D>
) {
  const [
    GeneratePropsProvider,
    { icon, tooltipPlacement, tooltipTitle, onClick },
  ] = useGenerateProps<D, SpeedDialActionProps<D>>(props);

  return (
    <GeneratePropsProvider>
      <MuiSpeedDialAction
        {...{ tooltipPlacement, tooltipTitle, onClick }}
        className={`SpeedDialActionTooltipPlacement-${tooltipPlacement}`}
        data-testid="SpeedDialAction"
        icon={<Icon code={icon} />}
      />
    </GeneratePropsProvider>
  );
}
