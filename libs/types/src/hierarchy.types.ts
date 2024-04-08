import type { Collection } from './common';

export type SearchHierarchyParams = {
  category: string;
  keyword?: string;
  superior?: string;
  withPayload?: boolean;
};

export interface HierarchyData<U, P = never> extends Collection<U> {
  _id: U;
  category: string;
  description?: string;
  superior?: string;
  title: string;
  type: 'group' | 'item';
  payload?: P;
}
