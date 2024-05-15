import type { NextApiRequest, NextApiResponse } from 'next';

import { getParser } from './parser.utils';
import type { PropertyDefinitions, WidgetProps } from '~web/services';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' || process.env.NODE_ENV === 'production') {
    return res
      .setHeader('Allow', ['GET'])
      .status(405)
      .end('Parser API Not Allowed');
  }

  const { getCoreGroup, getProperty, getPropSymbol } = getParser();
  const { widgetId } = req.query as { widgetId: string };
  const propSymbol = getPropSymbol(widgetId);
  const properties = propSymbol?.getDeclaredType()?.getProperties() || [];

  const data: WidgetProps = {
    componentName: widgetId,
    group: getCoreGroup(widgetId),
    propsType: properties.reduce<PropertyDefinitions>((result, property) => {
      const [propName, definition] = getProperty(property);

      return {
        ...result,
        ...(definition && {
          [propName]: definition,
        }),
      };
    }, {}),
  };

  return res.status(200).json(data);
}
