import fs from 'fs';
import path from 'path';

import { getParser } from './src/pages/api/parser/parser.utils';
import type { ComponentDefinition } from './src/services';

const outputDir = path.resolve(process.cwd(), './public/definitions');
const { propSymbols, getCoreGroup, getPropsDefinitions } = getParser();

if (fs.existsSync(outputDir)) {
  fs.rmdirSync(outputDir, { recursive: true });
}

fs.mkdirSync(outputDir);

propSymbols?.forEach((symbol) => {
  const componentName = symbol.getName().replace(/Props$/, '');

  const json: ComponentDefinition = {
    componentName,
    group: getCoreGroup(componentName),
    ...getPropsDefinitions(symbol),
  };

  fs.writeFileSync(
    path.resolve(outputDir, `./${componentName}.json`),
    JSON.stringify(json, null, 2)
  );
});
