import axios from 'axios';

import type { WidgetProps } from './parser.types';
import { withConnRefusedCatch, type QueryFunctionParams } from '../common';

export const getWidgetProps = withConnRefusedCatch(async function ({
  queryKey: [widgetId],
}: QueryFunctionParams<[string]>) {
  const res = await axios.get<WidgetProps>(
    process.env.NODE_ENV === 'production'
      ? `/definitions/${widgetId}.json`
      : `/api/parser/${widgetId}`
  );

  return res.data;
});
