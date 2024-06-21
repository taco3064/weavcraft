import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CommitIcon from '@mui/icons-material/Commit';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { Fragment, useState } from 'react';
import { useTranslation } from 'next-i18next';

import PropItem from './PropsSettingList.PropItem';
import { EditorList, SwitchListItem } from '~web/components';
import { useMainStyles } from './PropsSettingList.styles';
import { useSettingOptions } from './PropsSettingList.hooks';
import { useWidgetNodePaths } from '~web/hooks';

import {
  InjectionMode,
  type PropsSettingListProps,
} from './PropsSettingList.types';

export default function PropsSettingList({
  config,
  paths,
  widget,
  onChange,
  onClose,
}: PropsSettingListProps) {
  const [mode, setMode] = useState<InjectionMode>(InjectionMode.Fixed);

  const { t } = useTranslation();
  const { classes } = useMainStyles();
  const { pathDescription } = useWidgetNodePaths(paths);

  const { dataSrcPath, injectedPath, propItems, onSourceBinding } =
    useSettingOptions({
      config,
      onChange,
    });

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
          {injectedPath && (
            <SwitchListItem
              divider
              active={mode}
              classes={{ icon, row: classes.row }}
              onActiveChange={setMode}
              options={{
                [InjectionMode.Fixed]: {
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
                [InjectionMode.Binding]: {
                  color: 'warning',
                  icon: <CommitIcon />,
                  tooltip: t('widgets:ttl-injection-mode.Binding'),
                  content: (
                    <TextField
                      fullWidth
                      select
                      variant="filled"
                      size="small"
                      color="secondary"
                      label={t('widgets:lbl-data-source-path')}
                      value={dataSrcPath}
                      onChange={(e) =>
                        onSourceBinding(
                          'propMapping',
                          injectedPath,
                          e.target.value
                        )
                      }
                      SelectProps={{
                        displayEmpty: true,
                        IconComponent: Fragment,
                      }}
                      InputProps={{
                        disableUnderline: false,
                        endAdornment: (
                          <InputAdornment position="end">
                            {!dataSrcPath ? (
                              <ArrowDropDownIcon />
                            ) : (
                              <Tooltip title={t('btn-reset')}>
                                <IconButton
                                  onClick={() =>
                                    onSourceBinding('propMapping', injectedPath)
                                  }
                                >
                                  <CloseIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  ),
                },
              }}
            />
          )}

          {propItems.map(({ propPath, definition }) => (
            <PropItem
              {...{ config, definition, propPath, onChange }}
              key={propPath}
              disableBinding={!dataSrcPath}
              classes={{ icon, row: classes.row }}
            />
          ))}
        </>
      )}
    />
  );
}
