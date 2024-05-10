import MuiBadge from '@mui/material/Badge';
import { JsonObject } from 'type-fest';

import { useGenerateProps } from '../../hooks';
import type { AnchorOrigin, BadgeProps } from './Badge.types';

export default function Badge<D extends JsonObject>(props: BadgeProps<D>) {
  const [
    GenerateDataProvider,
    { anchorPosition = 'top-right', ...badgeProps },
  ] = useGenerateProps<D, BadgeProps<D>>(props);

  const [vertical, horizontal] = anchorPosition.split('-') as [
    AnchorOrigin<'vertical'>,
    AnchorOrigin<'horizontal'>
  ];

  return (
    <GenerateDataProvider>
      <MuiBadge
        {...badgeProps}
        data-testid="BadgeContainer"
        anchorOrigin={{ horizontal, vertical }}
        slotProps={{
          badge: { 'data-testid': 'Badge' } as never,
        }}
      />
    </GenerateDataProvider>
  );
}
