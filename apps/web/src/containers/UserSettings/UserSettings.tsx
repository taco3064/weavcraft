import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Trans } from 'next-i18next';
import { lazy, useState, type ComponentType } from 'react';

import { MenuDialog } from '~web/components';
import { USER_SETTINGS } from './UserSettings.const';
import { useAuth, useSigninOptions } from '~web/hooks';
import { useExpanded } from './UserSettings.hooks';
import { useMainStyles } from './UserSettings.styles';
import type { SigninProvider } from '../imports.types';
import type { UserSettingId } from './UserSettings.types';

const ACCORDION_CONTENTS: Record<UserSettingId, ComponentType> = {
  analytics: lazy(() => import('./UserSettings.Analytics')),
  profile: lazy(() => import('./UserSettings.Profile')),
  settings: lazy(() => import('./UserSettings.Settings')),
};

export default function UserSettings() {
  const signinOptions = useSigninOptions();

  const { isAuthenticated, signin, signout } = useAuth();
  const { classes } = useMainStyles();

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useExpanded(isAuthenticated);

  const handleSignin = (label: string) => {
    const provider = label.replace(/^.+-/, '') as SigninProvider;

    console.log(provider);
  };

  return (
    <>
      <Container disableGutters maxWidth={false}>
        {USER_SETTINGS.map(({ id, icon, auth }) => {
          const Component = ACCORDION_CONTENTS[id];

          return auth && !isAuthenticated ? null : (
            <Accordion
              key={id}
              id={id}
              expanded={expanded === id}
              onChange={(_e, isExpanded) => isExpanded && setExpanded(id)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Core.Icon color="primary" code={icon} />
                <Trans i18nKey={`lbl-${id}`} />
              </AccordionSummary>

              <Divider />

              <AccordionDetails className={classes.details}>
                <Component />
              </AccordionDetails>

              <AccordionActions id={`actions-${id}`} />
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
            onClick={signout}
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
            items={signinOptions}
            open={open}
            title="btn-signin"
            onClose={() => setOpen(false)}
            onItemClick={handleSignin}
          />
        </>
      )}
    </>
  );
}
