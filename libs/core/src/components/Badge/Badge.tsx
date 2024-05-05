import MuiBadge from '@mui/material/Badge';
import { withGenerateData } from '../../contexts';

import type {
  AnchorOrigin,
  BadgeProps,
  MappablePropNames,
} from './Badge.types';

export default withGenerateData<BadgeProps, MappablePropNames>(function Badge({
  anchorPosition = 'top-right',
  ...props
}) {
  const [vertical, horizontal] = anchorPosition.split('-') as [
    AnchorOrigin<'vertical'>,
    AnchorOrigin<'horizontal'>
  ];

  return (
    <MuiBadge
      {...props}
      data-testid="BadgeContainer"
      anchorOrigin={{ horizontal, vertical }}
      slotProps={{
        badge: { 'data-testid': 'Badge' } as never,
      }}
    />
  );
});
