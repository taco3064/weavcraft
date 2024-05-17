import fs from 'fs';
import path from 'path';

import { getParser } from './src/pages/api/parser/parser.utils';
import type { PropsDefinition, PropertyDefinitions } from './src/services';

const dirpath = path.resolve(process.cwd(), './public/definitions');
const { propSymbols, getCoreGroup, getProperty } = getParser();

if (fs.existsSync(dirpath)) {
  fs.rmdirSync(dirpath, { recursive: true });
}

fs.mkdirSync(dirpath);

propSymbols?.forEach((symbol) => {
  const componentName = symbol.getName().replace(/Props$/, '');
  const properties = symbol.getDeclaredType()?.getProperties();

  const json: PropsDefinition = {
    componentName,
    group: getCoreGroup(componentName),
    propsType: properties.reduce<PropertyDefinitions>((result, property) => {
      const [propName, definition] = getProperty(property);

      if (definition) {
        result[propName] = definition;
      }

      return {
        ...result,
        ...(definition && {
          [propName]: definition,
        }),
      };
    }, {}),
  };

  fs.writeFileSync(
    path.resolve(dirpath, `./${componentName}.json`),
    JSON.stringify(json, null, 2)
  );
});
