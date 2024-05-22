import type { ContainerProps } from '@mui/material/Container';
import type { ComponentProps, ComponentType } from 'react';

import type { PortalContainerEl } from '~web/contexts';
import type { RenderConfig } from '~web/hooks';
import type { WidgetConfigs, WidgetType } from '~web/services';

export const ControllerProps = Symbol('ControllerProps');

export type MainStyleParams = Pick<WidgetEditorProps, 'marginTop'>;
export type ControllerStyleParams = { expanded: boolean };

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ControllerProps<W extends ComponentType<any>> =
  ComponentProps<W> & {
    'widget.editor.controller.props': {
      WidgetEl: W;
      config: RenderConfig;
      visibled?: boolean;
      onDelete: () => void;
      onEdit: () => void;
    };
  };
