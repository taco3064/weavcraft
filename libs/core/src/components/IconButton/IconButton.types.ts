import MuiIconButton from '@mui/material/IconButton';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../contexts';
import type { IconCode } from '../Icon';

type MuiIconButtonProps = Pick<
  ComponentProps<typeof MuiIconButton>,
  'color' | 'disabled' | 'size'
>;

export interface IconButtonProps extends MuiIconButtonProps {
  'data-testid'?: string;
  href?: string;
  icon?: IconCode;
}

export type MappablePropNames = keyof Pick<
  IconButtonProps,
  'disabled' | 'href' | 'icon'
>;

export type WrappedProps<D extends JsonObject> = PropsWithMappedData<
  D,
  Omit<IconButtonProps, 'data-testid'>,
  MappablePropNames
>;
