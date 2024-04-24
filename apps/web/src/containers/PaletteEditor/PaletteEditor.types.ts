import type { ContainerProps } from '@mui/material/Container';

import type { PaletteViewerProps } from '~web/components';
import type { PortalContainerEl } from '~web/contexts';
import type { ThemePalette } from '~web/services';

export interface PaletteEditorProps
  extends Pick<ContainerProps, 'maxWidth'>,
    Pick<PaletteViewerProps, 'size'> {
  config?: ThemePalette;
  toolbarEl?: PortalContainerEl;
}
