import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import { useEditorListStyles } from '~web/styles';
import type { EditorSubheaderProps } from './EditorSubheader.types';

export default function EditorSubheader({
  title,
  onClose,
}: EditorSubheaderProps) {
  const { classes } = useEditorListStyles();

  return (
    <>
      <ListSubheader>
        {onClose && (
          <ListItemIcon className={classes.icon}>
            <IconButton size="large" onClick={onClose}>
              <Core.Icon code="faAngleRight" />
            </IconButton>
          </ListItemIcon>
        )}

        <ListItemText
          primary={title}
          primaryTypographyProps={{
            variant: 'h6',
            color: 'text.primary',
            fontWeight: 600,
          }}
        />
      </ListSubheader>

      <Divider />
    </>
  );
}
