import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import MainLayoutHeader from './MainLayout.header';
import MainLayoutSubheader from './MainLayout.subheader';
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
        <MainLayoutHeader open={open} onMenuOpen={() => setOpen(true)} />
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
                  <MainLayoutSubheader onMenuClose={() => setOpen(false)} />
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
