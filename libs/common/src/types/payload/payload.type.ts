import { UpdatedDocument, CreatedDocument } from "../mongodb";

export type Payload = {
  name: string;
  description?: string;
} & UpdatedDocument & CreatedDocument;

export type PayloadData = {
  id: string;
} & Payload;
