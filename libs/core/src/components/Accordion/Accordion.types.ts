import MuiAccordion from '@mui/material/Accordion';
import type { ComponentProps, ReactNode } from 'react';

import type { IconCode } from '../Icon';

type MuiAccordionProps = Pick<
  ComponentProps<typeof MuiAccordion>,
  'disableGutters' | 'disabled' | 'expanded' | 'square'
>;

export interface AccordionProps extends MuiAccordionProps {
  action?: ReactNode;
  children?: ReactNode;
  disableActionSpacing?: boolean;
  expandIcon?: IconCode;
  title?: string;
}
