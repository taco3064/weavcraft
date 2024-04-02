import type { Collection } from './common';

export type SearchHierarchyParams = {
  category: string;
  keyword?: string;
  superior?: string;
};

export interface HierarchyData<U> extends Collection<U> {
  _id: U;
  category: string;
  description?: string;
  superior?: string;
  title: string;
  type: 'group' | 'item';
}
