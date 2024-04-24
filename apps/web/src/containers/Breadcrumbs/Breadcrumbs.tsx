import AppBar from '@mui/material/AppBar';
import Head from 'next/head';
import IconButton from '@mui/material/IconButton';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Display } from '@weavcraft/core';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { MenuDialog, Link } from '~web/components';
import { useBreadcrumbs } from './Breadcrumbs.hooks';
import { useBreadcrumbsStyles } from './Breadcrumbs.styles';
import { useBreakpointMatches, type BreakpointValues } from '~web/hooks';
import { useTutorialMode } from '~web/contexts';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

const MAX_ITEMS: BreakpointValues<number> = {
  xs: 3,
  md: 5,
  lg: 8,
};

export default function Breadcrumbs({
  currentBreadcrumbLabel,
  currentPageTitle,
  customBreadcrumbs,
  disableGutters,
  stickyTop = 64,
  toolbar,
  onCatchAllRoutesTransform,
}: BreadcrumbsProps) {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { back } = useRouter();
  const { matched: maxItems } = useBreakpointMatches(MAX_ITEMS);
  const { classes } = useBreadcrumbsStyles({ stickyTop });

  const isTutorialMode = useTutorialMode();
  const tutorialTitle = t('ttl-breadcrumbs.tutorial.label');

  const breadcrumbs = useBreadcrumbs({
    currentBreadcrumbLabel,
    currentPageTitle,
    customBreadcrumbs,
    isTutorialMode,
    onCatchAllRoutesTransform,
  });

  return (
    <>
      <Head>
        <title>{`${t('ttl-weavcraft')}${
          !isTutorialMode || tutorialTitle === currentPageTitle
            ? ''
            : ` ${t('ttl-breadcrumbs.tutorial.label')}`
        } | ${currentPageTitle}`}</title>
      </Head>

      <MenuDialog
        open={open}
        onClose={() => setOpen(false)}
        items={breadcrumbs.slice(0, breadcrumbs.length - 1).reverse()}
      />

      <AppBar position="sticky" elevation={0} className={classes.root}>
        <Toolbar variant="dense" disableGutters={disableGutters}>
          <IconButton color="secondary" onClick={back}>
            <Display.Icon code="faArrowLeft" />
          </IconButton>

          <MuiBreadcrumbs
            separator="›"
            itemsBeforeCollapse={0}
            maxItems={maxItems}
            slotProps={{
              collapsedIcon: {
                onClick: (e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  setOpen(true);
                },
              },
            }}
          >
            {breadcrumbs.map(({ label, href }, i) => {
              const isLast = i === breadcrumbs.length - 1;

              return !href || isLast ? (
                <Typography
                  key={i}
                  variant="subtitle2"
                  color={isLast ? 'secondary' : 'text.disabled'}
                >
                  {label}
                </Typography>
              ) : (
                <Link
                  key={i}
                  href={href}
                  variant="subtitle2"
                  color="text.secondary"
                >
                  {label}
                </Link>
              );
            })}
          </MuiBreadcrumbs>

          {!toolbar ? null : (
            <Toolbar
              disableGutters
              variant="dense"
              className={classes.right}
              {...(toolbar instanceof Function && {
                ref: toolbar,
              })}
            >
              {toolbar instanceof Function ? null : toolbar}
            </Toolbar>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
