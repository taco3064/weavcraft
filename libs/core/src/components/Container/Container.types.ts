import MuiContainer from '@mui/material/Container';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../contexts';

export type ContainerProps = Pick<
  ComponentProps<typeof MuiContainer>,
  'children' | 'disableGutters' | 'maxWidth'
>;

export type MappablePropNames = keyof Pick<ContainerProps, 'children'>;

export type WrappedProps<D extends JsonObject> = PropsWithMappedData<
  D,
  ContainerProps,
  MappablePropNames
>;
