import MuiFab from '@mui/material/Fab';
import type { ComponentProps } from 'react';

import type { GenericData, PropsWithMappedData } from '../../contexts';
import type { IconCode } from '../Icon';

type MuiFabProps = Pick<
  ComponentProps<typeof MuiFab>,
  'color' | 'disabled' | 'href' | 'size' | 'onClick'
>;

export interface FabProps extends MuiFabProps {
  containerId?: string;
  icon?: IconCode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  text?: string;
}

export type MappablePropNames = keyof Pick<
  FabProps,
  'containerId' | 'disabled' | 'href' | 'icon' | 'text'
>;

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  FabProps,
  MappablePropNames
>;
