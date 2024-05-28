import type { ContainerProps } from '@mui/material/Container';

import type { ConfigPaths, RenderConfig } from '~web/hooks';
import type { PortalContainerEl } from '~web/contexts';
import type { WidgetConfigs, WidgetType } from '~web/services';

export const ControllerProps = Symbol('ControllerProps');
export type MainStyleParams = Pick<WidgetEditorProps, 'marginTop'>;

type StructureEvent = {
  target: RenderConfig;
  paths: ConfigPaths;
};

export interface WidgetEditorProps extends Pick<ContainerProps, 'maxWidth'> {
  config?: WidgetConfigs;
  marginTop?: number;
  title: string;
  toolbarEl?: PortalContainerEl;
}

export interface AppendNodeProps {
  path?: string;
  variant: 'action' | 'node';
  widgetId?: WidgetType;
  onAppend: (widget: WidgetType) => void;
}

export type StructureActionProps<P extends string = 'paths'> = Record<
  P,
  ConfigPaths
> & {
  config: RenderConfig;
  onDelete: (e: StructureEvent) => void;
  onEdit: (e: StructureEvent) => void;
};

export interface StructureItemProps extends StructureActionProps {
  onActive: (e: StructureEvent) => void;
}

export interface StructureProps
  extends StructureActionProps<'active'>,
    Pick<StructureItemProps, 'onActive'> {
  action: React.ReactNode;
}
