import _get from 'lodash/get';

import { DataPropEnum, useDataPropName } from '~web/hooks';
import type { FixedData } from './FixedDataDialog.types';
import type { ComponentConfig } from '../imports.types';

export function useFixedData(config: ComponentConfig): FixedData {
  const dataPropName = useDataPropName(config) as DataPropEnum;

  const data =
    _get(config, ['props', dataPropName as string, 'value']) ||
    (dataPropName === DataPropEnum.Data ? {} : []);

  return {
    dataPropName,
    data,
  };
}
