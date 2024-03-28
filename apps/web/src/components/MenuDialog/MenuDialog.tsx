import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import NextLink from 'next/link';
import { Trans } from 'react-i18next';

import { useDialogStyles } from './MenuDialog.styles';
import type { MenuDialogProps } from './MenuDialog.types';

export default function MenuDialog({
  indicator,
  items,
  open,
  title,
  onClose,
  onItemClick,
}: MenuDialogProps) {
  const { classes } = useDialogStyles();

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      {!indicator && !title ? null : (
        <DialogTitle>
          {indicator}
          {title && <Trans i18nKey={title} />}
        </DialogTitle>
      )}

      <DialogContent className={classes.content}>
        <MenuList>
          {items.map((item, i) => {
            if (!item) {
              return null;
            } else if (item === 'divider') {
              return <Divider key="divider" />;
            }

            const { href, indicator, label } = item;

            return (
              <MenuItem
                {...(href && { component: NextLink, href })}
                key={label}
                className={classes.item}
                onClick={() => {
                  onItemClick?.(label);
                  onClose();
                }}
              >
                {indicator && <ListItemIcon>{indicator}</ListItemIcon>}
                <ListItemText primary={<Trans i18nKey={label} />} />
              </MenuItem>
            );
          })}
        </MenuList>
      </DialogContent>

      <DialogActions>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
          onClick={onClose}
        >
          <Trans i18nKey="app:btn-close" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}
