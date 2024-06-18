import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import StorageIcon from '@mui/icons-material/Storage';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import ElementNodeList from '../ElementNodeList';
import NodeCreateButton from './WidgetEditor.NodeCreateButton';
import PropItems from './WidgetEditor.PropItems';
import { upsertWidgetConfig, type WidgetConfigs } from '~web/services';
import { useChangeEvents, useNodeCreateButton } from './WidgetEditor.hooks';
import { useWidgetRender } from '~web/hooks';
import { useMainStyles } from './WidgetEditor.styles';
import type { ConfigPaths, RenderConfig } from '~web/hooks';
import type { WidgetEditorProps } from './WidgetEditor.types';

import {
  PortalWrapper,
  useTogglePortal,
  useTutorialMode,
  withCorePropsDefinition,
} from '~web/contexts';

export default withCorePropsDefinition(function WidgetEditor({
  config,
  marginTop,
  maxWidth,
  title,
  toolbarEl,
}: WidgetEditorProps) {
  const isTutorialMode = useTutorialMode();

  const [, startTransition] = useTransition();
  const [activeNode, setActiveNode] = useState<ConfigPaths>([]);
  const [activePrimitive, setActivePrimitive] = useState<ConfigPaths>([]);
  const [editing, setEditing] = useState<RenderConfig>();
  const [portalMode, setPortalMode] = useState<'tree' | 'props'>('tree');
  const [previewMode, setPreviewMode] = useState(false);
  const [tab, setTab] = useState<'node' | 'data-structure'>('node');

  const [value, setValue] = useState<RenderConfig>(() =>
    !config ? {} : JSON.parse(JSON.stringify(config))
  );

  const { t } = useTranslation();
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { containerEl, onToggle } = useTogglePortal();
  const { classes } = useMainStyles({ marginTop });

  const { onDeleteNode, onConfigChange, ...changeEvents } = useChangeEvents(
    value,
    setValue
  );

  const withNodeCreateButton = useNodeCreateButton(
    NodeCreateButton,
    previewMode,
    changeEvents
  );

  const generate = useWidgetRender((WidgetEl, { config, key, props }) => (
    <WidgetEl key={key} {...withNodeCreateButton(props, config)} />
  ));

  const { mutate: upsert } = useMutation({
    mutationFn: upsertWidgetConfig,
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
    onSuccess: () =>
      enqueueSnackbar(
        t(`msg-success-${!config ? 'create' : 'update'}`, { name: title }),
        { variant: 'success' }
      ),
  });

  // console.log(useDataStructure(value));

  return (
    <Slide in direction="up" timeout={1200}>
      <Container disableGutters className={classes.root} maxWidth={maxWidth}>
        <PortalWrapper
          WrapperComponent={Toolbar}
          containerEl={toolbarEl}
          variant="dense"
        >
          {tab === 'node' && value.widget && (
            <>
              {!previewMode && (
                <Tooltip title={t('widgets:btn-widget-structure')}>
                  <IconButton
                    color="primary"
                    size="large"
                    onClick={() => onToggle(true)}
                  >
                    <Core.Icon code="faCode" />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip
                title={
                  previewMode ? t('btn-undo') : t('widgets:btn-widget-preview')
                }
              >
                <IconButton
                  color="primary"
                  size="large"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  <Core.Icon code={previewMode ? 'faUndo' : 'faEye'} />
                </IconButton>
              </Tooltip>
            </>
          )}

          <Tooltip title={t('btn-save')}>
            <IconButton
              color="primary"
              size="large"
              onClick={() =>
                upsert({
                  hierarchyId: query.id as string,
                  input: value as WidgetConfigs,
                  isTutorialMode,
                })
              }
            >
              <Core.Icon code="faSave" />
            </IconButton>
          </Tooltip>
        </PortalWrapper>

        <Tabs
          centered
          className={classes.tabs}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          value={tab}
          onChange={(_e, value) => setTab(value)}
        >
          <Tab
            icon={<WidgetsIcon fontSize="large" />}
            iconPosition="top"
            value="node"
            label={t('widgets:lbl-settings.primitive-value')}
          />

          <Tab
            icon={<StorageIcon fontSize="large" />}
            iconPosition="top"
            value="DataBinding"
            label={t('widgets:lbl-settings.data-structure')}
          />
        </Tabs>

        {tab === 'node' && (
          <Container
            disableGutters
            className={classes.content}
            onContextMenu={(e) => e.preventDefault()}
          >
            {value.widget ? (
              generate(value)
            ) : (
              <NodeCreateButton
                variant="node"
                onClick={(widget) => setValue({ widget })}
              />
            )}

            <PortalWrapper containerEl={containerEl}>
              {portalMode === 'tree' && (
                <ElementNodeList
                  active={activeNode}
                  config={value}
                  onActive={(paths) => setActiveNode(paths)}
                  onClose={() => onToggle(false)}
                  onDelete={({ paths }) =>
                    startTransition(() => {
                      const active = paths.slice(
                        0,
                        typeof paths[paths.length - 1] === 'string' ? -1 : -2
                      );

                      onDeleteNode(paths);
                      onToggle(paths.length > 0);
                      setActiveNode(active);
                    })
                  }
                  onEdit={({ target, paths }) =>
                    startTransition(() => {
                      onToggle(true);
                      setActivePrimitive(paths);
                      setPortalMode('props');
                      setEditing(target);
                    })
                  }
                />
              )}

              {portalMode === 'props' && editing && (
                <PropItems
                  config={editing}
                  paths={activePrimitive}
                  widget={value as WidgetConfigs}
                  onChange={onConfigChange}
                  onClose={() =>
                    startTransition(() => {
                      setPortalMode('tree');
                      setEditing(undefined);
                    })
                  }
                />
              )}
            </PortalWrapper>
          </Container>
        )}
      </Container>
    </Slide>
  );
});
