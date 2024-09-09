import cl from 'color';
import createPalette from '@mui/material/styles/createPalette';
import { useEffect, useRef } from 'react';

import { useAppSettings } from '~web/hooks';
import type { PaletteCode, ThemePalette } from '../imports.types';

export function usePalettePreview() {
  const { palette, setPalette } = useAppSettings();
  const resetRef = useRef(() => setPalette?.(palette as PaletteCode));

  useEffect(() => resetRef.current, [resetRef]);

  return {
    isPreviewMode: typeof palette !== 'string',

    onPaletteApply: (palette?: Partial<ThemePalette>) => {
      if (palette) {
        const bgcolor = cl(
          palette.background?.default || palette.background?.paper
        );

        setPalette?.(
          createPalette({
            ...palette,
            mode: bgcolor.isDark() ? 'dark' : 'light',
            divider:
              palette.divider ||
              bgcolor.negate().grayscale().alpha(0.12).hexa(),
          })
        );

        return;
      }

      resetRef.current();
    },
  };
}
