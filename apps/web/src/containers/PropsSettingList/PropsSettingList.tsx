import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CommitIcon from '@mui/icons-material/Commit';
import EditIcon from '@mui/icons-material/Edit';
import _get from 'lodash/get';
import _toPath from 'lodash/toPath';
import { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';

import FixedDataDialog from '../FixedDataDialog';
import PropItem from './PropsSettingList.PropItem';
import SourceSelect from './PropsSettingList.SourceSelect';
import { EditorList, SwitchListItem } from '~web/components';
import { InjectionModeEnum } from './PropsSettingList.types';
import { useCorePropsGetter } from '~web/contexts';
import { useDataPropName, useNodePaths } from '~web/hooks';
import { useFieldBindingHandler } from './PropsSettingList.hooks';
import { useMainStyles } from './PropsSettingList.styles';

import type {
  DataSource,
  PropsSettingListProps,
} from './PropsSettingList.types';

export default function PropsSettingList({
  config,
  paths,
  widget,
  onChange,
  onClose,
}: PropsSettingListProps) {
  const { component } = config;
  const { t } = useTranslation();
  const { classes } = useMainStyles();
  const { pathDescription } = useNodePaths(paths);

  const getCoreProps = useCorePropsGetter();
  const onFieldBinding = useFieldBindingHandler({ config, onChange });
  const dataPropName = useDataPropName(config);

  const propItems = useMemo(() => {
    const { definition } = getCoreProps(component);
    const { primitiveValueProps } = definition;

    return Object.entries(primitiveValueProps || {})
      .sort(([path1], [path2]) => {
        const paths1 = _toPath(path1);
        const paths2 = _toPath(path2);

        return paths1.length - paths2.length || path1.localeCompare(path2);
      })
      .map(([propPath, definition]) => ({
        propPath,
        definition,
      }));
  }, [component, getCoreProps]);

  const dataSourceIndexes = _get(config, [
    'props',
    'propMapping',
    'value',
    dataPropName as string,
  ]) as DataSource;

  const [mode, setMode] = useState<InjectionModeEnum>(() =>
    dataSourceIndexes ? InjectionModeEnum.Binding : InjectionModeEnum.Fixed
  );

  return (
    <EditorList
      description={pathDescription}
      icon={<AutoAwesomeIcon color="primary" />}
      onClose={onClose}
      title={t('widgets:ttl-component-settings', {
        component: t(`widgets:lbl-component.${component}`),
      })}
      render={({ icon }) => (
        <>
          {dataPropName && (
            <SwitchListItem
              divider
              active={mode}
              classes={{ icon, row: classes.row }}
              onActiveChange={setMode}
              options={{
                [InjectionModeEnum.Fixed]: {
                  color: 'error',
                  icon: <EditIcon />,
                  tooltip: t('widgets:ttl-injection-mode.Fixed'),
                  content: <FixedDataDialog {...{ config }} />,
                },
                [InjectionModeEnum.Binding]: {
                  color: 'warning',
                  icon: <CommitIcon />,
                  tooltip: t('widgets:ttl-injection-mode.Binding'),
                  content: (
                    <SourceSelect
                      {...{ dataPropName, paths, widget }}
                      value={dataSourceIndexes}
                      onChange={(dataPropName, value) =>
                        onFieldBinding('propMapping', dataPropName, value)
                      }
                    />
                  ),
                },
              }}
            />
          )}

          {propItems.map(({ propPath, definition }) => (
            <PropItem
              {...{ config, definition, paths, propPath, widget, onChange }}
              key={propPath}
              disableBinding={!dataSourceIndexes}
              classes={{ icon, row: classes.row }}
              onFieldBinding={(propPath, value) => {
                const [propName, baseName] = _toPath(propPath).reverse();

                onFieldBinding(
                  baseName ? `${baseName}.propMapping` : 'propMapping',
                  propName,
                  value
                );
              }}
            />
          ))}
        </>
      )}
    />
  );
}
