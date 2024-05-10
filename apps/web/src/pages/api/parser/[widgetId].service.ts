import type { NextApiRequest, NextApiResponse } from 'next';

import { source, getProperty } from './parser.utils';
import type { ParserResult } from './parser.types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { widgetId } = req.query;

  if (req.method !== 'GET') {
    return res
      .setHeader('Allow', ['GET'])
      .status(405)
      .end(`Method ${req.method} Not Allowed`);
  }

  source.refreshFromFileSystemSync();

  console.log('=====');

  return res.status(200).json(
    source.getExportSymbols().reduce<ParserResult>((result, symbol) => {
      if (symbol.getName() === `${widgetId}Props`) {
        const properties = symbol.getDeclaredType()?.getProperties();

        properties.forEach((property) => {
          const [propName, definition] = getProperty(property);

          if (definition) {
            result[propName] = definition;
          }
        });
      }

      return result;
    }, {})
  );
}
