import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import _isEmpty from 'lodash/isEmpty';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import DataStructureList from '../DataStructureList';
import ElementNodeList from '../ElementNodeList';
import NodeCreateButton from './WidgetEditor.NodeCreateButton';
import PropsSettingList from '../PropsSettingList';
import { ViewModeEnum, type WidgetEditorProps } from './WidgetEditor.types';
import { upsertWidgetConfig } from '~web/services';
import { useChangeEvents } from './WidgetEditor.hooks';
import { useMainStyles } from './WidgetEditor.styles';
import { useNodeCreate, useWidgetRender } from '~web/hooks';

import {
  PortalWrapper,
  useTogglePortal,
  useTutorialMode,
  withCorePropsDefinition,
} from '~web/contexts';

import type {
  ConfigPaths,
  ComponentConfig,
  WidgetConfigs,
} from '../imports.types';

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
  const [editing, setEditing] = useState<ComponentConfig>();
  const [viewMode, setViewMode] = useState<ViewModeEnum>();
  const [settingNode, setSettingNode] = useState<ConfigPaths>([]);

  const [value, setValue] = useState<WidgetConfigs>(() =>
    !config ? {} : JSON.parse(JSON.stringify(config))
  );

  const { t } = useTranslation();
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useMainStyles({ marginTop });
  const isValueEmpty = _isEmpty(value);

  const { containerEl, onToggle } = useTogglePortal(() =>
    setViewMode(undefined)
  );

  const { onDeleteNode, onConfigChange, onStructureChange, ...changeEvents } =
    useChangeEvents(value, setValue);

  const withNodeCreateButton = useNodeCreate(
    NodeCreateButton,
    value.dataStructure,
    viewMode === ViewModeEnum.Preview,
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

  return (
    <>
      <Slide in direction="up" timeout={1200}>
        <Container disableGutters className={classes.root} maxWidth={maxWidth}>
          <PortalWrapper
            WrapperComponent={Toolbar}
            containerEl={toolbarEl}
            variant="dense"
          >
            {viewMode === ViewModeEnum.Preview ? (
              <Tooltip title={t('btn-undo')}>
                <IconButton
                  color="primary"
                  size="large"
                  onClick={() => setViewMode(undefined)}
                >
                  <Core.Icon code="faUndo" />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                {!isValueEmpty && (
                  <Tooltip title={t('widgets:btn-widget-settings')}>
                    <IconButton
                      color="primary"
                      size="large"
                      onClick={() => onToggle(true)}
                    >
                      <Core.Icon code="faCode" />
                    </IconButton>
                  </Tooltip>
                )}

                <Tooltip title={t('widgets:btn-data-structure')}>
                  <IconButton
                    color="primary"
                    size="large"
                    onClick={() =>
                      startTransition(() => {
                        onToggle(true);
                        setViewMode(ViewModeEnum.DataStructure);
                      })
                    }
                  >
                    <Core.Icon code="faDatabase" />
                  </IconButton>
                </Tooltip>

                <Tooltip title={t('widgets:btn-widget-preview')}>
                  <IconButton
                    color="primary"
                    size="large"
                    onClick={() => setViewMode(ViewModeEnum.Preview)}
                  >
                    <Core.Icon code="faEye" />
                  </IconButton>
                </Tooltip>
              </>
            )}

            {!isValueEmpty && (
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
            )}
          </PortalWrapper>

          <Container
            disableGutters
            className={classes.content}
            onContextMenu={(e) => e.preventDefault()}
          >
            {value.component ? (
              generate(value, { dataStructure: value.dataStructure })
            ) : (
              <NodeCreateButton
                variant="node"
                onCreate={(component) => setValue({ ...value, component })}
              />
            )}
          </Container>
        </Container>
      </Slide>

      <PortalWrapper containerEl={containerEl}>
        {viewMode === ViewModeEnum.DataStructure && (
          <DataStructureList
            value={value.dataStructure || []}
            onChange={onStructureChange}
            onClose={() => onToggle(false)}
          />
        )}

        {!viewMode && (
          <>
            {!editing ? (
              <ElementNodeList
                active={activeNode}
                config={value}
                onActive={(paths) => setActiveNode(paths)}
                onClose={() => onToggle(false)}
                onDelete={({ paths }) =>
                  startTransition(() => {
                    const last = paths[paths.length - 1];
                    const index = typeof last === 'string' ? -1 : -2;

                    onDeleteNode(paths);
                    onToggle(paths.length > 0);
                    setActiveNode(paths.slice(0, index));
                  })
                }
                onEdit={({ target, paths }) =>
                  startTransition(() => {
                    onToggle(true);
                    setSettingNode(paths);
                    setEditing(target);
                  })
                }
              />
            ) : (
              <PropsSettingList
                config={editing}
                paths={settingNode}
                widget={value as WidgetConfigs}
                onChange={onConfigChange}
                onClose={() => setEditing(undefined)}
              />
            )}
          </>
        )}
      </PortalWrapper>
    </>
  );
});
