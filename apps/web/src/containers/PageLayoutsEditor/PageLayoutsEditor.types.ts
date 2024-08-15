import type { ResponsiveGridProps } from '@weavcraft/core';

import type {
  BaseEditorProps,
  HierarchyData,
  PageLayoutConfigs,
  WidgetConfigs,
} from '../imports.types';

export enum ViewModeEnum {
  Preview,
}

export type WidgetLayout = PageLayoutConfigs['layouts'][number];

export interface ChangeEvents
  extends Pick<WidgetCreateButtonProps, 'onCreate'>,
    Pick<ResponsiveGridProps<WidgetLayout>, 'onResize' | 'onResort'> {
  onRemove: (layoutId: string) => void;
}

//* Style Params Types
export type MainStyleParams = Pick<PageLayoutsEditorProps, 'marginTop'>;

//* Component Props Type
export type PageLayoutsEditorProps = BaseEditorProps<PageLayoutConfigs>;

export interface WidgetCreateButtonProps {
  onCreate: (e: HierarchyData<WidgetConfigs>) => void;
}

export interface WidgetActionsProps {
  name: string;
  onRemove: () => void;
}
