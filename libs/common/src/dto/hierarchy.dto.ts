import { EnumHierarchyType, HierarchyData } from "../types/hierarchy";

export class HierarchyDataDTO implements HierarchyData {
  id: string;
  title: string;
  type: EnumHierarchyType;
  category: string;
  description?: string;
  superior?: string;
  payload?: never;
  updatedAt?: Date;
  createdAt?: Date;
}
