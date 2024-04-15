import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { Display } from '@weavcraft/core';
import { Trans } from 'next-i18next';
import { lazy, useState, type ComponentType } from 'react';

import { MenuDialog } from '~web/components';
import { useAuth, SIGNIN_OPTIONS, USER_SETTINGS } from '~web/hooks';
import { useExpanded } from './UserSettings.hooks';
import { useMainStyles } from './UserSettings.styles';
import type { SigninMethod, UserSettingId } from '~web/hooks';

const ACCORDION_CONTENTS: Record<UserSettingId, ComponentType> = {
  analytics: lazy(() => import('./UserSettings.Analytics')),
  profile: lazy(() => import('./UserSettings.Profile')),
  settings: lazy(() => import('./UserSettings.Settings')),
};

export default function UserSettings() {
  const { isAuthenticated, signin, signout } = useAuth();
  const { classes } = useMainStyles();

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useExpanded(isAuthenticated);

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
              <AccordionSummary
                expandIcon={
                  expanded === id ? null : <Display.Icon code="faAngleDown" />
                }
              >
                <Display.Icon color="primary" code={icon} />
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
            startIcon={<Display.Icon code="faArrowRightFromBracket" />}
            onClick={signout}
          >
            <Trans i18nKey="btn-signout" />
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            size="large"
            startIcon={<Display.Icon code="faUserSlash" />}
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
            startIcon={<Display.Icon code="faArrowRightToBracket" />}
            onClick={() => setOpen(true)}
          >
            <Trans i18nKey="btn-signin" />
          </Button>

          <MenuDialog
            open={open}
            title="btn-signin"
            indicator={<Display.Icon code="faArrowRightToBracket" />}
            onClose={() => setOpen(false)}
            onItemClick={(e) => signin(e.replace(/^.+-/, '') as SigninMethod)}
            items={SIGNIN_OPTIONS}
          />
        </>
      )}
    </>
  );
}
