import CommitIcon from '@mui/icons-material/Commit';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import _get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import type { Get } from 'type-fest';
import type { PrimitiveValueProp } from '@weavcraft/common';

import BindingSelect from './PropsSettingList.BindingSelect';
import { PrimitiveField, SwitchListItem } from '~web/components';
import { SettingModeEnum } from './PropsSettingList.types';
import { usePropItemStatus } from './PropsSettingList.hooks';
import type { PropItemProps } from './PropsSettingList.types';

export default function PropItem({
  classes,
  config,
  definition,
  paths,
  propPath,
  sourceMode,
  widget,
  onChange,
  onFieldBinding,
}: PropItemProps) {
  const { component } = config;
  const { t } = useTranslation();

  const { dataFieldIndexes, disabledModeSwitch, mode, onModeChange } =
    usePropItemStatus({ config, propPath, sourceMode });

  const defaultPropValue = _get(config, ['props', propPath, 'value']) as Get<
    PrimitiveValueProp,
    ['value']
  >;

  return (
    <SwitchListItem
      active={mode}
      classes={classes}
      disabled={disabledModeSwitch}
      onActiveChange={onModeChange}
      options={{
        [SettingModeEnum.DefaultValue]: {
          color: 'info',
          icon: <SettingsOutlinedIcon />,
          tooltip: t('widgets:ttl-setting-mode.DefaultValue'),
          content: (
            <PrimitiveField
              definition={definition}
              label={propPath}
              size="small"
              variant="outlined"
              value={defaultPropValue}
              onChange={(value) =>
                onChange(config, propPath, {
                  type: 'PrimitiveValue',
                  value,
                })
              }
            />
          ),
        },
        [SettingModeEnum.PropMapping]: {
          color: 'warning',
          icon: <CommitIcon />,
          tooltip: t('widgets:ttl-setting-mode.PropMapping'),
          content: (
            <BindingSelect
              {...{ config, paths, propPath, widget, onFieldBinding }}
              value={dataFieldIndexes}
            />
          ),
        },
      }}
    />
  );
}
