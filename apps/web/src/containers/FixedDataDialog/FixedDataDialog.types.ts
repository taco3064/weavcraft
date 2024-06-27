import type { JsonObject } from 'type-fest';
import type { ComponentConfig } from '../imports.types';

//* Component Props
export interface FixedDataDialogProps {
  config: ComponentConfig;
  onDataChange: (data?: JsonObject | JsonObject[]) => void;
}

export interface DataDetailProps {
  data: JsonObject | JsonObject[];
  onAdd: () => void;
  onEdit: (e: number | JsonObject) => void;
  onRemove: (e: number) => void;
}

export interface DataEditorDialogProps
  extends Pick<FixedDataDialogProps, 'config'> {
  data?: JsonObject;
  mode: 'add' | 'edit';
  open: boolean;
  onClose: () => void;
  onConfirm: (data: JsonObject) => void;
}
