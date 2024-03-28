import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Display } from '@weavcraft/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import NotificationBell from './MainLayout.NotificationBell';
import UserAvatarMenu from './MainLayout.UserAvatarMenu';
import { Link, SwitchIconButton } from '~web/components';
import { defaultProps } from './MainLayout.const';
import { useLayoutStyles } from './MainLayout.styles';
import type { MainLayoutProps } from './MainLayout.types';

export default function MainLayout({ children }: MainLayoutProps) {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  const { classes } = useLayoutStyles({ open });
  const logo = <SvgIcon {...defaultProps.logo} className={classes.logo} />;

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

                <Link {...defaultProps.homeLink}>Weavcraft</Link>
              </Toolbar>
            </Fade>

            <Toolbar disableGutters role="status" variant="dense">
              <NotificationBell />
              <UserAvatarMenu />
            </Toolbar>
          </Toolbar>
        </AppBar>

        <Container maxWidth={false}>{children}</Container>
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
                    <Link {...defaultProps.homeLink}>
                      {logo}
                      Weavcraft
                    </Link>

                    <IconButton onClick={() => setOpen(false)}>
                      <Display.Icon code="faAngleLeft" />
                    </IconButton>
                  </ListSubheader>

                  <Divider />
                </>
              }
            ></List>
          </ClickAwayListener>
        )}
      </Drawer>
    </>
  );
}
