import MuiDivider from '@mui/material/Divider';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';

type MuiDividerProps = Pick<
  ComponentProps<typeof MuiDivider>,
  'flexItem' | 'orientation' | 'variant'
>;

export type DividerProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiDividerProps & {
    text?: string;
  },
  'text'
>;
