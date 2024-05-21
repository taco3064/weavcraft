import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import _debounce from 'lodash/debounce';
import { useEffect, useId, useMemo, useState, useTransition } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'next-i18next';

import AppendNode from './WidgetEditor.AppendNode';
import Controller from './WidgetEditor.Controller';
import { useMainStyles } from './WidgetEditor.styles';
import { useWidgetRender, type RenderConfig } from '~web/hooks';
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
  const containerId = useId();

  const [, startTransition] = useTransition();
  const [hideController, setHideController] = useState(false);
  const [editing, setEditing] = useState<RenderConfig>();

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

  const resizeObserver = useMemo(() => {
    const refresh = _debounce(() => setHideController(false), 200);

    return new ResizeObserver(() => {
      setHideController(true);
      refresh();
    });
  }, []);

  const overrideNodes = useNodePropsEditedOverride(AppendNode, changeEvents);

  const generate = useWidgetRender(
    (WidgetEl, { config, key, paths, props }) => (
      <Controller
        key={key}
        {...{
          ...overrideNodes(props, config),
          'widget.editor.controller.props': {
            WidgetEl,
            config,
            hideToggle: hideController,
            onDelete: () => onDeleteNode(paths),
            onEdit: () =>
              startTransition(() => {
                onToggle(true);
                setEditing(config);
              }),
          },
        }}
      />
    )
  );

  useEffect(() => {
    const el = global.document.getElementById(containerId);

    if (el) {
      resizeObserver.observe(el);

      return () => resizeObserver.unobserve(el);
    }
  }, [containerId, resizeObserver]);

  return (
    <Slide in direction="up" timeout={1200}>
      <Container
        disableGutters
        id={containerId}
        className={classes.root}
        maxWidth={maxWidth}
      >
        <PortalWrapper
          WrapperComponent={Toolbar}
          containerEl={toolbarEl}
          variant="dense"
        >
          Toolbar
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
          Widget Props Editor
        </PortalWrapper>
      </Container>
    </Slide>
  );
});
