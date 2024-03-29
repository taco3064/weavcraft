import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { Display } from '@weavcraft/core';
import { Trans } from 'react-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { MenuDialog } from '~web/components';
import { ACCORDIONS, SIGNIN_OPTIONS } from './UserSettings.const';
import { useAuth, type SigninMethod } from '~web/hooks';
import type { AccordionId } from './UserSettings.types';

export default function UserSettings() {
  const { pathname, asPath, replace } = useRouter();
  const { isAuthenticated, signin, signout } = useAuth();

  const [expanded, setExpanded] = useState<AccordionId>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hashId = asPath.split('#')[1] as AccordionId;

    const expanded = (ACCORDIONS.find(
      ({ id, auth }) => id === hashId && (!auth || isAuthenticated)
    )?.id || 'settings') as AccordionId;

    setExpanded(expanded);
  }, [isAuthenticated, asPath]);

  return (
    <Container disableGutters maxWidth="sm">
      {ACCORDIONS.map(({ Component, id, icon, auth }) =>
        auth && !isAuthenticated ? null : (
          <Accordion
            key={id}
            id={id}
            expanded={expanded === id}
            onChange={(_e, isExpanded) => {
              if (isExpanded) {
                replace(pathname, `${pathname}#${id}`);
                setExpanded(id);
              }
            }}
          >
            <AccordionSummary expandIcon={<Display.Icon code="faAngleDown" />}>
              <Display.Icon color="primary" code={icon} />
              <Trans i18nKey={`app:lbl-${id}`} />
            </AccordionSummary>

            <Divider />

            <AccordionDetails>
              <Component />
            </AccordionDetails>

            <AccordionActions id={`actions-${id}`} />
          </Accordion>
        )
      )}

      <Divider sx={{ marginY: 2 }} />

      {isAuthenticated ? (
        <Button
          fullWidth
          variant="outlined"
          color="error"
          size="large"
          onClick={signout}
        >
          <Trans i18nKey="app:btn-signout" />
        </Button>
      ) : (
        <>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setOpen(true)}
          >
            <Trans i18nKey="app:btn-signin" />
          </Button>

          <MenuDialog
            open={open}
            title="app:btn-signin"
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
