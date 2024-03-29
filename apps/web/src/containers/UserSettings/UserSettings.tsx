import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { Display } from '@weavcraft/core';
import { Trans, useTranslation } from 'next-i18next';
import { useState } from 'react';

import { MenuDialog } from '~web/components';
import { ACCORDIONS, SIGNIN_OPTIONS } from './UserSettings.const';
import { useAuth, type SigninMethod } from '~web/hooks';
import { useExpanded } from './UserSettings.hooks';
import { useMainStyles } from './UserSettings.styles';

export default function UserSettings() {
  const { isAuthenticated, signin, signout } = useAuth();
  const { classes } = useMainStyles();

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useExpanded(isAuthenticated);

  return (
    <Container disableGutters maxWidth="sm" className={classes.root}>
      <Container disableGutters maxWidth={false}>
        {ACCORDIONS.map(({ Component, id, icon, auth }) =>
          auth && !isAuthenticated ? null : (
            <Accordion
              key={id}
              expanded={expanded === id}
              onChange={(_e, isExpanded) => isExpanded && setExpanded(id)}
            >
              <AccordionSummary
                expandIcon={<Display.Icon code="faAngleDown" />}
              >
                <Display.Icon color="primary" code={icon} />
                <Trans i18nKey={`lbl-${id}`} />
              </AccordionSummary>

              <Divider />

              <AccordionDetails className={classes.root}>
                <Component />
              </AccordionDetails>

              <AccordionActions id={id} />
            </Accordion>
          )
        )}
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
            items={SIGNIN_OPTIONS}
            onClose={() => setOpen(false)}
            onItemClick={(e) => signin(e.replace(/^.+-/, '') as SigninMethod)}
          />
        </>
      )}
    </Container>
  );
}
