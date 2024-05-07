import MuiPopover from '@mui/material/Popover';
import type { ComponentProps, ReactElement } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData, SlotProps } from '../../hooks';

type MuiPopoverProps = Pick<
  ComponentProps<typeof MuiPopover>,
  'anchorOrigin' | 'children' | 'elevation' | 'transformOrigin'
>;

export type AnchorOrigin<
  K extends keyof NonNullable<MuiPopoverProps['anchorOrigin']>
> = Exclude<NonNullable<MuiPopoverProps['anchorOrigin']>[K], number>;

export type PopoverProps<D extends JsonObject> = PropsWithMappedData<
  D,
  Omit<MuiPopoverProps, 'anchorOrigin' | 'transformOrigin'> & {
    toggle?: ReactElement<SlotProps>;
    anchorPosition?: `${AnchorOrigin<'vertical'>}-${AnchorOrigin<'horizontal'>}`;
  },
  'children'
>;
