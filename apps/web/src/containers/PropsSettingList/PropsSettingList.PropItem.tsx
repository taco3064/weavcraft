import CommitIcon from '@mui/icons-material/Commit';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import _get from 'lodash/get';
import _toPath from 'lodash/toPath';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { Get } from 'type-fest';
import type { PrimitiveValueProp } from '@weavcraft/common';

import BindingSelect from './PropsSettingList.BindingSelect';
import { PrimitiveField, SwitchListItem } from '~web/components';
import { PropItemModeEnum } from './PropsSettingList.types';
import { useCorePropsGetter } from '~web/contexts';
import type { DataFieldIndexes, PropItemProps } from './PropsSettingList.types';
import type { MappingPath } from '../imports.types';

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
  const getCoreProps = useCorePropsGetter();
  const { t } = useTranslation();

  const { bindable, bindingSourcePaths } = useMemo(() => {
    const [propName, baseName] = _toPath(propPath).reverse();

    const { definition } = getCoreProps(config.widget);
    const { dataBindingProps = {} } = definition;

    const mappingPath = (
      baseName ? `${baseName}.propMapping` : 'propMapping'
    ) as MappingPath;

    const mappingProps: string[] =
      _get(dataBindingProps || {}, [mappingPath, 'definition']) || [];

    return {
      bindable: mappingProps.includes(propName),
      bindingSourcePaths: ['props', mappingPath, 'value', propName],
    };
  }, [propPath, config.widget, getCoreProps]);

  const defaultPropValue = _get(config, ['props', propPath, 'value']) as Get<
    PrimitiveValueProp,
    ['value']
  >;

  const dataFieldIndexes = _get(config, bindingSourcePaths) as
    | DataFieldIndexes
    | undefined;

  const disabled = !bindable || disableBinding;

  const [mode, setMode] = useState<PropItemModeEnum>(() =>
    dataFieldIndexes
      ? PropItemModeEnum.PropMapping
      : PropItemModeEnum.DefaultValue
  );

  useEffect(() => {
    if (disabled) {
      setMode(PropItemModeEnum.DefaultValue);
    }
  }, [disabled]);

  return (
    <SwitchListItem
      active={mode}
      classes={classes}
      disabled={disabled}
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
