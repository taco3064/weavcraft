import MuiContainer from '@mui/material/Container';
import type { ComponentProps } from 'react';

import type { GenerateDataWrappedProps, GenericData } from '../../contexts';

export type ContainerProps = Pick<
  ComponentProps<typeof MuiContainer>,
  'children' | 'disableGutters' | 'fixed' | 'maxWidth'
>;

export type MappablePropNames = keyof Pick<ContainerProps, 'children'>;

export type WrappedProps<D extends GenericData> = GenerateDataWrappedProps<
  D,
  ContainerProps,
  MappablePropNames
>;
