import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Button from '@mui/material/Button';
import CommitIcon from '@mui/icons-material/Commit';
import EditIcon from '@mui/icons-material/Edit';
import _toPath from 'lodash/toPath';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import PropItem from './PropsSettingList.PropItem';
import SourceSelect from './PropsSettingList.SourceSelect';
import { EditorList, SwitchListItem } from '~web/components';
import { useMainStyles } from './PropsSettingList.styles';
import { useSetting } from './PropsSettingList.hooks';
import { useNodePaths } from '~web/hooks';

import {
  InjectionModeEnum,
  type PropsSettingListProps,
} from './PropsSettingList.types';

export default function PropsSettingList({
  config,
  paths,
  widget,
  onChange,
  onClose,
}: PropsSettingListProps) {
  const { t } = useTranslation();
  const { classes } = useMainStyles();
  const { pathDescription } = useNodePaths(paths);

  const { dataPropName, dataSourceIndexes, propItems, onFieldBinding } =
    useSetting({ config, onChange });

  const [mode, setMode] = useState<InjectionModeEnum>(() =>
    dataSourceIndexes ? InjectionModeEnum.Binding : InjectionModeEnum.Fixed
  );

  return (
    <EditorList
      description={pathDescription}
      icon={<AutoAwesomeIcon color="primary" />}
      onClose={onClose}
      title={t('widgets:ttl-widget-settings', {
        widget: t(`widgets:lbl-widgets.${config.widget}`),
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
                  content: (
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      size="large"
                    >
                      {t('widgets:btn-fixed-data')}
                    </Button>
                  ),
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
