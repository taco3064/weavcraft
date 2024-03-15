import MuiContainer from '@mui/material/Container';
import type { ComponentProps } from 'react';

import type { GenericData, PropsWithMappedData } from '../../contexts';

export type ContainerProps = Pick<
  ComponentProps<typeof MuiContainer>,
  'children' | 'disableGutters' | 'maxWidth'
>;

export type MappablePropNames = keyof Pick<ContainerProps, 'children'>;

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  ContainerProps,
  MappablePropNames
>;
