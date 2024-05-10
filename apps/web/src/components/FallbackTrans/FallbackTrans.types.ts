import { Trans } from 'next-i18next';
import type { ComponentProps } from 'react';

export interface FallbackTransProps<T extends string>
  extends Omit<ComponentProps<typeof Trans>, 'defaults' | 'i18nKey'> {
  i18nKey: string;
  value: T;
}
