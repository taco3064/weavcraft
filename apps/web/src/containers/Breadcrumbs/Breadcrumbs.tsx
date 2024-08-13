import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Core, {
  useBreakpointMatches,
  type BreakpointValues,
} from '@weavcraft/core';

import { MenuDialog, Link } from '~web/components';
import { useBreadcrumbs } from './Breadcrumbs.hooks';
import { useBreadcrumbsStyles } from './Breadcrumbs.styles';
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

  const { back } = useRouter();
  const { matched: maxItems } = useBreakpointMatches(MAX_ITEMS);
  const { classes } = useBreadcrumbsStyles({ stickyTop });

  const isTutorialMode = useTutorialMode();

  const breadcrumbs = useBreadcrumbs({
    currentBreadcrumbLabel,
    currentPageTitle,
    customBreadcrumbs,
    isTutorialMode,
    onCatchAllRoutesTransform,
  });

  return (
    <>
      <MenuDialog
        open={open}
        onClose={() => setOpen(false)}
        items={breadcrumbs.slice(0, breadcrumbs.length - 1).reverse()}
      />

      <AppBar position="sticky" elevation={0} className={classes.root}>
        <Toolbar variant="dense" disableGutters={disableGutters}>
          <IconButton color="secondary" onClick={back}>
            <Core.Icon code="faArrowLeft" />
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
                  component={isLast ? 'h1' : 'h6'}
                  variant="subtitle2"
                  color={isLast ? 'secondary' : 'text.disabled'}
                  fontWeight={isLast ? 'bold' : undefined}
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
