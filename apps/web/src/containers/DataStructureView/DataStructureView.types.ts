import type { WidgetConfigs } from '../imports.types';

//* Component Props
export interface DataStructureViewProps {
  paths?: string[];
  root?: boolean;
  value: NonNullable<WidgetConfigs['dataStructure']>;

  onChange: (e: {
    fieldPath: string;
    oldFieldPath?: string;
    paths: string[];
    isStructure: boolean;
  }) => void;
}

export interface FieldModifyDialogProps {
  open: boolean;
  title: string;
  value?: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
}
