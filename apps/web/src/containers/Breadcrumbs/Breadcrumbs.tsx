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
import { MAX_ITEMS } from './Breadcrumbs.const';
import { useBreadcrumbs } from './Breadcrumbs.hooks';
import { useBreadcrumbsStyles } from './Breadcrumbs.styles';
import { useBreakpointMatches } from '~web/hooks';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

export default function Breadcrumbs({
  currentBreadcrumbLabel,
  currentPageTitle,
  stickyTop = 64,
  onCatchAllRoutesTransform,
  onToolbarMount,
}: BreadcrumbsProps) {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { back } = useRouter();
  const { matched: maxItems } = useBreakpointMatches(MAX_ITEMS);
  const { classes } = useBreadcrumbsStyles({ stickyTop });

  const breadcrumbs = useBreadcrumbs({
    currentBreadcrumbLabel,
    currentPageTitle,
    onCatchAllRoutesTransform,
  });

  return (
    <>
      <Head>
        <title>{`${t('ttl-weavcraft')} | ${currentPageTitle}`}</title>
      </Head>

      <MenuDialog
        open={open}
        onClose={() => setOpen(false)}
        items={breadcrumbs
          .slice(0, breadcrumbs.length - 1)
          .reverse()
          .map(({ label, href }) => ({
            label,
            href,
          }))}
      />

      <AppBar position="sticky" elevation={0} className={classes.root}>
        <Toolbar role="toolbar" variant="dense">
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

          {!onToolbarMount ? null : (
            <Toolbar
              ref={onToolbarMount}
              disableGutters
              variant="dense"
              className={classes.right}
            />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
