import type { GenericData } from '../../types';

export type TargetProps = Record<string, any> & {
  data?: GenericData | never;
  propMapping?: Record<string, string> | never;
};
