import MuiChip from '@mui/material/Chip';

import { useComponentData, withGenerateDataProps } from '../../contexts';
import type { ChipProps, MappablePropNames } from './Chip.types';

export default withGenerateDataProps<ChipProps, MappablePropNames>(
  function Chip({ indicator, onClick, onDelete, ...props }) {
    const data = useComponentData();

    return (
      <MuiChip
        {...props}
        {...(onClick && {
          clickable: true,
          onClick: () => onClick(data),
        })}
        data-testid="Chip"
        avatar={indicator}
        onDelete={() => onDelete?.(data)}
      />
    );
  }
);
