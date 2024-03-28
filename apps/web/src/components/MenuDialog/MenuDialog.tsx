import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import NextLink from 'next/link';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { Trans } from 'react-i18next';
import { Fragment, forwardRef, useState } from 'react';

import { useDialogStyles } from './MenuDialog.styles';
import type { MenuDialogProps, SubTransitionProps } from './MenuDialog.types';

const SubTransition = forwardRef(function Transition(
  props: SubTransitionProps,
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function MenuDialog({
  TransitionComponent,
  indicator,
  items,
  open,
  title,
  onClose,
  onItemClick,
}: MenuDialogProps) {
  const [subProps, setSubProps] =
    useState<Pick<MenuDialogProps, 'items' | 'title'>>();
  const { classes } = useDialogStyles();

  return (
    <>
      {!subProps?.items?.length ? null : (
        <MenuDialog
          TransitionComponent={SubTransition}
          items={subProps.items}
          open={Boolean(subProps.items.length)}
          title={subProps.title}
          onClose={() => setSubProps(undefined)}
          onItemClick={onItemClick}
        />
      )}

      <Dialog
        fullWidth
        maxWidth="xs"
        open={Boolean(!subProps?.items?.length && open)}
        onClose={subProps?.items?.length ? undefined : onClose}
        TransitionComponent={TransitionComponent}
      >
        {!indicator && !title ? null : (
          <DialogTitle>
            {indicator}
            {title && <Trans i18nKey={title} />}
          </DialogTitle>
        )}

        <DialogContent className={classes.content}>
          {open && (
            <MenuList>
              {items.map((item) => {
                if (!item) {
                  return null;
                } else if (item === 'divider') {
                  return <Divider key="divider" />;
                }

                const { href, indicator, label, items: subItems } = item;

                return (
                  <Fragment key={label}>
                    <MenuItem
                      {...(href && { component: NextLink, href })}
                      className={classes.item}
                      onClick={() => {
                        if (subItems?.length) {
                          setSubProps({ title: label, items: subItems });
                        } else {
                          onItemClick?.(label);
                          onClose();
                        }
                      }}
                    >
                      <Typography variant="subtitle1" color="text.secondary">
                        {indicator}
                        <Trans i18nKey={label} />
                      </Typography>
                    </MenuItem>
                  </Fragment>
                );
              })}
            </MenuList>
          )}
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
    </>
  );
}