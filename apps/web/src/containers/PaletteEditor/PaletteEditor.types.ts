import type { ContainerProps } from '@mui/material/Container';

import type {
  BaseEditorProps,
  PaletteViewerProps,
  ThemePalette,
} from '../imports.types';

export type MainStyleParams = Pick<PaletteViewerProps, 'size'> &
  Pick<PaletteEditorProps, 'marginTop'>;

export type PaletteEditorProps = Pick<ContainerProps, 'maxWidth'> &
  Pick<PaletteViewerProps, 'size'> &
  BaseEditorProps<ThemePalette>;
