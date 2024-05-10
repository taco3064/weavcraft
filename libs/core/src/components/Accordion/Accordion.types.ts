import MuiAccordion from '@mui/material/Accordion';
import type { ComponentProps, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';

import type { PropsWithMappedData } from '../../hooks';
import type { IconCode } from '../Icon';

type MuiAccordionProps = Pick<
  ComponentProps<typeof MuiAccordion>,
  'disableGutters' | 'disabled' | 'expanded' | 'square'
>;

export type AccordionProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiAccordionProps & {
    action?: ReactNode;
    children?: ReactNode;
    disableActionSpacing?: boolean;
    expandIcon?: IconCode;
    title?: string;
  },
  'children' | 'expandIcon' | 'title'
>;
