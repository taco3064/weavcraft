import MuiFab from '@mui/material/Fab';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';
import type { IconCode } from '../Icon';

type MuiFabProps = Pick<
  ComponentProps<typeof MuiFab>,
  'color' | 'disabled' | 'href' | 'size'
>;

export type FabProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiFabProps & {
    containerId?: string;
    icon?: IconCode;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    text?: string;
    onClick?: () => void;
  },
  'containerId' | 'disabled' | 'href' | 'icon' | 'text'
>;
