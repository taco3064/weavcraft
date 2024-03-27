import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { Display } from '@weavcraft/core';
import { useTranslation } from 'react-i18next';

import Logo from '~web/assets/imgs/icon.svg';
import { Link, SwitchIconButton } from '~web/components';
import { useHeaderStyles } from './MainLayout.styles';
import type { MainLayoutHeaderProps } from './MainLayout.types';

export default function MainLayoutHeader({
  open,
  onMenuOpen,
}: MainLayoutHeaderProps) {
  const { t } = useTranslation();
  const { classes } = useHeaderStyles({ open });

  return (
    <AppBar
      position="sticky"
      color="default"
      className={classes.root}
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
              onClick={onMenuOpen}
            />

            <Link
              color="text.primary"
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

        <Tooltip title={t('app:lbl-language')}>
          <IconButton style={{ marginLeft: 'auto' }}>
            <Display.Icon code="faLanguage" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
