import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Trans } from 'next-i18next';
import { lazy, useEffect, useState, type ComponentType } from 'react';
import { useRouter } from 'next/router';

import { MenuDialog } from '~web/components';
import { USER_SETTINGS } from './UserSettings.const';
import { useAuthState } from '~web/contexts';
import { useAuthMutation } from '~web/hooks';
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
  const { isAuth } = useAuthState();
  const { classes } = useMainStyles();
  const { providers, isPending, onSignin, onSignout } = useAuthMutation(!open);

  useEffect(() => {
    if (!isAuth && type !== 'settings') {
      replace({ pathname, query: { type: 'settings' } }, undefined, {
        shallow: false,
      });
    }
  }, [isAuth, pathname, replace, type]);

  return (
    <>
      <Container disableGutters maxWidth={false}>
        {USER_SETTINGS.map(({ id, icon, auth }) => {
          const Component = ACCORDION_CONTENTS[id];

          return auth && !isAuth ? null : (
            <Accordion
              key={id}
              id={id}
              disabled={isPending}
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
              <Component className={classes.details} disabled={isPending} />
            </Accordion>
          );
        })}
      </Container>

      <Divider />

      {isAuth ? (
        <>
          <Button
            fullWidth
            color="secondary"
            disabled={isPending}
            size="large"
            startIcon={<Core.Icon code="faArrowRightFromBracket" />}
            variant="contained"
            onClick={() => onSignout()}
          >
            <Trans i18nKey="btn-signout" />
          </Button>

          <Button
            //! Backend not implemented
            disabled
            fullWidth
            color="error"
            size="large"
            variant="outlined"
            startIcon={<Core.Icon code="faUserSlash" />}
          >
            <Trans i18nKey="btn-delete-account" />
          </Button>
        </>
      ) : (
        <>
          <Button
            fullWidth
            color="primary"
            disabled={isPending}
            size="large"
            startIcon={<Core.Icon code="faArrowRightToBracket" />}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            <Trans i18nKey="btn-signin" />
          </Button>

          <MenuDialog
            indicator={<Core.Icon code="faArrowRightToBracket" />}
            isLoading={isPending}
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
