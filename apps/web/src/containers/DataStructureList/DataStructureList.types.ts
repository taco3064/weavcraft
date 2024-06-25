import type {
  EditorListClasses,
  EditorListProps,
  WidgetConfigs,
} from '../imports.types';

export type EditingState = {
  fieldPath: string;
  type: 'field' | 'structure';
};

//* Component Props
export interface DataStructureListProps
  extends Pick<EditorListProps, 'onClose'> {
  paths?: string[];
  value: NonNullable<WidgetConfigs['dataStructure']>;

  onChange?: (e: {
    fieldPath: string;
    oldFieldPath?: string;
    paths: string[];
    isStructure: boolean;
  }) => void;
}

export interface FieldItemsProps
  extends Pick<DataStructureListProps, 'paths' | 'value' | 'onChange'> {
  classes: EditorListClasses;
}

export interface ActionToggleProps {
  value?: string;
  variant: EditingState['type'];

  onActionToggle: (e: {
    mode: 'add' | 'edit' | 'delete';
    type: EditingState['type'];
    value: string;
  }) => void;
}
