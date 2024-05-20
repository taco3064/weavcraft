import type { NextApiRequest, NextApiResponse } from 'next';

import { getParser } from './parser.utils';
import type { PropsDefinition } from '~web/services';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' || process.env.NODE_ENV === 'production') {
    return res
      .setHeader('Allow', ['GET'])
      .status(405)
      .end('Parser API Not Allowed');
  }

  const { getCoreGroup, getPropsDefinitions, getPropSymbol } = getParser();
  const { widgetId } = req.query as { widgetId: string };

  const data: PropsDefinition = {
    componentName: widgetId,
    group: getCoreGroup(widgetId),
    ...getPropsDefinitions(getPropSymbol(widgetId)),
  };

  return res.status(200).json(data);
}
