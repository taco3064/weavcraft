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

import ElementNodeList from '../ElementNodeList';
import NodeCreateButton from './WidgetEditor.NodeCreateButton';
import PropsSettingTabs, { type ConfigType } from '../PropsSettingTabs';
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
  withPropsDefinition,
} from '~web/contexts';

export default withPropsDefinition(function WidgetEditor({
  config,
  marginTop,
  maxWidth,
  title,
  toolbarEl,
}: WidgetEditorProps) {
  const isTutorialMode = useTutorialMode();

  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<RenderConfig>();
  const [previewMode, setPreviewMode] = useState(false);
  const [activeNode, setActiveNode] = useState<ConfigPaths>([]);
  const [activeProps, setActiveProps] = useState<ConfigType>('PrimitiveValue');
  const [activePrimitive, setActivePrimitive] = useState<ConfigPaths>([]);

  const [portalMode, setPortalMode] = useState<'treeView' | 'setting'>(
    'treeView'
  );

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

  const withAppendNode = useNodeCreateButton(
    NodeCreateButton,
    previewMode,
    changeEvents
  );

  const generate = useWidgetRender((WidgetEl, { config, key, props }) => (
    <WidgetEl key={key} {...withAppendNode(props, config)} />
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
          {!previewMode && value.widget && (
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

          {value.widget && (
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
        </Container>

        <PortalWrapper containerEl={containerEl}>
          {portalMode === 'treeView' && (
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
                  setActiveProps('PrimitiveValue');
                  setPortalMode('setting');
                  setEditing(target);
                })
              }
            />
          )}

          {portalMode === 'setting' && (
            <PropsSettingTabs
              active={activeProps}
              config={editing}
              paths={activePrimitive}
              onActiveChange={setActiveProps}
              onChange={onConfigChange}
              onClose={() =>
                startTransition(() => {
                  setPortalMode('treeView');
                  setEditing(undefined);
                })
              }
            />
          )}
        </PortalWrapper>
      </Container>
    </Slide>
  );
});
