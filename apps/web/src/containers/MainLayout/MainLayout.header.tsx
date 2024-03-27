import AppBar from '@mui/material/AppBar';
import Fade from '@mui/material/Fade';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import { Display } from '@weavcraft/core';

import Logo from '~web/assets/imgs/icon.svg';
import { Link, SwitchIconButton } from '~web/components';
import { useHeaderStyles } from './MainLayout.styles';
import type { MainLayoutHeaderProps } from './MainLayout.types';

export default function MainLayoutHeader({
  open,
  onMenuOpen,
}: MainLayoutHeaderProps) {
  const { classes } = useHeaderStyles({ open });

  return (
    <AppBar
      position="sticky"
      color="default"
      className={classes.root}
      elevation={1}
    >
      <Toolbar>
        <Fade in={!open}>
          <Toolbar disableGutters variant="dense">
            <SwitchIconButton
              hoveredIcon={
                <Display.Icon code="faBars" color="primary" fontSize="medium" />
              }
              icon={
                <SvgIcon
                  inheritViewBox
                  className={classes.logo}
                  component={Logo}
                />
              }
              onClick={onMenuOpen}
            />

            <Link
              color="text.primary"
              fontFamily="comic sans MS"
              href="/"
              underline="none"
              variant="h6"
            >
              Weavcraft
            </Link>
          </Toolbar>
        </Fade>

        <Toolbar
          disableGutters
          variant="dense"
          className={classes.right}
        ></Toolbar>
      </Toolbar>
    </AppBar>
  );
}
