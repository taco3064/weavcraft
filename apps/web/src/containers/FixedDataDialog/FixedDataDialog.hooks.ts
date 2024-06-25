import _get from 'lodash/get';

import { DataPropEnum, useDataPropName } from '~web/hooks';
import type { FixedData } from './FixedDataDialog.types';
import type { RenderConfig } from '../imports.types';

export function useFixedData(config: RenderConfig): FixedData {
  const dataPropName = useDataPropName(config) as DataPropEnum;

  const data =
    _get(config, ['props', dataPropName as string, 'value']) ||
    (dataPropName === DataPropEnum.Data ? {} : []);

  return {
    dataPropName,
    data,
  };
}
