import Core from '@weavcraft/core';
import _get from 'lodash/get';
import _set from 'lodash/set';
import type { ComponentType, ReactNode } from 'react';

import { useCorePropsGetter } from '~web/contexts';

import type {
  DataFields,
  GenerateOptions,
  ComponentConfig,
  RenderFn,
} from './useWidgetRender.types';

export function useWidgetRender(render: RenderFn) {
  const getCoreProps = useCorePropsGetter();

  return function generate(
    config: ComponentConfig,
    { key, dataStructure = [], paths = [] }: GenerateOptions = {}
  ) {
    const WidgetEl = _get(Core, config.component) as ComponentType;
    const { definition } = getCoreProps(config.component);

    return render(WidgetEl, {
      config,
      key,
      paths: paths
        .map((path) =>
          typeof path === 'string' ? ['props', path, 'value'] : path
        )
        .flat(),
      props: Object.entries(config.props || {}).reduce(
        (acc, [path, { type, value }]) => {
          if (type === 'ElementNode') {
            const nodes = Array.isArray(value) ? value : [value];

            const { multiple = false } =
              _get(definition, ['elementNodeProps', path, 'definition']) || {};

            const children: ReactNode[] = nodes.map((node, i) =>
              generate(node as ComponentConfig, {
                key: i,
                dataStructure,
                paths: [...paths, path, ...(multiple ? [i] : [])],
              })
            );

            _set(acc, path, multiple ? children : children[0]);
          } else if (type === 'DataBinding' && path.endsWith('propMapping')) {
            _set(
              acc,
              path,
              Object.entries(value || {}).reduce(
                (mapping, [propPath, sourcePath]) => {
                  if (typeof sourcePath === 'string') {
                    return _set(mapping, propPath, sourcePath);
                  }

                  const fieldPath = _get(
                    dataStructure,
                    sourcePath as []
                  ) as string;

                  return !fieldPath
                    ? mapping
                    : _set(mapping, propPath, fieldPath);
                },
                {}
              )
            );
          } else {
            _set(acc, path, value);
          }

          return acc;
        },
        {}
      ),
    });
  };
}
