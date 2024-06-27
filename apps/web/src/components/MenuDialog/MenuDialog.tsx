import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Core from '@weavcraft/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import NextLink from 'next/link';
import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import { useState } from 'react';

import { SlideDownTransition, SlideUpTransition } from '~web/themes';
import { useDialogStyles } from './MenuDialog.styles';
import type { MenuDialogProps } from './MenuDialog.types';

export default function MenuDialog({
  TransitionComponent = SlideUpTransition,
  indicator,
  items,
  open,
  subtitle,
  title,
  onClose,
  onItemClick,
}: MenuDialogProps) {
  const { classes } = useDialogStyles();

  const [subProps, setSubProps] =
    useState<Pick<MenuDialogProps, 'items' | 'title' | 'indicator'>>();

  return (
    <>
      {!subProps?.items?.length ? null : (
        <MenuDialog
          indicator={subProps.indicator}
          items={subProps.items}
          open={Boolean(subProps.items.length)}
          title={subProps.title}
          onClose={() => setSubProps(undefined)}
          onItemClick={onItemClick}
          TransitionComponent={
            TransitionComponent === SlideUpTransition
              ? SlideDownTransition
              : SlideUpTransition
          }
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
            {(title || subtitle) && (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {title && (
                  <Typography variant="inherit" color="inherit">
                    <Trans i18nKey={title} />
                  </Typography>
                )}

                {subtitle && (
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    {subtitle}
                  </Typography>
                )}
              </Box>
            )}
          </DialogTitle>
        )}

        <DialogContent className={classes.content}>
          {open && (
            <MenuList>
              {items.map((item, i) => {
                if (!item) {
                  return null;
                } else if (item === 'divider') {
                  return <Divider key="divider" />;
                }

                const { href, icon, label, items: subItems } = item;

                const indicator = !icon ? undefined : <Core.Icon code={icon} />;

                return (
                  <MenuItem
                    {...(href && { component: NextLink, href })}
                    key={label}
                    className={classes.item}
                    onClick={() => {
                      if (subItems?.length) {
                        setSubProps({
                          indicator,
                          title: label,
                          items: subItems,
                        });
                      } else {
                        onItemClick?.(label, i);
                        onClose();
                      }
                    }}
                  >
                    <Typography variant="subtitle1" color="text.primary">
                      {indicator}
                      <Trans i18nKey={label} />
                    </Typography>
                  </MenuItem>
                );
              })}
            </MenuList>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            color="inherit"
            size="large"
            startIcon={<Core.Icon code="faClose" />}
            onClick={onClose}
          >
            <Trans i18nKey="btn-close" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
