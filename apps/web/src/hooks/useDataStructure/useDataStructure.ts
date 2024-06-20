import type { ConfigPaths } from '../useWidgetRender';
import type { WidgetConfigs } from '../imports.types';

export function useDataBindingFields(
  widget: WidgetConfigs,
  paths: ConfigPaths
) {
  console.log(paths);

  return {
    data: [],
    records: [],
  };
}
