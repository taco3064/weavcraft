import type { ContainerProps } from '@mui/material/Container';

import type { PortalContainerEl } from '~web/contexts';
import type { WidgetConfigs } from '~web/services';

export type StyleParams = Pick<WidgetEditorProps, 'marginTop'>;

export interface WidgetEditorProps extends Pick<ContainerProps, 'maxWidth'> {
  config?: WidgetConfigs;
  marginTop?: number;
  title: string;
  toolbarEl?: PortalContainerEl;
}
