import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import DataStructureList from '../DataStructureList';
import ElementNodeList from '../ElementNodeList';
import NodeCreateButton from './WidgetEditor.NodeCreateButton';
import PropsSettingList from '../PropsSettingList';
import { upsertWidgetConfig } from '~web/services';
import { useChangeEvents, useNodeCreateButton } from './WidgetEditor.hooks';
import { useMainStyles } from './WidgetEditor.styles';
import { useWidgetRender } from '~web/hooks';

import {
  EditModeEnum,
  ViewModeEnum,
  type WidgetEditorProps,
} from './WidgetEditor.types';

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

  const [editMode, setEditMode] = useState<EditModeEnum>(
    EditModeEnum.ElementNode
  );

  const [value, setValue] = useState<WidgetConfigs>(() =>
    !config ? {} : JSON.parse(JSON.stringify(config))
  );

  const { t } = useTranslation();
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useMainStyles({ marginTop });

  const { containerEl, onToggle } = useTogglePortal(() =>
    setViewMode(undefined)
  );

  const { onDeleteNode, onConfigChange, onStructureChange, ...changeEvents } =
    useChangeEvents(value, setValue);

  const withNodeCreateButton = useNodeCreateButton(
    NodeCreateButton,
    value.dataStructure,
    viewMode === ViewModeEnum.Preview,
    changeEvents
  );

  const generate = useWidgetRender(
    value.dataStructure || [],
    (WidgetEl, { config, key, props }) => (
      <WidgetEl key={key} {...withNodeCreateButton(props, config)} />
    )
  );

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
    <Slide in direction="up" timeout={1200}>
      <Container disableGutters className={classes.root} maxWidth={maxWidth}>
        <PortalWrapper
          WrapperComponent={Toolbar}
          containerEl={toolbarEl}
          variant="dense"
        >
          {viewMode !== ViewModeEnum.Preview && (
            <>
              <Tooltip title={t('widgets:btn-widget-settings')}>
                <IconButton
                  color="primary"
                  size="large"
                  onClick={() => onToggle(true)}
                >
                  <Core.Icon code="faCode" />
                </IconButton>
              </Tooltip>

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
            </>
          )}

          <Tooltip
            title={
              viewMode === ViewModeEnum.Preview
                ? t('btn-undo')
                : t('widgets:btn-widget-preview')
            }
          >
            <IconButton
              color="primary"
              size="large"
              onClick={() =>
                setViewMode(
                  viewMode === ViewModeEnum.Preview
                    ? undefined
                    : ViewModeEnum.Preview
                )
              }
            >
              <Core.Icon
                code={viewMode === ViewModeEnum.Preview ? 'faUndo' : 'faEye'}
              />
            </IconButton>
          </Tooltip>

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

        <Container
          disableGutters
          className={classes.content}
          onContextMenu={(e) => e.preventDefault()}
        >
          {value.component ? (
            generate(value)
          ) : (
            <NodeCreateButton
              variant="node"
              onClick={(component) => setValue({ ...value, component })}
            />
          )}

          <PortalWrapper containerEl={containerEl}>
            {viewMode === ViewModeEnum.DataStructure ? (
              <DataStructureList
                value={value.dataStructure || []}
                onChange={onStructureChange}
                onClose={() => onToggle(false)}
              />
            ) : (
              <>
                {editMode === EditModeEnum.ElementNode && (
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
                        setSettingNode(paths);
                        setEditMode(EditModeEnum.PropsSetting);
                        setEditing(target);
                      })
                    }
                  />
                )}

                {editMode === EditModeEnum.PropsSetting && editing && (
                  <PropsSettingList
                    config={editing}
                    paths={settingNode}
                    widget={value as WidgetConfigs}
                    onChange={onConfigChange}
                    onClose={() =>
                      startTransition(() => {
                        setEditMode(EditModeEnum.ElementNode);
                        setEditing(undefined);
                      })
                    }
                  />
                )}
              </>
            )}
          </PortalWrapper>
        </Container>
      </Container>
    </Slide>
  );
});
