import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import BindingSelect from './PropsSettingList.BindingSelect';
import { PrimitiveField, SwitchListItem } from '~web/components';
import { PropItemMode, type PropItemProps } from './PropsSettingList.types';
import { usePropItemOptions } from './PropsSettingList.hooks';

export default function PropItem({
  classes,
  config,
  disableBinding,
  definition,
  propPath,
  onChange,
}: PropItemProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<PropItemMode>(PropItemMode.DefaultValue);

  const { defaultPropValue, fieldPath, mappable } = usePropItemOptions({
    config,
    propPath,
  });

  return (
    <SwitchListItem
      active={mode}
      classes={classes}
      disabled={disableBinding || !mappable}
      onActiveChange={setMode}
      options={{
        [PropItemMode.DefaultValue]: {
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
        [PropItemMode.PropMapping]: {
          color: 'success',
          icon: <StorageOutlinedIcon />,
          tooltip: t('widgets:ttl-prop-item-mode.PropMapping'),
          content: <BindingSelect />,
        },
      }}
    />
  );
}
