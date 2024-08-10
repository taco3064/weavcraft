import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useEffect, useState, type ComponentType } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Analytics from './UserSettings.Analytics';
import Profile from './UserSettings.Profile';
import Settings from './UserSettings.Settings';
import { MenuDialog } from '~web/components';
import { useAuth } from '~web/contexts';
import { useMainStyles } from './UserSettings.styles';
import { useSigninProviders, useUserSettings } from '~web/hooks';
import type { BaseSettingProps, UserSettingsProps } from './UserSettings.types';
import type { SigninProvider } from '../imports.types';

export default function UserSettings({ type }: UserSettingsProps) {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { pathname, replace } = useRouter();
  const { isAuth, onSignout } = useAuth();
  const { classes } = useMainStyles();
  const { providers, isPending, onSignin } = useSigninProviders(!open);

  const { settings } = useUserSettings<ComponentType<BaseSettingProps>>({
    analytics: Analytics,
    profile: Profile,
    settings: Settings,
  });

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
        {settings.map(({ id, icon, auth, external: Component }) =>
          auth && !isAuth ? null : (
            <Accordion
              key={id}
              id={id}
              disabled={isPending}
              expanded={type === id}
              onChange={(_e, isExpanded) =>
                isExpanded &&
                replace({ pathname, query: { type: id } }, undefined, {
                  shallow: false,
                })
              }
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="inherit" color="inherit" component="h2">
                  <Core.Icon color="primary" code={icon} />

                  {t(`lbl-${id}`)}
                </Typography>
              </AccordionSummary>

              <Divider />
              <Component className={classes.details} disabled={isPending} />
            </Accordion>
          )
        )}
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
            {t('btn-signout')}
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
            {t('btn-delete-account')}
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
            {t('btn-signin')}
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
