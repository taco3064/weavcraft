import { useMemo } from 'react';

import { DataPropEnum } from './useDataStructure.types';
import { useCorePropsGetter } from '~web/contexts';
import type { RenderConfig } from '../useWidgetRender';

export function useDataPropName({ widget }: RenderConfig) {
  const getCoreProps = useCorePropsGetter();

  return useMemo<DataPropEnum | undefined>(() => {
    const { definition, isStoreWidget } = getCoreProps(widget);
    const { dataBindingProps } = definition;

    const dataPropName = isStoreWidget
      ? DataPropEnum.Records
      : DataPropEnum.Data;

    return dataBindingProps?.[dataPropName] ? dataPropName : undefined;
  }, [widget, getCoreProps]);
}
