import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
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
import type { MenuDialogProps, SubProps } from './MenuDialog.types';
import type { MenuItemOptions } from '../imports.types';

export default function MenuDialog({
  TransitionComponent = SlideUpTransition,
  indicator,
  isLoading,
  items,
  open,
  subMenu = false,
  subtitle,
  title,
  onClose,
  onItemClick,
}: MenuDialogProps) {
  const [subProps, setSubProps] = useState<SubProps>();
  const { classes } = useDialogStyles();
  const options = items.filter(Boolean) as MenuItemOptions[];

  const handleItemClick = async (
    item: Exclude<MenuItemOptions, 'divider'>,
    index: number
  ) => {
    const { icon, label: title, items } = item;

    if (!items?.length) {
      const res = await onItemClick?.(title, index);

      return res ? setSubProps(res) : onClose();
    }

    return setSubProps({ title, icon, items });
  };

  return (
    <>
      {!subProps ? null : (
        <MenuDialog
          subMenu
          isLoading={isLoading}
          items={subProps.items}
          open={Boolean(subProps)}
          subtitle={subProps.subtitle}
          title={subProps.title}
          onClose={() => setSubProps(undefined)}
          onItemClick={onItemClick}
          indicator={
            !subProps.icon ? undefined : <Core.Icon code={subProps.icon} />
          }
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
        open={Boolean(!subProps && open)}
        onClose={subProps ? undefined : onClose}
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
            <>
              {isLoading ? (
                <CircularProgress className={classes.progress} />
              ) : (
                <MenuList>
                  {!options.length ? (
                    <MenuItem disabled className={classes.item}>
                      <Typography variant="h6" color="text.disabled">
                        <Trans i18nKey="msg-no-data" />
                      </Typography>
                    </MenuItem>
                  ) : (
                    options.map((item, i) => {
                      if (!item) {
                        return null;
                      } else if (item === 'divider') {
                        return <Divider key="divider" />;
                      }

                      return (
                        <MenuItem
                          key={item.label}
                          className={classes.item}
                          disabled={isLoading}
                          onClick={() => handleItemClick(item, i)}
                          {...(item.href && {
                            component: NextLink,
                            href: item.href,
                          })}
                        >
                          <Typography variant="subtitle1" color="text.primary">
                            {item.icon && <Core.Icon code={item.icon} />}
                            <Trans i18nKey={item.label} />
                          </Typography>
                        </MenuItem>
                      );
                    })
                  )}
                </MenuList>
              )}
            </>
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
            <Trans i18nKey={subMenu ? 'btn-back' : 'btn-close'} />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
