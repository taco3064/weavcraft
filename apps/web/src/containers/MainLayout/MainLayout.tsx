import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import NextLink from 'next/link';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Display } from '@weavcraft/core';
import { Suspense, useEffect, useState } from 'react';
import { Trans } from 'next-i18next';
import { useRouter } from 'next/router';

import NotificationBell from './MainLayout.NotificationBell';
import UserAvatarMenu from './MainLayout.UserAvatarMenu';
import { DEFAULT_PROPS, NAV_ITEMS } from './MainLayout.const';
import { Link, SwitchIconButton } from '~web/components';
import { useLayoutStyles } from './MainLayout.styles';
import type { MainLayoutProps } from './MainLayout.types';

export default function MainLayout({ children }: MainLayoutProps) {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  const { classes } = useLayoutStyles({ open });
  const logo = <SvgIcon {...DEFAULT_PROPS.logo} className={classes.logo} />;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <Container disableGutters className={classes.content} maxWidth={false}>
        <AppBar position="sticky" className={classes.header} elevation={1}>
          <Toolbar>
            <Fade in={!open}>
              <Toolbar disableGutters variant="dense">
                <SwitchIconButton
                  icon={logo}
                  hoveredIcon={<Display.Icon code="faBars" fontSize="medium" />}
                  onClick={() => setOpen(true)}
                />

                <Link {...DEFAULT_PROPS.title} href="/">
                  Weavcraft
                </Link>
              </Toolbar>
            </Fade>

            <Toolbar disableGutters role="status" variant="dense">
              <NotificationBell />
              {pathname !== '/user-settings' && <UserAvatarMenu />}
            </Toolbar>
          </Toolbar>
        </AppBar>

        <Suspense fallback={<LinearProgress />}>
          <Container maxWidth={false}>{children}</Container>
        </Suspense>
      </Container>

      <Drawer
        variant="persistent"
        open={open}
        PaperProps={{
          className: classes.drawer,
          elevation: 1,
        }}
      >
        {open && (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <List
              role="navigation"
              subheader={
                <>
                  <ListSubheader
                    disableGutters
                    role="heading"
                    component={Toolbar}
                  >
                    <Typography {...DEFAULT_PROPS.title}>
                      {logo}
                      Weavcraft
                    </Typography>

                    <IconButton onClick={() => setOpen(false)}>
                      <Display.Icon code="faAngleLeft" />
                    </IconButton>
                  </ListSubheader>

                  <Divider />
                </>
              }
            >
              {NAV_ITEMS.map(({ icon, id, href }) => (
                <ListItemButton
                  LinkComponent={NextLink}
                  key={id}
                  href={href}
                  selected={pathname === href}
                >
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar>
                      <Display.Icon fontSize="large" code={icon} />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={<Trans i18nKey={`ttl-nav-items.${id}`} />}
                    secondary={<Trans i18nKey={`msg-nav-items.${id}`} />}
                    primaryTypographyProps={{
                      variant: 'subtitle1',
                      color: 'primary',
                      fontWeight: 'bolder',
                    }}
                    secondaryTypographyProps={{
                      variant: 'caption',
                      color: 'text.secondary',
                      className: classes.description,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </ClickAwayListener>
        )}
      </Drawer>
    </>
  );
}
