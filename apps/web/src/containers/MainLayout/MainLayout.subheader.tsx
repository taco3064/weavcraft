import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import { Display } from '@weavcraft/core';

import Logo from '~web/assets/imgs/icon.svg';
import { Link } from '~web/components';
import { useSubheaderStyles } from './MainLayout.styles';
import type { MainLayoutSubheaderProps } from './MainLayout.types';

export default function MainLayoutSubheader({
  onMenuClose,
}: MainLayoutSubheaderProps) {
  const { classes } = useSubheaderStyles();

  return (
    <ListSubheader disableGutters className={classes.root}>
      <Toolbar>
        <Link
          color="text.primary"
          fontFamily="comic sans MS"
          href="/"
          marginRight="auto"
          underline="none"
          variant="h6"
        >
          <SvgIcon inheritViewBox className={classes.logo} component={Logo} />
          Weavcraft
        </Link>

        <IconButton onClick={onMenuClose}>
          <Display.Icon code="faAngleLeft" />
        </IconButton>
      </Toolbar>
    </ListSubheader>
  );
}
