import type { ContainerProps } from '@mui/material/Container';

import type { PortalContainerEl } from '~web/contexts';
import type { RenderConfig } from '~web/hooks';

import type {
  PropTypeDefinitions,
  WidgetConfigs,
  WidgetType,
} from '~web/services';

export type PropType = PropTypeDefinitions.PropTypes['type'];
export type StyleParams = Pick<WidgetEditorProps, 'marginTop'>;

export interface WidgetEditorProps extends Pick<ContainerProps, 'maxWidth'> {
  config?: WidgetConfigs;
  marginTop?: number;
  title: string;
  toolbarEl?: PortalContainerEl;
}

export interface AppendNodeProps {
  config: RenderConfig;
  definition?: PropTypeDefinitions.Node['definition'];
  path: string;
  onAppend: (e: { type: WidgetType; path: string; multiple: boolean }) => void;
}
