import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';
import { Trans, useTranslation } from 'next-i18next';
import { useState } from 'react';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout } from '~web/containers';
import { getServerSideTranslations } from './pages.utils';
import { makePerPageLayout } from '~web/contexts';
import { useTutorialLessons } from '~web/hooks';
import { usePageStyles } from './pages.styles';

export default makePerPageLayout(MainLayout)(function TutorialsPage() {
  const { t } = useTranslation();
  const { classes } = usePageStyles();

  const tutorials = useTutorialLessons();
  const [activeId, setActiveId] = useState(tutorials[0].id);

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <Breadcrumbs
        disableGutters
        currentPageTitle={t('ttl-breadcrumbs.tutorial.label')}
      />

      <Container disableGutters maxWidth={false}>
        {tutorials.map(({ id, label, icon, href, items }) => (
          <Accordion
            key={id}
            id={id}
            expanded={activeId === id}
            slotProps={{ transition: { timeout: 600 } }}
            onChange={(_e, isExpanded) => isExpanded && setActiveId(id)}
          >
            <AccordionSummary
              expandIcon={
                activeId === label ? null : <Core.Icon code="faAngleDown" />
              }
            >
              <Core.Icon color="primary" code={icon} />
              <Trans i18nKey={label} />
            </AccordionSummary>

            <Divider />

            <AccordionDetails>
              <List>
                <ListItemButton
                  LinkComponent={NextLink}
                  href={href as string}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Core.Icon code="faLink" />
                  </ListItemIcon>

                  <ListItemText
                    primary={<Trans i18nKey="tutorial:btn-sandbox-mode" />}
                    secondary={
                      <Trans i18nKey="tutorial:msg-sandbox-mode-description" />
                    }
                    primaryTypographyProps={{
                      variant: 'subtitle1',
                      color: 'secondary',
                      fontWeight: 'bolder',
                    }}
                    secondaryTypographyProps={{
                      variant: 'caption',
                      color: 'text.secondary',
                      whiteSpace: 'pre-line',
                    }}
                  />
                </ListItemButton>

                {items?.map((item) => {
                  if (item && item !== 'divider') {
                    const { label, href } = item;

                    return (
                      <ListItemButton
                        LinkComponent={NextLink}
                        key={label}
                        href={href as string}
                        sx={{ borderRadius: 2 }}
                      >
                        <ListItemIcon>
                          <Core.Icon code="faLink" />
                        </ListItemIcon>

                        <ListItemText
                          primary={<Trans i18nKey={`${label}.label`} />}
                          secondary={<Trans i18nKey={`${label}.description`} />}
                          primaryTypographyProps={{
                            variant: 'subtitle1',
                            color: 'secondary',
                            fontWeight: 'bolder',
                          }}
                          secondaryTypographyProps={{
                            variant: 'caption',
                            color: 'text.secondary',
                            whiteSpace: 'pre-line',
                          }}
                        />
                      </ListItemButton>
                    );
                  }

                  return null;
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Container>
  );
});

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getServerSideTranslations(ctx)),
  },
});
