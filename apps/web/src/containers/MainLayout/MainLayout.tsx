import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Slide from '@mui/material/Slide';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Display } from '@weavcraft/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Logo from '../../../public/images/icon.svg';
import { Link, SwitchIconButton } from '~web/components';
import { useLayoutStyles } from './MainLayout.styles';
import type { MainLayoutProps } from './MainLayout.types';

export default function MainLayout({ children }: MainLayoutProps) {
  const [open, setOpen] = useState(false);

  const { pathname } = useRouter();
  const { classes } = useLayoutStyles({ open });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <Container disableGutters className={classes.content} maxWidth={false}>
        <AppBar
          position="sticky"
          color="default"
          className={classes.header}
          elevation={1}
        >
          <Toolbar>
            <Slide direction="left" in={!open}>
              <Toolbar disableGutters variant="dense">
                <SwitchIconButton
                  hoveredIcon={<Display.Icon code="faBars" />}
                  icon={
                    <SvgIcon
                      inheritViewBox
                      component={Logo}
                      style={{ fontSize: '2.5rem' }}
                    />
                  }
                  onClick={() => setOpen(true)}
                />

                <Link
                  color="secondary"
                  fontFamily="comic sans MS"
                  fontWeight="bolder"
                  href="/"
                  underline="none"
                  variant="h6"
                >
                  Weavcraft
                </Link>
              </Toolbar>
            </Slide>
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
              className={classes.list}
              subheader={
                <>
                  <ListSubheader disableGutters className={classes.subheader}>
                    <Toolbar>
                      <Link
                        color="secondary"
                        fontFamily="comic sans MS"
                        fontWeight="bolder"
                        href="/"
                        marginRight="auto"
                        underline="none"
                        variant="h6"
                      >
                        <SvgIcon
                          inheritViewBox
                          component={Logo}
                          style={{ fontSize: '2.5rem' }}
                        />
                        Weavcraft
                      </Link>

                      <IconButton onClick={() => setOpen(false)}>
                        <Display.Icon code="faAngleLeft" />
                      </IconButton>
                    </Toolbar>
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
