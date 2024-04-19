import { UpdatedAtDocument, CreatedAtDocument } from "../mongodb";
import { PayloadData } from "../payload/payload.type";

export type SearchHierarchyParams = {
  category: string;
  keyword?: string;
  superior?: string;
  withPayload?: boolean;
};

export enum EnumHierarchyType {
  GROUP = 'GROUP',
  ITEM = 'ITEM',
}

export type HierarchyType = keyof typeof EnumHierarchyType;

export type Hierarchy = {
  title: string;
  type: EnumHierarchyType;
  category: string;
  description?: string;
  superior?: string;
  payloadId?: string;
  rootId?: string;
} & UpdatedAtDocument & CreatedAtDocument;

export type HierarchyData<P = PayloadData> = {
  id: string;
  payload?: P;
} & Hierarchy;
