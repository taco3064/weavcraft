import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import _set from 'lodash/set';
import { Display } from '@weavcraft/core';
import { useTranslation } from 'next-i18next';
import { useState, useTransition } from 'react';

import ColorEditor from './PaletteEditor.ColorEditor';
import { PaletteViewer } from '~web/components';
import { PortalWrapper, useTogglePortal } from '~web/contexts';
import { useMainStyles } from './PaletteEditor.styles';
import type { ColorName } from '~web/components';
import type { ThemePalette } from '~web/services';

import type { PaletteEditorProps } from './PaletteEditor.types';

export default function PaletteEditor({
  config,
  maxWidth,
  size,
  toolbarEl,
}: PaletteEditorProps) {
  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<ColorName[]>();

  const [value, setValue] = useState<Partial<ThemePalette>>(() =>
    !config ? {} : JSON.parse(JSON.stringify(config))
  );

  const { t } = useTranslation();
  const { classes } = useMainStyles({ size });

  const { containerEl, onToggle } = useTogglePortal(() =>
    setEditing(undefined)
  );

  console.log(editing?.join('|'), containerEl);

  return (
    <Slide in direction="left" timeout={1200}>
      <Container className={classes.root} maxWidth={maxWidth}>
        <PortalWrapper
          WrapperComponent={Toolbar}
          containerEl={toolbarEl}
          variant="dense"
        >
          <Tooltip title={t('btn-save')}>
            <IconButton color="primary" size="large">
              <Display.Icon code="faSave" />
            </IconButton>
          </Tooltip>
        </PortalWrapper>

        <PaletteViewer
          disableResponsiveText
          config={value}
          size={size}
          onColorClick={(e) =>
            startTransition(() => {
              setEditing(e.map(({ name }) => name));
              onToggle(true);
            })
          }
        />

        <PortalWrapper containerEl={containerEl}>
          <ColorEditor
            items={editing}
            value={value}
            action={
              <IconButton onClick={() => onToggle(false)}>
                <Display.Icon code="faAngleRight" />
              </IconButton>
            }
            onChange={({ name, color }) =>
              setValue({ ..._set(value, name, color?.toUpperCase()) })
            }
          />
        </PortalWrapper>
      </Container>
    </Slide>
  );
}
