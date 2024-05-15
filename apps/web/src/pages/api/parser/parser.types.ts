import type * as Tsm from 'ts-morph';
import type { PropTypeDefinitions } from '~web/services';

export type GetDefinitionFn = (
  type: Tsm.Type,
  options: Pick<PropTypeDefinitions.PropTypes, 'name' | 'required'>
) => PropTypeDefinitions.PropTypes | false;

export type GetPropertyFn = (
  property: Tsm.Symbol
) => [string, PropTypeDefinitions.PropTypes | null];

export type CoreParser = {
  source: Tsm.SourceFile;
  propSymbols: Tsm.Symbol[];
  getCoreGroup: (component: string) => string | undefined;
  getProperty: GetPropertyFn;
  getPropSymbol: (component: string) => Tsm.Symbol | undefined;
};
