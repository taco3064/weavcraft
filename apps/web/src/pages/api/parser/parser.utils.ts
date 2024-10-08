import path from 'path';
import _camelcase from 'lodash/camelCase';
import _set from 'lodash/set';
import * as Tsm from 'ts-morph';
import { PropCategory } from '@weavcraft/common';

import type { TypeDefinition } from '../../imports.types';

import type {
  CoreParser,
  GetDefinitionFns,
  GetPropertyWithAllTypesFn,
  GetPropsDefinitionFn,
  GetPropsDefinitionsReturn,
} from './parser.types';

const PROP_CATEGORY: PropCategory[] = [
  'DataBinding',
  'ElementNode',
  'EventCallback',
  'PrimitiveValue',
];

const source = new Tsm.Project().addSourceFileAtPath(
  path.resolve(process.cwd(), '../../libs/core/src/index.ts')
);

const trimImportText = (text?: string) =>
  text?.replace(/import\s*\(.*?\)\s*;?\./g, '');

const getPropsDefinition: GetPropsDefinitionFn = (
  propCategory,
  type,
  options
) => {
  const { [propCategory]: generators } = Generator;

  return generators.reduce<ReturnType<(typeof generators)[number]>>(
    (result, generator) => {
      if (!result) {
        return (
          generator(type, options) || generator(type.getApparentType(), options)
        );
      }

      return result;
    },
    false
  );
};

const getPropertyWithAllTypes: GetPropertyWithAllTypesFn = (
  property,
  prefixPath = ''
) => {
  for (const propCategory of PROP_CATEGORY) {
    const propPath = [prefixPath, property.getName()].filter(Boolean).join('.');
    const type = property.getTypeAtLocation(source);

    const definition = /(^|\.)(className|component)$/.test(propPath)
      ? false
      : getPropsDefinition(propCategory, type, {
          path: propPath,
          required: !property.isOptional(),
        });

    if (definition) {
      return [{ propCategory, propPath, definition }];
    }
  }

  const name = property.getName();
  const path = [prefixPath, name].filter(Boolean).join('.');
  const type = property.getTypeAtLocation(source);
  const isPlainObject = type.isObject() && !type.isArray();

  return !isPlainObject
    ? []
    : type
        .getProperties()
        .reduce<ReturnType<GetPropertyWithAllTypesFn>>((acc, property) => {
          acc.push(...getPropertyWithAllTypes(property, path));

          return acc;
        }, []);
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

  const groupMap = source.getExportSymbols().reduce((result, symbol) => {
    const type = symbol.getTypeAtLocation(source);

    //? The group name must be in uppercase and the type must be an object
    if (/^[A-Z]/.test(symbol.getName()) && type.isObject()) {
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

    getCoreGroup: (component) => groupMap.get(component),

    getPropSymbol: (component) =>
      propSymbols.find((symbol) => symbol.getName() === `${component}Props`),

    getPropsDefinitions: (symbol) => {
      const properties = symbol?.getDeclaredType()?.getProperties() || [];

      return properties.reduce<GetPropsDefinitionsReturn>((acc, property) => {
        getPropertyWithAllTypes(property).forEach(
          ({ propCategory, propPath, definition }) => {
            if (definition) {
              const key = `${
                _camelcase(propCategory) as Uncapitalize<PropCategory>
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
  DataBinding: [
    //* - Special Prop Types
    (type, options) => {
      const text = trimImportText(type.getText());

      if (
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
      } else if (
        type.isObject() &&
        !type.isArray() &&
        /(^|\.)propMapping$/.test(options.path)
      ) {
        return {
          ...options,
          type: 'mapping',
          definition: type
            .getProperties()
            .map((property) => property.getName()),
        };
      }

      return false;
    },
  ],
  ElementNode: [
    //* - Special Prop Types
    (type, options) => {
      const text = trimImportText(type.getText());

      if (
        text?.endsWith('SlotElement') ||
        text?.startsWith('React.ReactElement<SlotProps,')
      ) {
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
                  getPropsDefinition('PrimitiveValue', paramType, {
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

      return text === 'IconCode' ? { ...options, type: 'icon' } : false;
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
    (type, options) => {
      if (trimImportText(type.getText()) === 'String') {
        return { ...options, type: 'string', definition: { multiple: true } };
      } else if (type.isString()) {
        return { ...options, type: 'string', definition: { multiple: false } };
      }

      return false;
    },

    //* - Union Prop Types
    (type, options) => {
      if (type.isUnion()) {
        const definition = type
          .getUnionTypes()
          .reduce<NonNullable<TypeDefinition.OneOf['definition']>>(
            (result, union) => {
              const { type, definition } =
                getPropsDefinition('PrimitiveValue', union, options) || {};

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
