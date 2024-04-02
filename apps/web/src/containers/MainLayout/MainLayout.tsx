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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import NextLink from 'next/link';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
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
                  <Trans i18nKey="ttl-weavcraft" />
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
          <Container component="main" className={classes.page} maxWidth={false}>
            {children}
          </Container>
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
                  <ListSubheader role="heading">
                    <ListItemIcon>{logo}</ListItemIcon>

                    <ListItemText
                      primaryTypographyProps={DEFAULT_PROPS.title}
                      primary={<Trans i18nKey="ttl-weavcraft" />}
                      secondaryTypographyProps={{
                        variant: 'caption',
                        color: 'text.secondary',
                      }}
                      secondary={process.env.NEXT_PUBLIC_VERSION}
                    />

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
                    primary={<Trans i18nKey={`ttl-breadcrumbs.${id}.label`} />}
                    secondary={
                      <Trans i18nKey={`ttl-breadcrumbs.${id}.description`} />
                    }
                    primaryTypographyProps={{
                      variant: 'subtitle1',
                      color: 'secondary',
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
