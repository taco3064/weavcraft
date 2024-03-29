import MuiTypography from '@mui/material/Typography';
import type { ComponentProps } from 'react';

import type { GenericData, PropsWithMappedData } from '../../contexts';
import type { IconCode } from '../Icon';

type MuiTypographyProps = Pick<
  ComponentProps<typeof MuiTypography>,
  | 'align'
  | 'color'
  | 'fontWeight'
  | 'gutterBottom'
  | 'noWrap'
  | 'paragraph'
  | 'variant'
  | 'whiteSpace'
>;

export interface TypographyProps extends MuiTypographyProps {
  icon?: IconCode;
  text?: string;
}

export type MappablePropNames = keyof Pick<TypographyProps, 'icon' | 'text'>;

export type WrappedProps<D extends GenericData> = PropsWithMappedData<
  D,
  TypographyProps,
  MappablePropNames
>;
