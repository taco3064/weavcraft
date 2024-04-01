import type { Collection } from './common';

export type SearchHierarchyParams = {
  keyword?: string;
};

export interface HierarchyData<U> extends Collection<U> {
  _id: U;
  category: string;
  description?: string;
  superior?: string;
  title: string;
  type: 'group' | 'item';
}
