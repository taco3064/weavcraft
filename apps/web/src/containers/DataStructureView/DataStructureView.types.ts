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

export interface ActionToggleProps {
  value?: string;
  variant: EditingState['type'];

  onFieldModify: (e: {
    value: string;
    type: 'add' | 'edit' | 'delete';
  }) => void;
}
