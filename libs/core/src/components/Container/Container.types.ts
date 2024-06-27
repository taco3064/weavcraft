import MuiContainer from '@mui/material/Container';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';

type MuiContainerProps = Pick<
  ComponentProps<typeof MuiContainer>,
  'children' | 'disableGutters' | 'id' | 'maxWidth'
>;

export type ContainerProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiContainerProps,
  'children'
>;
