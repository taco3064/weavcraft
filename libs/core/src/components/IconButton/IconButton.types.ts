import MuiIconButton from '@mui/material/IconButton';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { IconCode } from '../Icon';
import type { PropsWithMappedData } from '../../hooks';

type MuiIconButtonProps = Pick<
  ComponentProps<typeof MuiIconButton>,
  'color' | 'disabled' | 'size'
>;

export type IconButtonProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiIconButtonProps & {
    'data-testid'?: string;
    href?: string;
    icon?: IconCode;
    onClick?: () => void;
  },
  'disabled' | 'href' | 'icon'
>;
