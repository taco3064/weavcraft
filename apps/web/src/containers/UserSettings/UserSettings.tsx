import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearProgress from '@mui/material/LinearProgress';
import { Trans } from 'next-i18next';
import { lazy, useEffect, useState, type ComponentType } from 'react';
import { useRouter } from 'next/router';

import { MenuDialog } from '~web/components';
import { USER_SETTINGS } from './UserSettings.const';
import { useAuth } from '~web/contexts';
import { useSigninOptions } from '~web/hooks';
import { useMainStyles } from './UserSettings.styles';
import type { SigninProvider } from '../imports.types';

import type {
  BaseSettingProps,
  UserSettingType,
  UserSettingsProps,
} from './UserSettings.types';

const ACCORDION_CONTENTS: Record<
  UserSettingType,
  ComponentType<BaseSettingProps>
> = {
  analytics: lazy(() => import('./UserSettings.Analytics')),
  profile: lazy(() => import('./UserSettings.Profile')),
  settings: lazy(() => import('./UserSettings.Settings')),
};

export default function UserSettings({ type }: UserSettingsProps) {
  const [open, setOpen] = useState(false);

  const { pathname, push, replace } = useRouter();
  const { isAuthenticated, onSignout, ...auth } = useAuth();
  const { classes } = useMainStyles();
  const { options: providers, onSignin, ...options } = useSigninOptions(!open);

  const isLoading = [options, auth].some(({ isLoading }) => isLoading);

  useEffect(() => {
    if (!isAuthenticated && type !== 'settings') {
      replace({ pathname, query: { type: 'settings' } }, undefined, {
        shallow: false,
      });
    }
  }, [isAuthenticated, pathname, replace, type]);

  return (
    <>
      {isLoading && <LinearProgress />}

      <Container disableGutters maxWidth={false}>
        {USER_SETTINGS.map(({ id, icon, auth }) => {
          const Component = ACCORDION_CONTENTS[id];

          return auth && !isAuthenticated ? null : (
            <Accordion
              key={id}
              id={id}
              expanded={type === id}
              onChange={(_e, isExpanded) =>
                isExpanded && push({ pathname, query: { type: id } })
              }
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Core.Icon color="primary" code={icon} />
                <Trans i18nKey={`lbl-${id}`} />
              </AccordionSummary>

              <Divider />
              <Component className={classes.details} />
            </Accordion>
          );
        })}
      </Container>

      <Divider />

      {isAuthenticated ? (
        <>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Core.Icon code="faArrowRightFromBracket" />}
            onClick={() => onSignout()}
          >
            <Trans i18nKey="btn-signout" />
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            size="large"
            startIcon={<Core.Icon code="faUserSlash" />}
          >
            <Trans i18nKey="btn-delete-account" />
          </Button>
        </>
      ) : (
        <>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Core.Icon code="faArrowRightToBracket" />}
            onClick={() => setOpen(true)}
          >
            <Trans i18nKey="btn-signin" />
          </Button>

          <MenuDialog
            indicator={<Core.Icon code="faArrowRightToBracket" />}
            items={providers}
            open={open}
            title="btn-signin"
            onClose={() => setOpen(false)}
            onItemClick={(label) =>
              onSignin(label.replace(/^btn-signin-with-/, '') as SigninProvider)
            }
          />
        </>
      )}
    </>
  );
}
