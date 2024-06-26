import { useMemo } from 'react';

import { DataPropEnum } from './useDataStructure.types';
import { useCorePropsGetter } from '~web/contexts';
import type { ComponentConfig } from '../useWidgetRender';

export function useDataPropName({ component }: ComponentConfig) {
  const getCoreProps = useCorePropsGetter();

  return useMemo<DataPropEnum | undefined>(() => {
    const { definition, isStoreWidget } = getCoreProps(component);
    const { dataBindingProps } = definition;

    const dataPropName = isStoreWidget
      ? DataPropEnum.Records
      : DataPropEnum.Data;

    return dataBindingProps?.[dataPropName] ? dataPropName : undefined;
  }, [component, getCoreProps]);
}
