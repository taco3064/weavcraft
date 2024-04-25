import { HexColorInput } from 'react-colorful';
import type { ComponentProps } from 'react';
import type { ContainerProps } from '@mui/material/Container';

import type { PaletteViewerProps } from '~web/components';
import type { PortalContainerEl } from '~web/contexts';
import type { ThemePalette } from '~web/services';

export type ColorInputProps = ComponentProps<typeof HexColorInput>;

export interface PaletteEditorProps
  extends Pick<ContainerProps, 'maxWidth'>,
    Pick<PaletteViewerProps, 'size'> {
  config?: ThemePalette;
  toolbarEl?: PortalContainerEl;
}
