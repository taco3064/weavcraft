import Core from '@weavcraft/core';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import { useMainStyles } from './EditorList.styles';
import type { EditorListProps } from './EditorList.types';

export default function EditorList({
  className,
  description,
  icon,
  title,
  render,
  renderCloseButton,
  onClose,
}: EditorListProps) {
  const { classes, cx } = useMainStyles();

  return (
    <Fade in timeout={1200}>
      <List
        className={cx(classes.root, className)}
        subheader={
          <ListSubheader className={classes.subheader}>
            {(icon || onClose) && (
              <ListItemIcon className={classes.icon}>
                {icon || (
                  <IconButton size="large" onClick={onClose}>
                    <Core.Icon code="faAngleRight" />
                  </IconButton>
                )}
              </ListItemIcon>
            )}

            <ListItemText
              primary={title}
              secondary={description}
              primaryTypographyProps={{
                variant: 'h6',
                color: 'text.primary',
                display: 'row',
                fontWeight: 600,
              }}
              secondaryTypographyProps={{
                variant: 'caption',
                color: 'text.secondary',
                display: 'row',
              }}
            />

            {icon && (
              <>
                {renderCloseButton?.({ onClose })}

                {!renderCloseButton && onClose && (
                  <IconButton size="large" onClick={onClose}>
                    <Core.Icon code="faClose" />
                  </IconButton>
                )}
              </>
            )}
          </ListSubheader>
        }
      >
        {render(classes)}
      </List>
    </Fade>
  );
}
