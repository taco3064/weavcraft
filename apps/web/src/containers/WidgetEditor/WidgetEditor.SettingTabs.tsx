import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Fade from '@mui/material/Fade';
import ListItem from '@mui/material/ListItem';
import StorageIcon from '@mui/icons-material/Storage';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import PrimitiveList from './WidgetEditor.PrimitiveList';
import { EditorList } from '~web/components';
import { usePathDescription } from '~web/hooks';
import { useSettingStyles } from './WidgetEditor.styles';
import type { ConfigType, SettingTabsProps } from './WidgetEditor.types';

export default function SettingTabs({
  config,
  paths,
  onChange,
  onClose,
}: SettingTabsProps) {
  const description = usePathDescription(paths);
  const [active, setActive] = useState<ConfigType>('PrimitiveValue');

  const { t } = useTranslation();
  const { classes } = useSettingStyles();

  return !config ? null : (
    <EditorList
      {...{ description, onClose }}
      title={t('widgets:ttl-settings', { widget: config.widget })}
      render={(editorClasses) => (
        <ListItem disableGutters disablePadding className={classes.root}>
          <Tabs
            centered
            className={classes.tabs}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            value={active}
            onChange={(_e, value) => setActive(value)}
          >
            <Tab
              iconPosition="start"
              icon={<AutoAwesomeIcon />}
              value="PrimitiveValue"
              label={t('widgets:lbl-settings.primitive-value')}
            />

            <Tab
              iconPosition="start"
              icon={<StorageIcon />}
              value="DataBinding"
              label={t('widgets:lbl-settings.data-binding')}
            />
          </Tabs>

          {active === 'PrimitiveValue' && (
            <Fade in>
              <PrimitiveList
                {...{ config, onChange }}
                classes={{ ...editorClasses, row: classes.row }}
              />
            </Fade>
          )}

          {active === 'DataBinding' && (
            <Fade in>
              <div />
            </Fade>
          )}
        </ListItem>
      )}
    />
  );
}
