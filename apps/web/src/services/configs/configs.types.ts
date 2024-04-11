import type { QueryFunctionContext } from '@tanstack/react-query';

export type { ThemePalette } from '@weavcraft/types';

export type GetThemePaletteParams = Pick<
  QueryFunctionContext<readonly [string, boolean]>,
  'queryKey'
>;
