import MuiTypography from '@mui/material/Typography';
import type { ComponentProps } from 'react';

import type { GenerateDataWrappedProps, GenericData } from '../../contexts';

export type TypographyProps = Pick<
  ComponentProps<typeof MuiTypography>,
  | 'align'
  | 'children'
  | 'color'
  | 'fontWeight'
  | 'gutterBottom'
  | 'noWrap'
  | 'paragraph'
  | 'variant'
  | 'whiteSpace'
>;

export type MappablePropNames = keyof Pick<TypographyProps, 'children'>;

export type WrappedProps<D extends GenericData> = GenerateDataWrappedProps<
  D,
  TypographyProps,
  MappablePropNames
>;
