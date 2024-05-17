import type { ContainerProps } from '@mui/material/Container';
import type { PortalContainerEl } from '~web/contexts';
import type { WidgetConfigs, WidgetType } from '~web/services';

export type StyleParams = Pick<WidgetEditorProps, 'marginTop'>;

export interface WidgetEditorProps extends Pick<ContainerProps, 'maxWidth'> {
  config?: WidgetConfigs;
  marginTop?: number;
  title: string;
  toolbarEl?: PortalContainerEl;
}

export interface AppendNodeProps {
  path?: string;
  variant: 'action' | 'node';
  onAppend: (widget: WidgetType) => void;
}
