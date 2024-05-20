import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { useSnackbar } from 'notistack';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import AppendNode from './WidgetEditor.AppendNode';
import Controller from './WidgetEditor.Controller';
import DefaultPropsProvider from './WidgetEditor.DefaultProps';
import { useMainStyles } from './WidgetEditor.styles';
import { useWidgetRender, type RenderConfig } from '~web/hooks';
import { useNodePropsEditedOverride } from './WidgetEditor.hooks';
import type { WidgetConfigs, WidgetType } from '~web/services';
import type { WidgetEditorProps } from './WidgetEditor.types';

import {
  PortalWrapper,
  usePropsDefinition,
  useTogglePortal,
  useTutorialMode,
  withPropsDefinition,
} from '~web/contexts';

export default withPropsDefinition<WidgetEditorProps>(function WidgetEditor({
  config,
  marginTop,
  maxWidth,
  title,
  toolbarEl,
}) {
  const isTutorialMode = useTutorialMode();

  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<RenderConfig>();

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useMainStyles({ marginTop });

  const { containerEl, onToggle } = useTogglePortal(() =>
    setEditing(undefined)
  );

  const [value, setValue] = useState<RenderConfig>(() =>
    !config ? {} : JSON.parse(JSON.stringify(config))
  );

  const overrideNodes = useNodePropsEditedOverride(AppendNode, () =>
    setValue({ ...value })
  );

  const generate = useWidgetRender(
    (WidgetEl, { config, key, paths, props }) => (
      <Controller
        key={key}
        config={config}
        onDelete={() => {
          if (!paths.length) {
            return setValue({} as RenderConfig);
          }

          const fullPaths = paths
            .map((path) =>
              typeof path === 'string' ? ['props', path, 'value'] : path
            )
            .flat();

          if (typeof paths[paths.length - 1] === 'number') {
            const index = fullPaths.pop() as number;
            const nodes = _get(value, fullPaths);

            nodes.splice(index, 1);
            _set(value, fullPaths, [...nodes]);
          } else {
            _unset(value, fullPaths);
          }

          setValue({ ...value });
        }}
        onEdit={() =>
          startTransition(() => {
            onToggle(true);
            setEditing(config);
          })
        }
      >
        <WidgetEl {...overrideNodes(props, config)} />
      </Controller>
    )
  );

  return (
    <Slide in direction="up" timeout={1200}>
      <Container disableGutters className={classes.root} maxWidth={maxWidth}>
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
            <DefaultPropsProvider>{generate(value)}</DefaultPropsProvider>
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
