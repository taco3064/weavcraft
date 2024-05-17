import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import AppendNode from './WidgetEditor.AppendNode';
import { useMainStyles } from './WidgetEditor.styles';
import { useWidgetRender, type RenderConfig } from '~web/hooks';
import { usePropsDefinition, withPropsDefinition } from '~web/contexts';
import { useNodePropsEditedOverride } from './WidgetEditor.hooks';
import type { WidgetConfigs, WidgetType } from '~web/services';
import type { WidgetEditorProps } from './WidgetEditor.types';

import {
  PortalWrapper,
  usePalettePreview,
  useTogglePortal,
  useTutorialMode,
} from '~web/contexts';

export default withPropsDefinition<WidgetEditorProps>(function WidgetEditor({
  config,
  marginTop,
  maxWidth,
  title,
  toolbarEl,
}) {
  const isTutorialMode = useTutorialMode();

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useMainStyles({ marginTop });

  const [value, setValue] = useState<RenderConfig>(() =>
    !config ? {} : JSON.parse(JSON.stringify(config))
  );

  const overrideNodeProps = useNodePropsEditedOverride(AppendNode, () =>
    setValue({ ...value })
  );

  const generate = useWidgetRender((WidgetEl, { key, props, config }) => (
    <WidgetEl key={key} {...overrideNodeProps(props, config)} />
  ));

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

        {generate(value)}
      </Container>
    </Slide>
  );
});
