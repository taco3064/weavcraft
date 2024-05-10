import type { Symbol as TsmSymbol, Type as TsmType } from 'ts-morph';
import type { PropTypeDefinitions } from '~web/services';

export type ParserResult = Record<string, PropTypeDefinitions.PropTypes>;

export type GetDefinitionFn = (
  type: TsmType,
  options: Pick<PropTypeDefinitions.PropTypes, 'name' | 'required'>
) => PropTypeDefinitions.PropTypes | false;

export type GetPropertyFn = (
  property: TsmSymbol
) => [string, PropTypeDefinitions.PropTypes | null];
