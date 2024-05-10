export type CreatedAtDocument = {
  createdAt?: Date;
};

export type CreatedByDocument = {
  createdBy?: string;
};

export type UpdatedAtDocument = {
  updatedAt?: Date;
};

export type UpdatedByDocument = {
  updatedBy?: string;
};

export type CreatedDocument = CreatedAtDocument & CreatedByDocument;

export type UpdatedDocument = UpdatedAtDocument & UpdatedByDocument;
