import path from 'path';
import * as Tsm from 'ts-morph';
import type { Symbol as TsmSymbol } from 'ts-morph';

import type { PropTypeDefinitions } from '~web/services';

import type {
  GetDefinitionFn,
  GetPropertyFn,
  ParserResult,
} from './parser.types';

export const source = new Tsm.Project().addSourceFileAtPath(
  path.resolve(process.cwd(), '../../libs/core/src/index.ts')
);

export const getProperty: GetPropertyFn = (property: TsmSymbol) => {
  const name = property.getName();

  const definition = getDefinition(property.getTypeAtLocation(source), {
    name,
    required: !property.isOptional(),
  });

  return [name, !definition ? null : definition];
};

const trimImportText = (text?: string) =>
  text?.replace(/import\s*\(.*?\)\s*;?\./g, '');

const getDefinition: GetDefinitionFn = (type, options) =>
  generators.reduce<ReturnType<GetDefinitionFn>>(
    (result, generator) => result || generator(type, options),
    false
  );

const generators: GetDefinitionFn[] = [
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
    } else if (text?.endsWith('SlotElement')) {
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

  //* - Specific Prop Types
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
  (type, options) => (type.isNumber() ? { ...options, type: 'number' } : false),

  //* - String Prop Types
  (type, options) => (type.isString() ? { ...options, type: 'string' } : false),

  //* - Callback Function Prop Types
  (type, options) => {
    const [callSignature] = type.getCallSignatures().reverse();

    return callSignature
      ? {
          ...options,
          type: 'function',
          definition: {
            params: callSignature.getParameters().map((param) => {
              const paramType = param.getTypeAtLocation(source);

              return (
                getDefinition(paramType, {
                  name: param.getName(),
                  required: !param.isOptional(),
                }) || undefined
              );
            }),
            return:
              getDefinition(callSignature.getReturnType(), {
                name: 'return',
                required: true,
              }) || undefined,
          },
        }
      : false;
  },

  //* - Object Prop Types
  (type, options) => {
    if (type.isObject() && !type.isArray()) {
      const properties = type.getProperties();

      return options.name === 'propMapping'
        ? {
            ...options,
            type: 'mapping',
            definition: properties.map((property) => property.getName()),
          }
        : {
            ...options,
            type: 'object',
            definition: properties.reduce<ParserResult>((result, property) => {
              const [name, definition] = getProperty(property);

              return {
                ...result,
                ...(definition && {
                  [name]: definition,
                }),
              };
            }, {}),
          };
    }

    return false;
  },

  //* - Union Prop Types
  (type, options) => {
    if (type.isUnion()) {
      const definition = type
        .getUnionTypes()
        .reduce<NonNullable<PropTypeDefinitions.OneOf['definition']>>(
          (result, union) => {
            const { type, definition } = getDefinition(union, options) || {};

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

  //* - Unhandled Prop Types
  (type, options) => {
    if (type.getText() !== type.getApparentType().getText()) {
      return getDefinition(type.getApparentType(), options);
    }

    console.warn(`Unhandled type: ${type.getText()} (${options.name})`);

    return false;
  },
];
