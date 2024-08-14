import type { Breakpoint } from '@mui/material/styles';
import type { WidgetLayout } from './PageLayoutsEditor.types';

export const NEW_LAYOUT: WidgetLayout = {
  id: 'add-widget',
  widgetId: 'add-widget',
  spans: Object.fromEntries(
    Object.entries(process.env.NEXT_PUBLIC_DEFAULT_COLS).map(([key, value]) => [
      key as Breakpoint,
      { cols: value, rows: 1 },
    ])
  ) as WidgetLayout['spans'],
};
