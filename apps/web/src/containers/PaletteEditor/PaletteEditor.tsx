import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Slide from '@mui/material/Slide';
import { Display } from '@weavcraft/core';
import { useState, useTransition } from 'react';

import { PaletteViewer, type PaletteColor } from '~web/components';
import { PortalWrapper, useTogglePortal } from '~web/contexts';
import { useEditorStyles } from './PaletteEditor.styles';
import type { PaletteEditorProps } from './PaletteEditor.types';

export default function PaletteEditor({
  config,
  maxWidth,
  size,
}: PaletteEditorProps) {
  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<PaletteColor[]>();
  const [value, setValue] = useState(config);

  const { classes } = useEditorStyles();

  const { containerEl, onToggle } = useTogglePortal(() =>
    setEditing(undefined)
  );

  return (
    <Slide in direction="up" timeout={1200}>
      <Container disableGutters maxWidth={maxWidth}>
        <PaletteViewer
          disableResponsiveText
          config={value}
          size={size}
          onColorClick={(e) =>
            startTransition(() => {
              setEditing(e);
              onToggle(true);
            })
          }
        />

        <PortalWrapper containerEl={containerEl}>
          <List
            className={classes.list}
            subheader={
              <>
                <ListSubheader>
                  <ListItemIcon>
                    <IconButton onClick={() => onToggle(false)}>
                      <Display.Icon code="faAngleRight" />
                    </IconButton>
                  </ListItemIcon>
                </ListSubheader>

                <Divider />
              </>
            }
          ></List>
        </PortalWrapper>
      </Container>
    </Slide>
  );
}
