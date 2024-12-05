import _get from 'lodash/get';
import _toPath from 'lodash/toPath';
import { useCallback, useMemo, useState, useTransition } from 'react';
import type { JsonObject } from 'type-fest';

import { DataPropEnum, useCorePropsGetter, useDataPropName } from '~web/hooks';

import type {
  DataDetailProps,
  DataEditorDialogProps,
} from './FixedDataDialog.types';

import type {
  ComponentConfig,
  MappingPath,
  PrimitiveDefinition,
} from '../imports.types';

export function useFixedData(
  config: ComponentConfig
): JsonObject | JsonObject[] {
  const dataPropName = useDataPropName(config);

  return (
    (_get(config, ['props', dataPropName as DataPropEnum, 'value']) as
      | JsonObject
      | JsonObject[]) || (dataPropName === DataPropEnum.Data ? {} : [])
  );
}

export function useFormFields({ component }: ComponentConfig) {
  const getCoreProps = useCorePropsGetter();

  return useMemo(() => {
    const { definition, isStoreWidget, mappingPaths, mappableProps } =
      getCoreProps(component);

    const mappingPath = mappingPaths.find((path) =>
      isStoreWidget ? path.endsWith('.propMapping') : path === 'propMapping'
    ) as MappingPath;

    const [, basePropName] = _toPath(mappingPath).reverse();

    const propNames: string[] =
      _get(definition, ['dataBindingProps', mappingPath, 'definition']) || [];

    return propNames
      .reduce<PrimitiveDefinition[]>((acc, propName) => {
        const propPath = basePropName
          ? `${basePropName}.${propName}`
          : propName;

        const { [propPath]: definition } = mappableProps;

        if (definition.type !== 'node') {
          acc.push({ ...definition, path: propName });
        } else {
          acc.push({
            ...definition,
            path: propName,
            type: 'string',
            definition: { multiple: true },
          });
        }

        return acc;
      }, [])
      .sort(({ path: p1 }, { path: p2 }) => p1.localeCompare(p2));
  }, [component, getCoreProps]);
}

export function useDataModifyProps(
  value: JsonObject | JsonObject[],
  onValueChange: (value: JsonObject | JsonObject[]) => void
): [
  Pick<
    DataEditorDialogProps,
    'data' | 'mode' | 'open' | 'onClose' | 'onConfirm'
  >,
  Pick<DataDetailProps, 'onAdd' | 'onEdit' | 'onRemove'>
] {
  const [, startTransition] = useTransition();

  const [editing, setEditing] = useState<{
    index?: number;
    data: JsonObject;
  }>();

  return [
    {
      data: editing?.data,
      mode: typeof editing?.index === 'number' ? 'edit' : 'add',
      open: Boolean(editing),

      onClose: useCallback(() => setEditing(undefined), []),
      onConfirm: (modified) =>
        startTransition(() => {
          setEditing(undefined);

          if (!Array.isArray(value)) {
            return onValueChange(modified);
          } else if (typeof editing?.index === 'number') {
            value.splice(editing.index, 1, modified);
          } else {
            value.push(modified);
          }

          onValueChange([...value]);
        }),
    },
    {
      onAdd: () => setEditing({ data: {} }),
      onEdit: (e) => {
        if (typeof e !== 'number') {
          setEditing({ data: e });
        } else if (Array.isArray(value)) {
          setEditing({ index: e, data: value[e] });
        }
      },
      onRemove: (index) => {
        if (Array.isArray(value)) {
          value.splice(index, 1);
          onValueChange([...value]);
        }
      },
    },
  ];
}
