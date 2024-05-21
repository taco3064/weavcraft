import type { ContainerProps } from '@mui/material/Container';
import type { ReactNode } from 'react';

import type { PortalContainerEl } from '~web/contexts';
import type { RenderConfig } from '~web/hooks';
import type { WidgetConfigs, WidgetType } from '~web/services';

export const ControllerProps = Symbol('ControllerProps');

export type MainStyleParams = Pick<WidgetEditorProps, 'marginTop'>;
export type ToggleStyleParams = { toggleClassName: string };

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

export interface ControllerProps {
  children: ReactNode;
  config: RenderConfig;
  onDelete: () => void;
  onEdit: () => void;
}
