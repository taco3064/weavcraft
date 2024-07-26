import type { ContainerProps } from '@mui/material/Container';
import type { DataStructureListProps } from '../DataStructureList';

import type {
  BaseEditorProps,
  ComponentConfig,
  ConfigPaths,
  CoreComponent,
  PropsSettingChangeHandler,
  WidgetConfigs,
} from '../imports.types';

export enum EditModeEnum {
  ElementNode,
  PropsSetting,
}

export enum ViewModeEnum {
  DataStructure,
  Preview,
}

export type NodeCreateVariant = 'action' | 'node';

export interface ChangeEvents {
  onAddChild: (
    config: ComponentConfig,
    path: string,
    component: CoreComponent
  ) => void;
  onConfigChange: PropsSettingChangeHandler;
  onDeleteNode: (paths: ConfigPaths) => void;
  onStructureChange: NonNullable<DataStructureListProps['onChange']>;

  onAddLastChild: (
    config: ComponentConfig,
    path: string,
    component: CoreComponent
  ) => void;
}

//* Style Params Types
export type MainStyleParams = Pick<WidgetEditorProps, 'marginTop'>;

//* Component Props Type
export type WidgetEditorProps = Pick<ContainerProps, 'maxWidth'> &
  BaseEditorProps<WidgetConfigs>;

export interface NodeCreateButtonProps {
  config?: ComponentConfig;
  path?: string;
  variant: NodeCreateVariant;
  onClick: (component: CoreComponent) => void;
}
