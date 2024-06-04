import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import NodeCreateButton from './WidgetEditor.NodeCreateButton';
import NodeList from './WidgetEditor.NodeList';
import SettingTabs from './WidgetEditor.SettingTabs';
import { useChangeEvents, useNodeCreate } from './WidgetEditor.hooks';
import { useMainStyles } from './WidgetEditor.styles';
import { useWidgetRender } from '~web/hooks';
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
  const [activeNode, setActiveNode] = useState<ConfigPaths>([]);
  const [activePrimitive, setActivePrimitive] = useState<ConfigPaths>([]);

  const [portalMode, setPortalMode] = useState<'treeView' | 'setting'>(
    'treeView'
  );

  const [value, setValue] = useState<RenderConfig>(() =>
    !config ? {} : JSON.parse(JSON.stringify(config))
  );

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { containerEl, onToggle } = useTogglePortal();
  const { classes } = useMainStyles({ marginTop });

  const { onDeleteNode, onConfigChange, ...changeEvents } = useChangeEvents(
    value,
    setValue
  );

  const withAppendNode = useNodeCreate(NodeCreateButton, changeEvents);

  const generate = useWidgetRender((WidgetEl, { config, key, props }) => (
    <WidgetEl key={key} {...withAppendNode(props, config)} />
  ));

  return (
    <Slide in direction="up" timeout={1200}>
      <Container disableGutters className={classes.root} maxWidth={maxWidth}>
        <PortalWrapper
          WrapperComponent={Toolbar}
          containerEl={toolbarEl}
          variant="dense"
        >
          <Tooltip title={t('widgets:btn-widget-structure')}>
            <IconButton
              size="large"
              disabled={!value.widget}
              onClick={() => onToggle(true)}
            >
              <Core.Icon code="faCode" />
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
            <NodeList
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
                  setPortalMode('setting');
                  setEditing(target);
                })
              }
            />
          )}

          {portalMode === 'setting' && (
            <SettingTabs
              config={editing}
              paths={activePrimitive}
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
