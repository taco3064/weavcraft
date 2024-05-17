import type { PropTypeDefinitions } from '../common';
import type { WidgetType } from '../configs';

export type PropertyDefinitions = Record<string, PropTypeDefinitions.PropTypes>;

export type PropsDefinition = {
  componentName: string;
  group?: string;
  propsType: PropertyDefinitions;
};

export type DefinitionIDB = Record<
  'core',
  {
    key: WidgetType;
    value: PropsDefinition;
  }
>;
