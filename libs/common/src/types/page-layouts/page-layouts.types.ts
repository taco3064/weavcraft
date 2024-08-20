import type { Breakpoint } from '@mui/material/styles';
import type { SetRequired } from 'type-fest';

export interface PageLayoutConfigs {
  id: string;
  layouts: {
    id: string;
    widgetId: string;
    spans: SetRequired<
      { [K in Breakpoint]?: Record<'cols' | 'rows', number> },
      'xs'
    >;
    events?: {
      [NodePath: string]: {
        // TODO - 尚未定案
        [PropPath: string]: unknown;
      };
    }[];
  }[];
}
