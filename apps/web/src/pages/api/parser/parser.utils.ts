import path from 'path';
import _camelcase from 'lodash/camelCase';
import _set from 'lodash/set';
import * as Tsm from 'ts-morph';
import { WidgetPropTypes } from '@weavcraft/common';

import type { PropTypeDefinitions } from '~web/services';

import type {
  CoreParser,
  GetDefinitionFn,
  GetDefinitionFns,
  GetPropertyFn,
  GetPropertyWithAllTypesFn,
  GetPropsDefinitionsReturn,
} from './parser.types';

const WIDGET_PROP_TYPES: WidgetPropTypes[] = [
  'ElementNode',
  'EventCallback',
  'PrimitiveValue',
];

const source = new Tsm.Project().addSourceFileAtPath(
  path.resolve(process.cwd(), '../../libs/core/src/index.ts')
);

const trimImportText = (text?: string) =>
  text?.replace(/import\s*\(.*?\)\s*;?\./g, '');

const getDefinition: GetDefinitionFn = (propsType, type, options) => {
  const { [propsType]: generators } = Generator;

  return generators.reduce<ReturnType<(typeof generators)[number]>>(
    (result, generator) => result || generator(type, options),
    false
  );
};

const getProperty: GetPropertyFn = (propsType, property, prefixPath = '') => {
  const path = [prefixPath, property.getName()].filter(Boolean).join('.');
  const type = property.getTypeAtLocation(source);

  const definition = getDefinition(propsType, type, {
    path,
    required: !property.isOptional(),
  });

  return [path, !definition ? null : definition];
};

const getPropertyWithAllTypes: GetPropertyWithAllTypesFn = (
  property,
  prefixPath = ''
) => {
  for (const propsType of WIDGET_PROP_TYPES) {
    const [propPath, definition] = getProperty(propsType, property, prefixPath);

    if (definition) {
      return [{ propsType, propPath, definition }];
    }
  }

  const name = property.getName();
  const path = [prefixPath, name].filter(Boolean).join('.');
  const type = property.getTypeAtLocation(source);

  if (type.isObject() && !type.isArray()) {
    const properties = type.getProperties();

    return name === 'propMapping'
      ? properties
          .map((property) => getPropertyWithAllTypes(property, path))
          .flat()
      : properties.reduce<ReturnType<GetPropertyWithAllTypesFn>>(
          (acc, property) => {
            acc.push(...getPropertyWithAllTypes(property, path));

            return acc;
          },
          []
        );
  }

  return [];
};

export function getParser(): CoreParser {
  source.refreshFromFileSystemSync();

  const key = 'default';
  const [core] = source.getExportedDeclarations().get(key) || [];

  const propSymbols =
    core
      ?.getSourceFile()
      .getExportSymbols()
      .filter((symbol) => symbol.getName().endsWith('Props')) || [];

  const coreGroups = source.getExportSymbols().reduce((result, symbol) => {
    const type = symbol.getTypeAtLocation(source);

    if (symbol.getName() !== key && type.isObject()) {
      type
        .getProperties()
        .forEach((property) =>
          result.set(property.getName(), symbol.getName())
        );
    }

    return result;
  }, new Map<string, string>());

  return {
    source,
    propSymbols,

    getCoreGroup: (component) => coreGroups.get(component),

    getPropSymbol: (component) =>
      propSymbols.find((symbol) => symbol.getName() === `${component}Props`),

    getPropsDefinitions: (symbol) => {
      const properties = symbol?.getDeclaredType()?.getProperties() || [];

      return properties.reduce<GetPropsDefinitionsReturn>((acc, property) => {
        getPropertyWithAllTypes(property).forEach(
          ({ propsType, propPath, definition }) => {
            if (definition) {
              const key = `${
                _camelcase(propsType) as Uncapitalize<WidgetPropTypes>
              }Props` as const;

              _set(acc, [key, propPath], definition);
            }
          }
        );

        return acc;
      }, {});
    },
  };
}

const Generator: GetDefinitionFns = {
  ElementNode: [
    //* - Special Prop Types
    (type, options) => {
      const text = trimImportText(type.getText());

      if (text?.endsWith('SlotElement')) {
        return {
          ...options,
          type: 'node',
          definition: { clickable: true, multiple: false },
        };
      } else if (text === 'React.ReactNode') {
        return {
          ...options,
          type: 'node',
          definition: { clickable: false, multiple: true },
        };
      } else if (text?.startsWith('React.ReactElement')) {
        return {
          ...options,
          type: 'node',
          definition: { clickable: false, multiple: false },
        };
      }

      return false;
    },
  ],
  EventCallback: [
    //* - Callback Function Prop Types
    (type, options) => {
      const [callSignature] = type.getCallSignatures().reverse();

      return callSignature && /(^on|\.on)[A-Z]/.test(options.path)
        ? {
            ...options,
            type: 'function',
            definition: {
              params: callSignature.getParameters().map((param, i) => {
                const paramType = param.getTypeAtLocation(source);

                return (
                  getDefinition('PrimitiveValue', paramType, {
                    path: `[${i}]`,
                    aliasName: param.getName(),
                    required: !param.isOptional(),
                  }) || undefined
                );
              }),
            },
          }
        : false;
    },
  ],
  PrimitiveValue: [
    //* - Special Prop Types
    (type, options) => {
      const text = trimImportText(type.getText());

      if (text === 'IconCode') {
        return { ...options, type: 'icon' };
      } else if (
        text === 'D' &&
        trimImportText(type.getApparentType().getText()) === 'JsonObject'
      ) {
        return { ...options, type: 'data', definition: { multiple: false } };
      } else if (
        text === 'D[]' &&
        trimImportText(
          type.getArrayElementType()?.getApparentType().getText()
        ) === 'JsonObject'
      ) {
        return { ...options, type: 'data', definition: { multiple: true } };
      }

      return false;
    },

    //* - Literal Prop Types
    (type, options) =>
      type.isLiteral()
        ? {
            ...options,
            type: 'oneof',
            definition: [JSON.parse(type.getText())],
          }
        : false,

    //* - Boolean Prop Types
    (type, options) =>
      type.isBoolean() ? { ...options, type: 'boolean' } : false,

    //* - Number Prop Types
    (type, options) =>
      type.isNumber() ? { ...options, type: 'number' } : false,

    //* - String Prop Types
    (type, options) =>
      type.isString() ? { ...options, type: 'string' } : false,

    // //* - Object Prop Types
    // (type, options) => {
    //   if (type.isObject() && !type.isArray()) {

    //   }

    //   return false;
    // },

    //* - Union Prop Types
    (type, options) => {
      if (type.isUnion()) {
        const definition = type
          .getUnionTypes()
          .reduce<NonNullable<PropTypeDefinitions.OneOf['definition']>>(
            (result, union) => {
              const { type, definition } =
                getDefinition('PrimitiveValue', union, options) || {};

              result.push(...((type === 'oneof' && definition) || []));

              return result;
            },
            []
          );

        return definition.length
          ? { ...options, type: 'oneof', definition }
          : false;
      }

      return false;
    },
  ],
};
