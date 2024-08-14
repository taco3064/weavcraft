import type { ResponsiveGridProps } from '@weavcraft/core';

import type {
  BaseEditorProps,
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
  onRemove: (id: string) => void;
}

//* Style Params Types
export type MainStyleParams = Pick<PageLayoutsEditorProps, 'marginTop'>;

//* Component Props Type
export type PageLayoutsEditorProps = BaseEditorProps<PageLayoutConfigs>;

export interface WidgetCreateButtonProps {
  onCreate: (id: string, widget: WidgetConfigs) => void;
}
