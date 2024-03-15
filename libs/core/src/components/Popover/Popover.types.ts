import MuiPopover from '@mui/material/Popover';
import type { ComponentProps, ReactElement } from 'react';

import type {
  GenericData,
  PropsWithMappedData,
  SlotProps,
} from '../../contexts';

type MuiPopoverProps = Pick<
  ComponentProps<typeof MuiPopover>,
  'anchorOrigin' | 'children' | 'elevation' | 'transformOrigin'
>;

export type AnchorOrigin<
  K extends keyof NonNullable<MuiPopoverProps['anchorOrigin']>
> = Exclude<NonNullable<MuiPopoverProps['anchorOrigin']>[K], number>;

export interface PopoverProps
  extends Omit<MuiPopoverProps, 'anchorOrigin' | 'transformOrigin'> {
  toggle?: ReactElement<SlotProps>;
  anchorPosition?: `${AnchorOrigin<'vertical'>}-${AnchorOrigin<'horizontal'>}`;
}

export type MappablePropNames = keyof Pick<PopoverProps, 'children'>;

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  PopoverProps,
  MappablePropNames
>;
