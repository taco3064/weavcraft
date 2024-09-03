import { Handle } from '@xyflow/react';
import type { ComponentProps } from 'react';

export type FlowHandleProps = ComponentProps<typeof Handle> & {
  classes?: { root?: string };
};
