import axios from 'axios';
import { withConnRefusedCatch, type QueryFunctionParams } from '../common';

export const getWidgetProps = withConnRefusedCatch(async function ({
  queryKey: [widgetId, isTutorialMode],
}: QueryFunctionParams<[string]>) {
  const res = await axios.post(`/api/parser/${widgetId}`);
  console.log('===', widgetId, res);

  return null;
});
