import type { JsonObject } from 'type-fest';
import type { JSXElementConstructor, ReactElement } from 'react';

import type { MappableProps } from '../usePropsGetter';

export type SlotProps = Record<string, any> & {
  onClick?: never | ((...args: any[]) => void);
};

export type SlotElement<
  P = SlotProps &
    Omit<MappableProps<JsonObject, Extract<keyof SlotProps, string>>, 'data'>
> = ReactElement<P, JSXElementConstructor<P>>;
