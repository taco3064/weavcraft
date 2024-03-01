import type { GenericData } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TargetProps = Record<string, any> & {
  data?: GenericData | never;
  propMapping?: Record<string, string> | never;
};
