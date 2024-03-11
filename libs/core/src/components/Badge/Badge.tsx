import MuiBadge from '@mui/material/Badge';

import { withGenerateDataProps } from '../../contexts';
import type { BadgeProps, MappablePropNames } from './Badge.types';

export default withGenerateDataProps<BadgeProps, MappablePropNames>(
  function Badge({
    anchorHorizontal = 'right',
    anchorVertical = 'top',
    ...props
  }) {
    return (
      <MuiBadge
        {...props}
        data-testid="BadgeContainer"
        anchorOrigin={{
          horizontal: anchorHorizontal,
          vertical: anchorVertical,
        }}
        slotProps={{
          badge: { 'data-testid': 'Badge' } as never,
        }}
      />
    );
  }
);
