import type { ComponentType } from 'react';
import type { IconCode } from '@weavcraft/core';

export type AccordionId = 'profile' | 'settings' | 'analytics';

export type Accordions = {
  auth: boolean;
  id: AccordionId;
  icon: IconCode;
  Component: ComponentType;
}[];
