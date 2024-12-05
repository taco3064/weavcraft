import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import NextLink from 'next/link';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { Suspense, useEffect, useState } from 'react';
import { Trans } from 'next-i18next';
import { useRouter } from 'next/router';

import CompressionContent from './MainLayout.CompressionContent';
import UserAvatarMenu from './MainLayout.UserAvatarMenu';
import { DEFAULT_PROPS } from './MainLayout.const';
import { Link, LogoIcon, SwitchIconButton } from '~web/components';
import { Provider } from '~web/contexts';
import { useAppNavItems, useAuth, useSigninProviders } from '~web/hooks';
import { useMainStyles } from './MainLayout.styles';
import type { MainLayoutProps, MenuMode } from './MainLayout.types';

export default function MainLayout({ children }: MainLayoutProps) {
  const [settingOpen, setSettingOpen] = useState(false);
  const [menuMode, setMenuMode] = useState<MenuMode>();

  const { pathname } = useRouter();
  const { isAuth } = useAuth();
  const { isPending, ...props } = useSigninProviders(!open);
  const { classes, cx } = useMainStyles({ menuMode });

  const logo = <LogoIcon className={classes.logo} />;
  const navItems = useAppNavItems();

  useEffect(() => {
    setMenuMode(undefined);
  }, [pathname]);

  return (
    <Provider.TogglePortal
      open={menuMode === 'custom'}
      onToggle={(isOpen) => setMenuMode(isOpen ? 'custom' : undefined)}
      render={(containerRef) => (
        <>
          <Container
            disableGutters
            className={cx(classes.content, menuMode)}
            maxWidth={false}
            role="main"
          >
            <AppBar position="sticky" className={classes.header} elevation={1}>
              <Toolbar role="toolbar">
                <Fade in={menuMode !== 'nav'}>
                  <Toolbar disableGutters variant="dense">
                    <SwitchIconButton
                      disabled={isPending}
                      icon={logo}
                      onClick={() => setMenuMode('nav')}
                      hoveredIcon={
                        <Core.Icon code="faBars" fontSize="medium" />
                      }
                    />

                    <Link {...DEFAULT_PROPS.title} href="/">
                      <Trans i18nKey="ttl-weavcraft" />
                    </Link>
                  </Toolbar>
                </Fade>

                <Toolbar disableGutters role="status" variant="dense">
                  {pathname !== '/user-settings/[type]' && (
                    <UserAvatarMenu
                      {...props}
                      isPending={isPending}
                      open={settingOpen}
                      onToggle={setSettingOpen}
                    />
                  )}
                </Toolbar>
              </Toolbar>

              {isPending && <LinearProgress />}
            </AppBar>

            <Suspense fallback={<LinearProgress />}>
              <CompressionContent isDrawerOpen={menuMode !== undefined}>
                {children}
              </CompressionContent>
            </Suspense>
          </Container>

          <Drawer
            anchor="right"
            variant="persistent"
            open={menuMode === 'custom'}
            PaperProps={{
              className: classes.drawer,
              elevation: 1,
            }}
          >
            {menuMode === 'custom' && (
              <ClickAwayListener
                mouseEvent="onPointerDown"
                touchEvent="onTouchEnd"
                onClickAway={(e) => {
                  if (e.target !== global.document?.body) {
                    setMenuMode(undefined);
                  }
                }}
              >
                <Paper
                  ref={containerRef}
                  className={classes.custom}
                  elevation={0}
                />
              </ClickAwayListener>
            )}
          </Drawer>

          <Drawer
            anchor="left"
            variant="persistent"
            open={menuMode === 'nav'}
            PaperProps={{
              className: classes.drawer,
              component: 'nav',
              elevation: 1,
            }}
          >
            <ClickAwayListener
              mouseEvent={menuMode === 'nav' ? 'onPointerDown' : false}
              touchEvent={menuMode === 'nav' ? 'onTouchEnd' : false}
              onClickAway={() => setMenuMode(undefined)}
            >
              <List
                role="navigation"
                subheader={
                  <>
                    <ListSubheader role="heading">
                      <ListItemIcon>{logo}</ListItemIcon>

                      <ListItemText
                        primary={<Trans i18nKey="ttl-weavcraft" />}
                        secondary={process.env.NEXT_PUBLIC_VERSION}
                        primaryTypographyProps={DEFAULT_PROPS.title}
                        secondaryTypographyProps={{
                          variant: 'caption',
                          color: 'text.secondary',
                        }}
                      />

                      <IconButton onClick={() => setMenuMode(undefined)}>
                        <Core.Icon code="faAngleLeft" />
                      </IconButton>
                    </ListSubheader>

                    <Divider />
                  </>
                }
              >
                {navItems.map(({ disabled, icon, label, href, auth = false }) =>
                  auth && !isAuth ? null : (
                    <ListItem key={label} disableGutters disablePadding>
                      <ListItemButton
                        disabled={disabled}
                        selected={pathname.startsWith(href)}
                        {...(!disabled && {
                          LinkComponent: NextLink,
                          href,
                        })}
                      >
                        <ListItemAvatar className={classes.avatar}>
                          <Avatar>
                            <Core.Icon fontSize="large" code={icon} />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primary={<Trans i18nKey={`${label}.label`} />}
                          secondary={<Trans i18nKey={`${label}.description`} />}
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
                    </ListItem>
                  )
                )}
              </List>
            </ClickAwayListener>
          </Drawer>
        </>
      )}
    />
  );
}
