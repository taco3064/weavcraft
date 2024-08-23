import type { ContainerProps } from '@mui/material/Container';
import type { DataStructureListProps } from '../DataStructureList';

import type {
  BaseEditorProps,
  ConfigPaths,
  CreateNodeEvents,
  PropsSettingChangeHandler,
  WidgetConfigs,
} from '../imports.types';

export enum ViewModeEnum {
  DataStructure,
  Preview,
}

export interface ChangeEvents extends CreateNodeEvents {
  onConfigChange: PropsSettingChangeHandler;
  onDeleteNode: (paths: ConfigPaths) => void;
  onStructureChange: NonNullable<DataStructureListProps['onChange']>;
}

//* Style Params Types
export type MainStyleParams = Pick<WidgetEditorProps, 'marginTop'>;

//* Component Props Type
export type WidgetEditorProps = Pick<ContainerProps, 'maxWidth'> &
  BaseEditorProps<WidgetConfigs>;
