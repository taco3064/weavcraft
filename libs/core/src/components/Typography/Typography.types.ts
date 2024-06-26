import MuiTypography from '@mui/material/Typography';
import type { ComponentProps } from 'react';
import type { JsonObject } from 'type-fest';

import type { IconCode } from '../Icon';
import type { PropsWithMappedData } from '../../hooks';

type MuiTypographyProps = Pick<
  ComponentProps<typeof MuiTypography>,
  'align' | 'fontWeight' | 'paragraph' | 'variant' | 'whiteSpace'
>;

export type TypographyProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiTypographyProps & {
    icon?: IconCode;
    text?: String;

    color?:
      | 'inherit'
      | 'error'
      | 'info'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'warning'
      | 'text.disabled'
      | 'text.primary'
      | 'text.secondary';
  },
  'icon' | 'text'
>;
