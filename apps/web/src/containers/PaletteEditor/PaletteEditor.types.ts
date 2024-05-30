import { HexColorInput } from 'react-colorful';
import type { ComponentProps } from 'react';
import type { ContainerProps } from '@mui/material/Container';

import type { PortalContainerEl } from '~web/contexts';
import type { ThemePalette } from '~web/services';

import type {
  ColorName,
  EditorListProps,
  PaletteColor,
  PaletteViewerProps,
} from '~web/components';

export type ColorInputProps = ComponentProps<typeof HexColorInput>;

export type StyleParams = Pick<PaletteViewerProps, 'size'> &
  Pick<PaletteEditorProps, 'marginTop'>;

export interface PaletteEditorProps
  extends Pick<ContainerProps, 'maxWidth'>,
    Pick<PaletteViewerProps, 'size'> {
  config?: ThemePalette;
  marginTop?: number;
  title: string;
  toolbarEl?: PortalContainerEl;
}

export interface ColorEditorProps extends Pick<EditorListProps, 'onClose'> {
  items?: ColorName[];
  value: Partial<ThemePalette>;
  onChange: ({ name, color }: PaletteColor) => void;
}
