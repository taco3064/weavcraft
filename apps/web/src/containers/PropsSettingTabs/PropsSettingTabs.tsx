import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import ListItem from '@mui/material/ListItem';
import StorageIcon from '@mui/icons-material/Storage';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import FixedData from './PropsSettingTabs.FixedData';
import PrimitiveList from './PropsSettingTabs.PrimitiveList';
import PropMapping from './PropsSettingTabs.PropMapping';
import { EditorList } from '~web/components';
import { useMainStyles } from './PropsSettingTabs.styles';
import { useWidgetNodePaths } from '~web/hooks';
import type { PropsSettingTabsProps } from './PropsSettingTabs.types';

const ELEVATION = 4;

export default function PropsSettingTabs({
  active,
  config,
  paths,
  onActiveChange,
  onChange,
  onClose,
}: PropsSettingTabsProps) {
  const [expanded, setExpanded] = useState<number | 'data'>(0);

  const { t } = useTranslation();
  const { classes } = useMainStyles();
  const { pathDescription } = useWidgetNodePaths(paths);

  return !config ? null : (
    <EditorList
      title={t('widgets:ttl-settings', { widget: config.widget })}
      description={pathDescription}
      onClose={onClose}
      render={(editorClasses) => (
        <ListItem disableGutters disablePadding className={classes.root}>
          <Tabs
            centered
            className={classes.tabs}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            value={active}
            onChange={(_e, value) => onActiveChange(value)}
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
              <Container maxWidth={false}>
                <PropMapping
                  {...{ config, expanded, onChange }}
                  classes={{ ...editorClasses, row: classes.row }}
                  elevation={ELEVATION}
                  onExpand={setExpanded}
                />

                <FixedData
                  {...{ config, expanded, onChange }}
                  classes={{ ...editorClasses, row: classes.row }}
                  elevation={ELEVATION}
                  onExpand={setExpanded}
                />
              </Container>
            </Fade>
          )}
        </ListItem>
      )}
    />
  );
}
