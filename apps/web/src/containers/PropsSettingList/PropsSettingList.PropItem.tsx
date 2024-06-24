import CommitIcon from '@mui/icons-material/Commit';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import BindingSelect from './PropsSettingList.BindingSelect';
import { PrimitiveField, SwitchListItem } from '~web/components';
import { PropItemModeEnum, type PropItemProps } from './PropsSettingList.types';
import { usePropItem } from './PropsSettingList.hooks';

export default function PropItem({
  classes,
  config,
  disableBinding,
  definition,
  paths,
  propPath,
  widget,
  onChange,
  onFieldBinding,
}: PropItemProps) {
  const { t } = useTranslation();

  const { bindable, defaultPropValue, dataFieldIndexes } = usePropItem({
    config,
    propPath,
  });

  const [mode, setMode] = useState<PropItemModeEnum>(() =>
    dataFieldIndexes
      ? PropItemModeEnum.PropMapping
      : PropItemModeEnum.DefaultValue
  );

  return (
    <SwitchListItem
      active={mode}
      classes={classes}
      disabled={disableBinding || !bindable}
      onActiveChange={setMode}
      options={{
        [PropItemModeEnum.DefaultValue]: {
          color: 'info',
          icon: <SettingsOutlinedIcon />,
          tooltip: t('widgets:ttl-prop-item-mode.DefaultValue'),
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
        [PropItemModeEnum.PropMapping]: {
          color: 'warning',
          icon: <CommitIcon />,
          tooltip: t('widgets:ttl-prop-item-mode.PropMapping'),
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
