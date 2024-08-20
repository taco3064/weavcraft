import type { ResponsiveGridProps } from '@weavcraft/core';
import type { WidgetHierarchy, WidgetLayout } from '../EventList';

import type {
  BaseEditorProps,
  Margin,
  PageLayoutConfigs,
} from '../imports.types';

export enum ViewModeEnum {
  Preview,
}

export interface ChangeEvents
  extends Pick<WidgetCreateButtonProps, 'onCreate'>,
    Pick<ResponsiveGridProps<WidgetLayout>, 'onResize' | 'onResort'> {
  onLayoutChange: (layout: WidgetLayout) => void;
  onRemove: (layoutId: string) => void;
}

//* Style Params Types
export interface MainStyleParams
  extends Pick<PageLayoutsEditorProps, 'marginTop'> {
  margin: Margin;
}

//* Component Props Type
export type PageLayoutsEditorProps = BaseEditorProps<PageLayoutConfigs>;

export interface WidgetCreateButtonProps {
  onCreate: (e: WidgetHierarchy) => void;
}

export interface WidgetActionsProps {
  name: string;
  onEventsEdit: () => void;
  onRemove: () => void;
}
