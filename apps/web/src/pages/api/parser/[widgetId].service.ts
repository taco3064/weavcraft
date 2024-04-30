import * as docgen from 'react-docgen-typescript';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const CORE_PATH = path.resolve(
  process.cwd(),
  process.env.NODE_ENV === 'production'
    ? './out/libs/core'
    : '../../libs/core/src/components'
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method !== 'POST') {
  //   return res
  //     .setHeader('Allow', ['POST'])
  //     .status(405)
  //     .end(`Method ${req.method} Not Allowed`);
  // }

  const { widgetId } = req.query;

  const [{ props, ...e }, ...f] = docgen.parse(
    path.resolve(CORE_PATH, `./${widgetId}/index.ts`),
    {
      shouldExtractLiteralValuesFromEnum: true,
      shouldExtractValuesFromUnion: true,
      savePropValueAsString: false,
    }
  );

  console.log(e, f);

  return res.status(200).json(props);
}
