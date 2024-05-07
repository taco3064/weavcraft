import MuiButton from '@mui/material/Button';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';
import type { IconCode } from '../Icon';

type MuiButtonProps = Pick<
  ComponentProps<typeof MuiButton>,
  'color' | 'disabled' | 'fullWidth' | 'href' | 'size' | 'variant' | 'onClick'
>;

export type ButtonProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiButtonProps & {
    icon?: IconCode;
    iconPosition?: 'start' | 'end';
    text?: string;
  },
  'disabled' | 'href' | 'icon' | 'text'
>;
