import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import AppendNode from './WidgetEditor.AppendNode';
import Structure from './WidgetEditor.Structure';
import { useMainStyles } from './WidgetEditor.styles';
import { useWidgetRender } from '~web/hooks';
import type { ConfigPaths, RenderConfig } from '~web/hooks';
import type { WidgetEditorProps } from './WidgetEditor.types';

import {
  useChangeEvents,
  useNodePropsEditedOverride,
} from './WidgetEditor.hooks';

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
  const [active, setActive] = useState<ConfigPaths>([]);
  const [portalMode, setPortalMode] = useState<'treeView' | 'props'>();

  const [value, setValue] = useState<RenderConfig>(() =>
    !config ? {} : JSON.parse(JSON.stringify(config))
  );

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useMainStyles({ marginTop });
  const { onDeleteNode, ...changeEvents } = useChangeEvents(value, setValue);

  const { containerEl, onToggle } = useTogglePortal(() =>
    setEditing(undefined)
  );

  const overrideNodes = useNodePropsEditedOverride(AppendNode, changeEvents);

  const generate = useWidgetRender((WidgetEl, { config, key, props }) => (
    <WidgetEl key={key} {...overrideNodes(props, config)} />
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
              onClick={() =>
                startTransition(() => {
                  onToggle(true);
                  setPortalMode('treeView');
                })
              }
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
            <AppendNode
              variant="node"
              onAppend={(widget) => setValue({ widget })}
            />
          )}
        </Container>

        <PortalWrapper containerEl={containerEl}>
          {portalMode === 'treeView' && (
            <Structure
              config={value}
              active={active}
              onActive={(paths) => setActive(paths)}
              onDelete={({ paths }) =>
                startTransition(() => {
                  const active = paths.slice(
                    0,
                    typeof paths[paths.length - 1] === 'string' ? -1 : -2
                  );

                  onDeleteNode(paths);
                  onToggle(paths.length > 0);
                  setActive(active);
                })
              }
              onEdit={({ target }) =>
                startTransition(() => {
                  onToggle(true);
                  setPortalMode('props');
                  setEditing(target);
                })
              }
              action={
                <IconButton size="large" onClick={() => onToggle(false)}>
                  <Core.Icon code="faAngleRight" />
                </IconButton>
              }
            />
          )}
        </PortalWrapper>
      </Container>
    </Slide>
  );
});
