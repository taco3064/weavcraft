import type { PropTypeDefinitions } from '../common';

export type PropertyDefinitions = Record<string, PropTypeDefinitions.PropTypes>;

export type WidgetProps = {
  componentName: string;
  group?: string;
  propsType: PropertyDefinitions;
};
