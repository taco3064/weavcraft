import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { useMainStyles } from './WidgetEditor.styles';
import type { WidgetConfigs } from '~web/services';
import type { WidgetEditorProps } from './WidgetEditor.types';

import {
  PortalWrapper,
  usePalettePreview,
  useTogglePortal,
  useTutorialMode,
} from '~web/contexts';

export default function WidgetEditor({
  config,
  marginTop,
  maxWidth,
  title,
  toolbarEl,
}: WidgetEditorProps) {
  const isTutorialMode = useTutorialMode();

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { classes } = useMainStyles({ marginTop });

  const [value, setValue] = useState<Partial<WidgetConfigs>>(() =>
    !config ? {} : JSON.parse(JSON.stringify(config))
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
      </Container>
    </Slide>
  );
}
