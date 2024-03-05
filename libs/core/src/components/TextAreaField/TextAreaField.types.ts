import type { ElementType } from 'react';

import type { BaseFieldProps } from '../BaseField';

export type TextAreaFieldProps = BaseFieldProps<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ElementType<any>,
  'maxRows' | 'minRows' | 'rows'
>;
