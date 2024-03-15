import MuiSpeedDialAction from '@mui/material/SpeedDialAction';

import Icon from '../Icon';
import { withGenerateDataProps } from '../../contexts';

import type {
  SpeedDialActionProps,
  MappablePropNames,
} from './SpeedDialAction.types';

export default withGenerateDataProps<SpeedDialActionProps, MappablePropNames>(
  function SpeedDialAction({ icon, tooltipPlacement, tooltipTitle, onClick }) {
    return (
      <MuiSpeedDialAction
        {...{ tooltipPlacement, tooltipTitle, onClick }}
        className={`SpeedDialActionTooltipPlacement-${tooltipPlacement}`}
        data-testid="SpeedDialAction"
        icon={<Icon code={icon} />}
      />
    );
  }
);
