import MuiTypography from '@mui/material/Typography';
import type { ComponentProps } from 'react';

import type { GenerateDataWrappedProps, GenericData } from '../../contexts';
import type { IconCode } from '../Icon';

type MuiTypographyProps = Pick<
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

export interface TypographyProps extends MuiTypographyProps {
  icon?: IconCode;
}

export type MappablePropNames = keyof Pick<
  TypographyProps,
  'children' | 'icon'
>;

export type WrappedProps<D extends GenericData> = GenerateDataWrappedProps<
  D,
  TypographyProps,
  MappablePropNames
>;
