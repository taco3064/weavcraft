import axios from 'axios';

import { Idb, withConnRefusedCatch } from '../common';
import type { DefinitionIDB, PropsDefinition } from './parser.types';
import type { WidgetType } from '../configs';

export const getPropsDefinition = withConnRefusedCatch(async function (
  widgetId: WidgetType
) {
  const idb = await Idb.get<DefinitionIDB>('definitions', 'core');
  const definition = await idb?.get('core', widgetId);

  if (definition) {
    return definition;
  }

  const res = await axios.get<PropsDefinition>(
    process.env.NODE_ENV === 'production'
      ? `/definitions/${widgetId}.json`
      : `/api/parser/${widgetId}`
  );

  idb?.put('core', res.data, widgetId);

  return res.data;
});
