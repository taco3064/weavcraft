import type { WidgetConfigs } from '../imports.types';

export type EditingState = {
  fieldPath: string;
  type: 'field' | 'structure';
};

//* Component Props
export interface DataStructureViewProps {
  paths?: string[];
  value: NonNullable<WidgetConfigs['dataStructure']>;

  onChange?: (e: {
    fieldPath: string;
    oldFieldPath?: string;
    paths: string[];
    isStructure: boolean;
  }) => void;
}

export interface AddButtonsProps {
  onChange: (fieldPath: string, isStructure: boolean) => void;
}

export interface FieldModifyDialogProps {
  open: boolean;
  title: string;
  value?: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
}
