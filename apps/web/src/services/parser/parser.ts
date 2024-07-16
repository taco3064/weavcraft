import axios from 'axios';

import { Idb, withConnRefusedCatch } from '../common';
import type { DefinitionIDB, PropsDefinition } from './parser.types';
import type { CoreComponent } from '../configs';

export const getPropsDefinition = withConnRefusedCatch<
  CoreComponent,
  PropsDefinition
>(async function (widgetId) {
  const idb = await Idb.get<DefinitionIDB>('definitions', 'core');
  const definition = await idb?.get('core', widgetId);

  if (definition) {
    return { success: true, status: 200, data: definition };
  }

  const { data } = await axios.get(
    process.env.NODE_ENV === 'production'
      ? `/definitions/${widgetId}.json`
      : `/api/parser/${widgetId}`
  );

  idb?.put('core', data, widgetId);

  return { success: true, status: 200, data };
});
