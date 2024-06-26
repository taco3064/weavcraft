import fs from 'fs';
import path from 'path';

import { getParser } from './src/pages/api/parser/parser.utils';
import type { PropsDefinition } from './src/services';

const dirpath = path.resolve(process.cwd(), './public/definitions');
const { propSymbols, getCoreGroup, getPropsDefinitions } = getParser();

if (fs.existsSync(dirpath)) {
  fs.rmdirSync(dirpath, { recursive: true });
}

fs.mkdirSync(dirpath);

propSymbols?.forEach((symbol) => {
  const componentName = symbol.getName().replace(/Props$/, '');

  const json: PropsDefinition = {
    componentName,
    group: getCoreGroup(componentName),
    ...getPropsDefinitions(symbol),
  };

  fs.writeFileSync(
    path.resolve(dirpath, `./${componentName}.json`),
    JSON.stringify(json, null, 2)
  );
});
