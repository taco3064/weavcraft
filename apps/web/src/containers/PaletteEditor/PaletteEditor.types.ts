import { HexColorInput } from 'react-colorful';
import type { ComponentProps, ReactNode } from 'react';
import type { ContainerProps } from '@mui/material/Container';

import type { PortalContainerEl } from '~web/contexts';
import type { ThemePalette } from '~web/services';

import type {
  ColorName,
  PaletteColor,
  PaletteViewerProps,
} from '~web/components';

export type ColorInputProps = ComponentProps<typeof HexColorInput>;
export type StyleParams = Pick<PaletteViewerProps, 'size'>;

export interface PaletteEditorProps
  extends Pick<ContainerProps, 'maxWidth'>,
    Pick<PaletteViewerProps, 'size'> {
  config?: ThemePalette;
  toolbarEl?: PortalContainerEl;
}

export interface ColorEditorProps {
  action?: ReactNode;
  items?: ColorName[];
  value: Partial<ThemePalette>;
  onChange: ({ name, color }: PaletteColor) => void;
}
